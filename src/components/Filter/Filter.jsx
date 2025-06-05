import { Formik, Form, Field } from "formik";
import { useId } from "react";
import s from "./Filter.module.css";

const Filter = ({ onChange }) => {
  const filterId = useId();

  return (
    <Formik
      initialValues={{ filter: "all" }}
      onSubmit={(values) => {
        if (onChange) {
          onChange(values.filter);
        }
      }}
    >
      {({ values, setFieldValue }) => (
        <Form className={s.form}>
          <label htmlFor={filterId} className={s.text}>
            Filters
          </label>
          <Field
            as="select"
            name="filter"
            className={s.filter}
            id={filterId}
            value={values.filter}
            onChange={(e) => {
              const selectedValue = e.target.value;
              setFieldValue("filter", selectedValue);
              if (onChange) {
                onChange(selectedValue);
              }
            }}
          >
            <option value="a-z">A to Z</option>
            <option value="z-a">Z to A</option>
            <option value="lt-10">Less than 10$</option>
            <option value="gt-10">Greater than 10$</option>
            <option value="popular">Popular</option>
            <option value="not-popular">Not popular</option>
            <option value="all">Show all</option>
          </Field>
        </Form>
      )}
    </Formik>
  );
};

export default Filter;
