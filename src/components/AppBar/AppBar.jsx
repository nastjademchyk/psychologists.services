import { Link } from "react-router-dom";
import s from "./AppBar.module.css";
import HeaderLogBtn from "../HeaderLogBtn/HeaderLogBtn";
import clsx from "clsx";
import GreenBtn from "../GreenBtn/GreenBtn";
import { useState } from "react";
import Modal from "../Modal/Modal";

const AppBar = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleOpen = () => setModalIsOpen(true);
  const handleClose = () => setModalIsOpen(false);

  return (
    <div className={s.wrapper}>
      <div className={s.left}>
        <Link to="/" className={s.logo}>
          psychologists.<span>services</span>
        </Link>
        <nav>
          <ul className={s.nav}>
            <li className={s.nav_name}>Home</li>
            <li className={s.nav_name}>Psychologists</li>
          </ul>
        </nav>
      </div>
      <div className={s.buttons}>
        <HeaderLogBtn onClick={handleOpen} text="Log In" className={s.btn} />
        <GreenBtn text="Registration" onClick={handleOpen} />
        {modalIsOpen && <Modal onClose={handleClose} />}
      </div>
    </div>
  );
};

export default AppBar;
