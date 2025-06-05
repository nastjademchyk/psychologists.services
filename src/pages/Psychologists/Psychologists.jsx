import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import s from "./Psychologists.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useId } from "react";
import { fetchPsychologists } from "../../redux/psychologists/operations";
import Modal from "../../components/Modal/Modal";
import Appointment from "../../components/Appointment/Appointment";
import PsychologistCard from "../../components/PsychologistCard/PsychologistCard";
import Loader from "../../components/Loader/Loader";
import {
  selectPsychologists,
  selectIsLoading,
  selectError,
} from "../../redux/psychologists/selectors";
import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn";

const Psychologists = () => {
  const [expandedIndexes, setExpandedIndexes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3);
  const [selectedPsychologist, setSelectedPsychologist] = useState(null);
  const filterId = useId();
  const dispatch = useDispatch();

  const items = useSelector(selectPsychologists);
  const loading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchPsychologists());
  }, [dispatch]);

  const openModal = (psychologist) => {
    setSelectedPsychologist(psychologist);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPsychologist(null);
  };

  const toggleExpanded = (index) => {
    setExpandedIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <div>
      {!loading && visibleCount < items.length && (
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
      )}

      {loading && <Loader />}
      {error && <p>Error: {error}</p>}
      {!loading && !error && items.length === 0 && (
        <p className={s.noPsychologists}>No psychologists found.</p>
      )}
      <ul className={s.list}>
        {items.slice(0, visibleCount).map((psychologist, index) => (
          <PsychologistCard
            key={index}
            psychologist={psychologist}
            isExpanded={expandedIndexes.includes(index)}
            onToggle={() => toggleExpanded(index)}
            onOpenModal={openModal}
            psychologistIndex={index}
          />
        ))}
        {!loading && visibleCount < items.length && (
          <div className={s.btnWrapper}>
            <LoadMoreBtn onClick={() => setVisibleCount((prev) => prev + 3)} />
          </div>
        )}
      </ul>

      {isModalOpen && (
        <Modal onClose={closeModal}>
          <Appointment psychologist={selectedPsychologist} />
        </Modal>
      )}
    </div>
  );
};

export default Psychologists;
