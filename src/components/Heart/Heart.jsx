import s from "./Heart.module.css";
import sprite from "../../assets/icons.svg";
import clsx from "clsx";
import { useState } from "react";

const Heart = ({ psychologistIndex }) => {
  const [isFavorite, setIsFavorite] = useState(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    return favorites.includes(psychologistIndex);
  });

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    let updatedFavorites;

    if (favorites.includes(psychologistIndex)) {
      updatedFavorites = favorites.filter((id) => id !== psychologistIndex);
    } else {
      updatedFavorites = [...favorites, psychologistIndex];
    }

    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setIsFavorite((prev) => !prev);
  };

  return (
    <button type="button" className={s.btn} onClick={toggleFavorite}>
      <svg
        width="22"
        height="22"
        className={clsx(s.icon, { [s.active]: isFavorite })}
      >
        <use
          href={`${sprite}#${isFavorite ? "icon-heart-full" : "icon-heart"}`}
        />
      </svg>
    </button>
  );
};

export default Heart;
