import { useSelector } from "react-redux";
import { selectPsychologists } from "../../redux/psychologists/selectors";
import PsychologistCard from "../../components/PsychologistCard/PsychologistCard";
import s from "./Favorites.module.css";
import Filter from "../../components/Filter/Filter";
import { selectSortBy } from "../../redux/filters/selectors";
import sortPsychologists from "../../utils/sortPsychologists";
import { useEffect, useState } from "react";
import { selectUser } from "../../redux/auth/selectors";
import Appointment from "../../components/Appointment/Appointment";
import Modal from "../../components/Modal/Modal";

const Favorites = () => {
  const allPsychologists = useSelector(selectPsychologists);
  const user = useSelector(selectUser);
  const [favoritesNames, setFavoritesNames] = useState([]);
  const sortBy = useSelector(selectSortBy);
  const [expandedIndexes, setExpandedIndexes] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPsychologist, setSelectedPsychologist] = useState(null);

  useEffect(() => {
    if (user && user.email) {
      const userKey = `favorites_${user.email}`;
      const favorites = JSON.parse(localStorage.getItem(userKey)) || [];
      setFavoritesNames(favorites);
    } else {
      setFavoritesNames([]);
    }
  }, [user]);

  const favoritePsychologists = allPsychologists.filter((p) =>
    favoritesNames.includes(p.name)
  );

  const handleToggle = (index) => {
    setExpandedIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleOpenModal = (psychologist) => {
    setSelectedPsychologist(psychologist);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedPsychologist(null);
    setModalOpen(false);
  };

  const filteredFavorites = sortPsychologists(favoritePsychologists, sortBy);
  return (
    <div className={s.wrapper}>
      <Filter />
      {favoritePsychologists.length === 0 ? (
        <p className={s.message}>You have no favorite psychologists yet.</p>
      ) : (
        <ul className={s.list}>
          {filteredFavorites.map((psychologist, index) => (
            <PsychologistCard
              key={psychologist.name}
              psychologist={psychologist}
              isExpanded={expandedIndexes.includes(index)}
              onToggle={() => handleToggle(index)}
              onOpenModal={() => handleOpenModal(psychologist)}
              psychologistIndex={index}
            />
          ))}
        </ul>
      )}
      {modalOpen && selectedPsychologist && (
        <Modal onClose={handleCloseModal}>
          <Appointment psychologist={selectedPsychologist} />
        </Modal>
      )}
    </div>
  );
};

export default Favorites;
