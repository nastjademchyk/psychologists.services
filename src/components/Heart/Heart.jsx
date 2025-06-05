import s from "./Heart.module.css";
import sprite from "../../assets/icons.svg";
import clsx from "clsx";
import { useState } from "react";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";

const Heart = ({ psychologist }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  if (!psychologist) {
    return null;
  }
  const { name } = psychologist;

  const [isFavorite, setIsFavorite] = useState(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    return favorites.includes(name);
  });

  const toggleFavorite = () => {
    if (!isLoggedIn) {
      iziToast.show({
        message: "Please log in or sign up to add to favorites.",
        position: "topCenter",
        color: "red",
      });
      return;
    }

    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const updatedFavorites = favorites.includes(name)
      ? favorites.filter((n) => n !== name)
      : [...favorites, name];

    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setIsFavorite(!isFavorite);
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
