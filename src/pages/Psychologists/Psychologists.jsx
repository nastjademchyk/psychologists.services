import { Field, Form, Formik } from "formik";
import s from "./Psychologists.module.css";
import { useId } from "react";
const Psychologists = () => {
  const filterId = useId();

  return (
    <div>
      <Formik>
        <Form className={s.form}>
          <label htmlFor={filterId} className={s.text}>
            Filters
          </label>
          <Field as="select" name="filter" className={s.filter} id={filterId}>
            <option value="a-z">A to Z</option>
            <option value="z-a">Z to A</option>
            <option value="lt-10">Less than 10$</option>
            <option value="gt-10">Greater than 10$</option>
            <option value="popular">Popular</option>
            <option value="not-popular">Not popular</option>
            <option value="all">Show all</option>
          </Field>
        </Form>
      </Formik>
    </div>
  );
};

export default Psychologists;
