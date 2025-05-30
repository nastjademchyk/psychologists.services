import s from "./GreenBtn.module.css";

const GreenBtn = ({ text, className, onClick }) => {
  return (
    <button className={`${s.btn} ${className}`} onClick={onClick}>
      {text}
    </button>
  );
};
export default GreenBtn;
