import s from "./Register.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import clsx from "clsx";
import * as Yup from "yup";

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

const Register = () => {
  const handleSubmit = (values, actions) => {
    console.log(values);
    actions.resetForm();
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
            <ErrorMessage name="email" component="span" className={s.error} />
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
