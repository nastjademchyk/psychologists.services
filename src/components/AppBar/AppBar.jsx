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
import sprite from "../../assets/icons.svg";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoggedIn, selectUser } from "../../redux/auth/selectors";

const buildLinkClass = ({ isActive }) => {
  return clsx(s.nav_name, isActive && s.active);
};

const AppBar = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [authType, setAuthType] = useState("login");

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
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
      await dispatch(logOut());

      navigate("/");
    } catch (error) {
      alert("Failed to log out. Please try again.");
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
            {isLoggedIn && (
              <li className={s.nav_name}>
                <NavLink to="/favorites" className={buildLinkClass}>
                  Favorites
                </NavLink>
              </li>
            )}
          </ul>
        </nav>
      </div>

      <div className={s.buttons}>
        {isLoggedIn ? (
          <>
            <div className={s.leftBtns}>
              <div className={s.nameWithIcon}>
                <div className={s.userIcon}>
                  <svg width="24" height="24" className={s.icon}>
                    <use href={`${sprite}#icon-user`} />
                  </svg>
                </div>
                <p className={s.userName}>{user?.displayName || "Name"}</p>
              </div>
            </div>
            <div className={s.rightBtns}>
              <HeaderLogBtn
                onClick={handleLogout}
                text="Log Out"
                className={s.btn}
              />
            </div>
          </>
        ) : (
          <>
            <div className={s.leftBtns}>
              <HeaderLogBtn
                onClick={() => handleOpen("login")}
                text="Log In"
                className={s.btn}
              />
            </div>
            <div className={s.rightBtns}>
              <GreenBtn
                text="Registration"
                onClick={() => handleOpen("register")}
              />
            </div>
          </>
        )}
        {modalIsOpen && (
          <Modal onClose={handleClose}>
            {authType === "login" ? (
              <Login onClose={handleClose} />
            ) : (
              <Register onClose={handleClose} />
            )}
          </Modal>
        )}
      </div>
    </div>
  );
};

export default AppBar;
