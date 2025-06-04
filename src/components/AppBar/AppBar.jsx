import { NavLink } from "react-router-dom";
import s from "./AppBar.module.css";
import HeaderLogBtn from "../HeaderLogBtn/HeaderLogBtn";
import clsx from "clsx";
import GreenBtn from "../GreenBtn/GreenBtn";
import { useState } from "react";
import Modal from "../Modal/Modal";
import Login from "../Login/Login";
import Register from "../Register/Register";
import { logOut } from "../../redux/auth/operations";
import { useNavigate } from "react-router-dom";
const buildLinkClass = ({ isActive }) => {
  return clsx(s.nav_name, isActive && s.active);
};

const AppBar = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [authType, setAuthType] = useState("login");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleOpen = (type) => {
    setAuthType(type);
    setModalIsOpen(true);
  };
  const handleClose = () => {
    setModalIsOpen(false);
  };

  const handleLogout = async () => {
    try {
      await logOut();
      setIsLoggedIn(false);
      navigate("/");
    } catch (error) {
      console.error("Помилка при виході:", error);
      alert("Не вдалося вийти. Спробуйте ще раз.");
    }
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
        {isLoggedIn ? (
          <HeaderLogBtn
            onClick={handleLogout}
            text="Log Out"
            className={s.btn}
          />
        ) : (
          <HeaderLogBtn
            onClick={() => handleOpen("login")}
            text="Log In"
            className={s.btn}
          />
        )}
        <GreenBtn text="Registration" onClick={handleOpen} />
        {modalIsOpen && (
          <Modal onClose={handleClose}>
            {authType === "login" ? (
              <Login
                onClose={handleClose}
                onLoginSuccess={() => setIsLoggedIn(true)}
              />
            ) : (
              <Register
                onClose={handleClose}
                onLoginSuccess={() => setIsLoggedIn(true)}
              />
            )}
          </Modal>
        )}
      </div>
    </div>
  );
};

export default AppBar;
