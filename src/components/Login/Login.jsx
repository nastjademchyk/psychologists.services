import clsx from "clsx";
import s from "./Login.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { logIn } from "../../redux/auth/operations";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const FeedbackSchema = Yup.object().shape({
  email: Yup.string().email("Must be a valid email!").required("Required"),
  password: Yup.string()
    .required("Required")
    .min(6, "Password must be at least 6 characters")
    .max(50, "Password is too long"),
});

const Login = ({ onClose, onLoginSuccess }) => {
  const dispatch = useDispatch();
  const initialValues = {
    email: "",
    password: "",
  };
  const navigate = useNavigate();
  const handleSubmit = async (values, actions) => {
    try {
      const resultAction = await dispatch(logIn(values));
      if (logIn.fulfilled.match(resultAction)) {
        actions.resetForm();
        if (onLoginSuccess) onLoginSuccess();
        if (onClose) onClose();
        navigate("/favorites");
      } else if (logIn.rejected.match(resultAction)) {
        alert(resultAction.payload || "Login failed");
      } else {
        alert("Login failed");
      }
    } catch (error) {
      alert("Не вдалося увійти. Спробуйте ще раз.");
    }
  };

  return (
    <div className={s.wrapper}>
      <h2 className={s.header}>Log In</h2>
      <p className={s.text}>
        Welcome back! Please enter your credentials to access your account and
        continue your search for a psychologist.
      </p>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={FeedbackSchema}
      >
        <Form className={s.form}>
          <div className={s.fieldWrapper}>
            <Field
              type="email"
              name="email"
              placeholder="Email"
              className={clsx(s.email, s.input)}
            />
            <ErrorMessage name="email" component="span" className={s.error} />
          </div>
          <div className={s.fieldWrapper}>
            <Field
              type="password"
              name="password"
              placeholder="Password"
              className={clsx(s.input, s.password)}
            />
            <ErrorMessage
              name="password"
              component="span"
              className={s.error}
            />
          </div>
          <button type="submit" className={s.btn}>
            Log in
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default Login;
