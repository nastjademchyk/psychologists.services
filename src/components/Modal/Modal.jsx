import s from "./Modal.module.css";
import sprite from "../../assets/icons.svg";

const Modal = ({ onClose }) => {
  const handleClose = () => {
    onClose();
  };

  const handleBackDropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  return (
    <div className={s.backdrop} onClick={handleBackDropClick}>
      <div className={s.modal}>
        <button
          type="button"
          className={s.modal_close_btn}
          onClick={handleClose}
        >
          <svg
            className={s.icon}
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M24 8L8 24"
              stroke="#191A15"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8 8L24 24"
              stroke="#191A15"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Modal;
