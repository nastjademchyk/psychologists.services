import s from "./GetStartBtn.module.css";
import sprite from "../../assets/icons.svg";

const GetStartBtn = ({ onClick }) => {
  return (
    <button onClick={onClick} className={s.btn} type="button">
      Get started
      <svg width="28" height="28" className={s.icon}>
        <use href={`${sprite}#icon-arrow-up-right2`} />
      </svg>
    </button>
  );
};

export default GetStartBtn;
