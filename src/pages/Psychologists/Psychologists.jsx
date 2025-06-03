import { Field, Form, Formik } from "formik";
import { useEffect } from "react";
import s from "./Psychologists.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useId } from "react";
import { fetchPsychologists } from "../../redux/operations.js";

const Psychologists = () => {
  const filterId = useId();
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.psychologists);

  useEffect(() => {
    dispatch(fetchPsychologists());
  }, [dispatch]);

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

      <div>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        <ul className={s.list}>
          {items.map((psychologist, index) => (
            <li key={index} className={s.item}>
              <div className={s.imageWrapper}>
                <img
                  src={psychologist.avatar_url}
                  alt={psychologist.name}
                  width={96}
                  height={96}
                  className={s.yourImageClass}
                />
              </div>
              <p>Psychologist</p>
              <h3>{psychologist.name}</h3>
              <div>
                <p>Rating: {psychologist.rating}</p>
                <p>Price / 1 hour: {psychologist.price_per_hour}</p>
              </div>
              <ul>
                <li>Experience: {psychologist.experience}</li>
                <li>License: {psychologist.license}</li>
                <li>Specialization: {psychologist.specialization}</li>
                <li>Initial_consultation: {psychologist.specialization}</li>
              </ul>
              <p>About: {psychologist.about}</p>

              <div className={s.reviews}>
                {/* {psychologist.reviews?.map((review, index) => (
                  <div key={index}>
                    <p>{review.reviewer}</p>
                    <p>{review.rating}</p>
                    <p>{review.comment}</p>
                  </div>
                ))} */}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Psychologists;
