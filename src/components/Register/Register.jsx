import s from "./Register.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import clsx from "clsx";
import * as Yup from "yup";
import { register } from "../../redux/auth/operations";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const initialValues = {
  name: "",
  email: "",
  password: "",
};

const FeedbackSchema = Yup.object().shape({
  name: Yup.string()
    .required("Required")
    .min(3, "Name must be at least 3 characters"),
  email: Yup.string().email("Must be a valid email!").required("Required"),
  password: Yup.string()
    .required("Required")
    .min(6, "Password must be at least 6 characters")
    .max(50, "Password is too long"),
});

const Register = ({ onClose }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (values, actions) => {
    try {
      const resultAction = await dispatch(register(values));
      if (register.fulfilled.match(resultAction)) {
        actions.resetForm();
        if (onClose) onClose();
        navigate("/psychologists");
      } else if (register.rejected.match(resultAction)) {
        const errorCode = resultAction.payload?.code;
        if (errorCode === "auth/email-already-in-use") {
          iziToast.show({
            message: "This email is already in use.",
            position: "topCenter",
            color: "red",
          });
        } else if (errorCode === "auth/weak-password") {
          alert("The password is too weak (minimum 6 characters).");
        } else {
          iziToast.show({
            message: "An error occurred during registration.",
            position: "topCenter",
            color: "red",
          });
        }
      } else {
        iziToast.show({
          message: "An error occurred during registration.",
          position: "topCenter",
          color: "red",
        });
      }
    } catch (error) {
      alert("An error occurred during registration.");
    }
  };
  return (
    <div className={s.wrapper}>
      <h2 className={s.header}>Registration</h2>
      <p className={s.text}>
        Thank you for your interest in our platform! In order to register, we
        need some information. Please provide us with the following information.
      </p>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={FeedbackSchema}
      >
        <Form className={s.form}>
          <div className={s.fieldWrapper}>
            <Field
              type="text"
              name="name"
              className={clsx(s.name, s.input)}
              placeholder="Name"
            />
            <ErrorMessage name="name" component="span" className={s.error} />
          </div>
          <div className={s.fieldWrapper}>
            <Field
              type="email"
              name="email"
              className={clsx(s.email, s.input)}
              placeholder="Email"
            />
            <ErrorMessage name="email" component="span" className={s.error} />
          </div>
          <div className={s.fieldWrapper}>
            <Field
              type="password"
              name="password"
              className={clsx(s.password, s.input)}
              placeholder="Password"
            />
            <ErrorMessage
              name="password"
              component="span"
              className={s.error}
            />
          </div>
          <button type="submit" className={s.btn}>
            Sign Up
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default Register;
