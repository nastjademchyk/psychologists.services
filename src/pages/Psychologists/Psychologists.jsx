import { useEffect, useState } from "react";
import s from "./Psychologists.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchPsychologists } from "../../redux/psychologists/operations";
import Modal from "../../components/Modal/Modal";
import Appointment from "../../components/Appointment/Appointment";
import sortPsychologists from "../../utils/sortPsychologists";

import Loader from "../../components/Loader/Loader";
import {
  selectPsychologists,
  selectIsLoading,
  selectError,
} from "../../redux/psychologists/selectors";
import Filter from "../../components/Filter/Filter";
import PsychologistsList from "../../components/PsychologistsList/PsychologistsList";
import { selectSortBy } from "../../redux/filters/selectors";

const Psychologists = () => {
  const [expandedIndexes, setExpandedIndexes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3);
  const [selectedPsychologist, setSelectedPsychologist] = useState(null);
  const dispatch = useDispatch();

  const items = useSelector(selectPsychologists);
  const loading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const sortBy = useSelector(selectSortBy);
  const filteredItems = sortPsychologists(items, sortBy);

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
      {!loading && items.length > 0 && <Filter />}

      {loading && <Loader />}
      {error && <p>Error: {error}</p>}
      {!loading && !error && items.length === 0 && (
        <p className={s.noPsychologists}>No psychologists found.</p>
      )}

      <PsychologistsList
        psychologists={filteredItems}
        visibleCount={visibleCount}
        expandedIndexes={expandedIndexes}
        onToggle={toggleExpanded}
        onOpenModal={openModal}
        onLoadMore={() => setVisibleCount((prev) => prev + 3)}
        isLoading={loading}
      />

      {isModalOpen && (
        <Modal onClose={closeModal}>
          <Appointment psychologist={selectedPsychologist} />
        </Modal>
      )}
    </div>
  );
};

export default Psychologists;
