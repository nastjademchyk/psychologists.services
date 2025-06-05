import { useSelector } from "react-redux";
import { selectPsychologists } from "../../redux/psychologists/selectors";
import PsychologistCard from "../../components/PsychologistCard/PsychologistCard";
import s from "./Favorites.module.css";
import Filter from "../../components/Filter/Filter";

const Favorites = () => {
  const allPsychologists = useSelector(selectPsychologists);
  const favoritesNames = JSON.parse(localStorage.getItem("favorites")) || [];

  const favoritePsychologists = allPsychologists.filter((p) =>
    favoritesNames.includes(p.name)
  );

  return (
    <div className={s.wrapper}>
      <Filter />
      {favoritePsychologists.length === 0 ? (
        <p className={s.message}>You have no favorite psychologists yet.</p>
      ) : (
        <ul className={s.list}>
          {favoritePsychologists.map((psychologist, index) => (
            <PsychologistCard
              key={psychologist.name}
              psychologist={psychologist}
              isExpanded={false}
              onToggle={() => {}}
              onOpenModal={() => {}}
              psychologistIndex={index}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default Favorites;
