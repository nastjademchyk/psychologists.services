import { Field, Form, Formik, ErrorMessage } from "formik";
import s from "./Appointment.module.css";
import clsx from "clsx";
import * as Yup from "yup";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const initialValues = {
  email: "",
  name: "",
  textarea: "",
  phone: "",
  appointmentTime: "00:00",
};

const FeedbackSchema = Yup.object().shape({
  name: Yup.string()
    .required("Required")
    .min(3, "Name must be at least 3 characters"),
  email: Yup.string().email("Must be a valid email!").required("Required"),
  phone: Yup.string().required("Required"),
  appointmentTime: Yup.string()
    .required("Required")
    .test("not-default", "Please choose a time", (value) => value !== "00:00"),
  textarea: Yup.string().required("Required"),
});

const Appointment = ({ psychologist, onClose }) => {
  const handleSubmit = (values, actions) => {
    console.log(values);
    actions.resetForm();
    iziToast.show({
      message: "Request was successfully sent.",
      position: "topCenter",
      color: "green",
    });
    onClose();
  };
  return (
    <div className={s.wrapper}>
      <h2 className={s.header}>Make an appointment with a psychologists</h2>
      <p className={s.text}>
        You are on the verge of changing your life for the better. Fill out the
        short form below to book your personal appointment with a professional
        psychologist. We guarantee confidentiality and respect for your privacy.
      </p>
      <div className={s.yourChoice}>
        <div className={s.left}>
          <img
            src={psychologist.avatar_url}
            alt={psychologist.name}
            width={96}
            height={96}
            className={s.yourImageClass}
          />
        </div>
        <div className={s.right}>
          <p className={s.psychologist}>Your psychologists</p>
          <p className={s.psychologistName}>{psychologist.name}</p>
        </div>
      </div>

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
              placeholder="Name"
              className={clsx(s.name, s.input)}
            />
            <ErrorMessage name="name" component="span" className={s.error} />
          </div>
          <div className={s.phone_time}>
            <div className={s.phone_appointment_wrapper}>
              <Field
                type="tel"
                name="phone"
                placeholder="+380"
                className={clsx(s.phone, s.inputPhoneTime, s.input)}
              />
              <ErrorMessage name="phone" component="span" className={s.error} />
            </div>
            <div className={s.phone_appointment_wrapper}>
              <Field
                type="time"
                name="appointmentTime"
                className={clsx(s.time, s.inputPhoneTime)}
              />
              <ErrorMessage
                name="appointmentTime"
                component="span"
                className={s.error}
              />
            </div>
          </div>
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
              as="textarea"
              className={clsx(s.textarea, s.input)}
              name="textarea"
              placeholder="Comment"
            />
            <ErrorMessage
              name="textarea"
              component="span"
              className={s.error}
            />
          </div>
          <button type="submit" className={s.btn}>
            Submit
          </button>
        </Form>
      </Formik>
    </div>
  );
};
export default Appointment;
