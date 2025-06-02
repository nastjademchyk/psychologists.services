import s from "./GetStartBtn.module.css";

const GetStartBtn = ({ onClick }) => {
  return (
    <button onClick={onClick} className={s.btn} type="button">
      Get started
    </button>
  );
};

export default GetStartBtn;
