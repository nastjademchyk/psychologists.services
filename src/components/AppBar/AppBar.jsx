import { NavLink } from "react-router-dom";
import s from "./AppBar.module.css";
import HeaderLogBtn from "../HeaderLogBtn/HeaderLogBtn";
import clsx from "clsx";
import GreenBtn from "../GreenBtn/GreenBtn";
import { useState } from "react";
import Modal from "../Modal/Modal";
import Login from "../Login/Login";
import Register from "../Register/Register";

const buildLinkClass = ({ isActive }) => {
  return clsx(s.nav_name, isActive && s.active);
};

const AppBar = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [authType, setAuthType] = useState("login");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleOpen = (type) => {
    setAuthType(type);
    setModalIsOpen(true);
  };
  const handleClose = () => {
    setModalIsOpen(false);
  };

  return (
    <div className={s.wrapper}>
      <div className={s.left}>
        <NavLink to="/" className={s.logo}>
          psychologists.<span>services</span>
        </NavLink>
        <nav>
          <ul className={s.nav}>
            <li className={s.nav_name}>
              <NavLink to="/" className={buildLinkClass}>
                Home
              </NavLink>
            </li>
            <li className={s.nav_name}>
              <NavLink to="/psychologists" className={buildLinkClass}>
                Psychologists
              </NavLink>
            </li>
            <li className={s.nav_name}>
              <NavLink to="/favorites" className={buildLinkClass}>
                Favorites
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
      <div className={s.buttons}>
        <HeaderLogBtn
          onClick={() => handleOpen("login")}
          text="Log In"
          className={s.btn}
        />
        <GreenBtn text="Registration" onClick={handleOpen} />
        {modalIsOpen && (
          <Modal onClose={handleClose}>
            {authType === "login" ? <Login /> : <Register />}
          </Modal>
        )}
      </div>
    </div>
  );
};

export default AppBar;
