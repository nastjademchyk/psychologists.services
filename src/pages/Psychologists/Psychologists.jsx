import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import s from "./Psychologists.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useId } from "react";
import { fetchPsychologists } from "../../redux/operations.js";
import sprite from "../../assets/icons.svg";
import Modal from "../../components/Modal/Modal.jsx";
import Appointment from "../../components/Appointment/Appointment.jsx";

const Psychologists = () => {
  const [expandedIndexes, setExpandedIndexes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPsychologist, setSelectedPsychologist] = useState(null);
  const filterId = useId();
  const dispatch = useDispatch();

  const openModal = (psychologist) => {
    setSelectedPsychologist(psychologist);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPsychologist(null);
  };

  const { items, loading, error } = useSelector((state) => state.psychologists);

  const toggleExpanded = (index) => {
    setExpandedIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

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
              <div className={s.left}>
                <div className={s.imageWrapper}>
                  <svg className={s.iconEllipse} width="9" height="9">
                    <use href={`${sprite}#icon-Ellipse`} />
                  </svg>
                  <img
                    src={psychologist.avatar_url}
                    alt={psychologist.name}
                    width={96}
                    height={96}
                    className={s.yourImageClass}
                  />
                </div>
              </div>
              <div className={s.right}>
                <div className={s.top}>
                  <div className={s.titleTop}>
                    <p className={s.psychologist}>Psychologist</p>

                    <h3 className={s.psychologistName}>{psychologist.name}</h3>
                  </div>
                  <div className={s.ratingPrice}>
                    <svg className={s.icon} width="22" height="22">
                      <use href={`${sprite}#icon-star`} />
                    </svg>

                    <p className={s.rating}>Rating: {psychologist.rating}</p>
                    <span className={s.divider}></span>
                    <p className={s.rating}>
                      Price / 1 hour:{" "}
                      <span className={s.price}>
                        {psychologist.price_per_hour}$
                      </span>
                    </p>
                  </div>
                </div>
                <ul className={s.listExperience}>
                  <li className={s.part}>
                    Experience:{" "}
                    <span className={s.listSpan}>
                      {psychologist.experience}
                    </span>
                  </li>
                  <li className={s.part}>
                    License:{" "}
                    <span className={s.listSpan}>{psychologist.license}</span>
                  </li>
                  <li className={s.part}>
                    Specialization:{" "}
                    <span className={s.listSpan}>
                      {psychologist.specialization}
                    </span>
                  </li>
                  <li className={s.part}>
                    Initial_consultation:{" "}
                    <span className={s.listSpan}>
                      {psychologist.specialization}
                    </span>
                  </li>
                </ul>
                <p className={s.about}>About: {psychologist.about}</p>
                <button
                  type="button"
                  className={s.btnReadMore}
                  onClick={() => toggleExpanded(index)}
                >
                  {expandedIndexes.includes(index)
                    ? "Hide reviews"
                    : "Read more"}
                </button>

                <div className={s.reviews}>
                  {expandedIndexes.includes(index) && (
                    <div className={s.reviews}>
                      {psychologist.reviews?.map((review, i) => (
                        <div key={i} className={s.reviewItem}>
                          <p className={s.reviewer}>{review.reviewer}</p>
                          <div className={s.starRating}>
                            <svg className={s.icon} width="22" height="22">
                              <use href={`${sprite}#icon-star`} />
                            </svg>
                            <p className={s.reviewerRating}>{review.rating}</p>
                          </div>
                          <p className={s.comment}>{review.comment}</p>
                        </div>
                      ))}
                      <button
                        type="button"
                        className={s.makeAppointment}
                        onClick={() => openModal(psychologist)}
                      >
                        Make an appointment
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
        {isModalOpen && (
          <Modal onClose={closeModal}>
            <Appointment psychologist={selectedPsychologist} />
          </Modal>
        )}
      </div>
    </div>
  );
};

export default Psychologists;
