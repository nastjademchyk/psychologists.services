import { useSelector } from "react-redux";
import { selectPsychologists } from "../../redux/psychologists/selectors";
import s from "./Favorites.module.css";
import Filter from "../../components/Filter/Filter";
import { selectSortBy } from "../../redux/filters/selectors";
import sortPsychologists from "../../utils/sortPsychologists";
import { useEffect, useState } from "react";
import { selectUser } from "../../redux/auth/selectors";
import Appointment from "../../components/Appointment/Appointment";
import Modal from "../../components/Modal/Modal";
import PsychologistsList from "../../components/PsychologistsList/PsychologistsList";

const Favorites = ({ onClose, onRemoveFavorite }) => {
  const allPsychologists = useSelector(selectPsychologists);
  const user = useSelector(selectUser);
  const [favoritesNames, setFavoritesNames] = useState([]);
  const sortBy = useSelector(selectSortBy);
  const [expandedIndexes, setExpandedIndexes] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPsychologist, setSelectedPsychologist] = useState(null);
  const [visibleCount, setVisibleCount] = useState(3);

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

  const handleRemoveFavorite = (nameToRemove) => {
    setFavoritesNames((prev) => prev.filter((name) => name !== nameToRemove));
  };
  const filteredFavorites = sortPsychologists(favoritePsychologists, sortBy);
  return (
    <div className={s.wrapper}>
      <Filter />
      {filteredFavorites.length === 0 ? (
        <p className={s.message}>You have no favorite psychologists yet.</p>
      ) : (
        <PsychologistsList
          psychologists={filteredFavorites}
          visibleCount={visibleCount}
          expandedIndexes={expandedIndexes}
          onToggle={handleToggle}
          onOpenModal={handleOpenModal}
          onLoadMore={() => setVisibleCount((prev) => prev + 3)}
          showLoadMore={true}
          isLoading={false}
          onRemoveFavorite={handleRemoveFavorite}
        />
      )}
      {modalOpen && selectedPsychologist && (
        <Modal onClose={handleCloseModal}>
          <Appointment
            psychologist={selectedPsychologist}
            onClose={handleCloseModal}
          />
        </Modal>
      )}
    </div>
  );
};

export default Favorites;
