import { Formik, Form, Field } from "formik";
import { useId } from "react";
import s from "./Filter.module.css";
import Select, { components } from "react-select";
import sprite from "../../assets/icons.svg";

const options = [
  { value: "a-z", label: "A to Z" },
  { value: "z-a", label: "Z to A" },
  { value: "lt-10", label: "Less than 10$" },
  { value: "gt-10", label: "Greater than 10$" },
  { value: "popular", label: "Popular" },
  { value: "not-popular", label: "Not popular" },
  { value: "all", label: "Show all" },
];

const DropdownIndicator = (props) => {
  const { menuIsOpen } = props.selectProps;

  return (
    <components.DropdownIndicator {...props}>
      {menuIsOpen ? (
        <svg width="24" height="24" className={s.icon}>
          <use href={`${sprite}#icon-chevron-up`} />
        </svg>
      ) : (
        <svg width="24" height="24" className={s.icon}>
          <use href={`${sprite}#icon-chevron-down`} />
        </svg>
      )}
    </components.DropdownIndicator>
  );
};

const Filter = ({ onChange }) => {
  const filterId = useId();

  return (
    <Formik
      initialValues={{ filter: options.find((opt) => opt.value === "all") }}
      onSubmit={() => {}}
    >
      {({ setFieldValue, values }) => (
        <Form className={s.form}>
          <label htmlFor={filterId} className={s.text}>
            Filters
          </label>
          <Select
            id={filterId}
            isSearchable={false}
            name="filter"
            value={values.filter}
            options={options}
            classNamePrefix="custom-select"
            components={{ DropdownIndicator }}
            onChange={(selectedOption) => {
              setFieldValue("filter", selectedOption);
              if (onChange) {
                onChange(selectedOption.value);
              }
            }}
            styles={{
              control: (base) => ({
                ...base,
                borderRadius: "14px",
                backgroundColor: "#54be96",
                padding: "4px",
                height: "48px",
                width: "226px",
                border: "none",
                boxShadow: "none",
                cursor: "pointer",
              }),
              singleValue: (base) => ({
                ...base,
                color: "#fbfbfb",
                fontWeight: 500,
                fontSize: "16px",
              }),
              option: (base, state) => ({
                ...base,
                backgroundColor: "transparent",
                color: state.isSelected ? "#191a15" : "rgba(25, 26, 21, 0.3)",
                fontWeight: 400,
                fontSize: "16px",
                lineHeight: "125%",
                cursor: "pointer",
              }),
              menuList: (base) => ({
                ...base,
                maxHeight: "216px",
                overflowY: "auto",
              }),
              menu: (base) => ({
                ...base,
                borderRadius: "14px",
                marginTop: 8,
                width: "226px",
                height: " 216px",
                zIndex: 10,
                boxShadow: "0 20px 69px 0 rgba(0, 0, 0, 0.07)",
                backgroundColor: "#fff",
              }),
              dropdownIndicator: (base) => ({
                ...base,
                color: "#fbfbfb",
              }),
              indicatorSeparator: () => ({
                display: "none",
                cursor: "pointer",
              }),
            }}
          />
        </Form>
      )}
    </Formik>
  );
};

export default Filter;
