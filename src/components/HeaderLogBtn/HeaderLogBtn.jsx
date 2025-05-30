import s from "./HeaderLogBtn.module.css";

const HeaderLogBtn = ({ text, className, onClick }) => {
  return (
    <button className={`${s.btn} ${className}`} onClick={onClick}>
      {text}
    </button>
  );
};

export default HeaderLogBtn;
