import s from "./HomePage.module.css";
import homex1 from "../../assets/images/home-x1.png";
import homex2 from "../../assets/images/home-x2.png";
import GetStartBtn from "../../components/GetStartBtn/GetStartBtn";
import sprite from "../../assets/icons.svg";
import { useState } from "react";
import Register from "../../components/Register/Register";
import Modal from "../../components/Modal/Modal";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className={s.container}>
      {/* <div className={s.blur}></div> */}
      <div className={s.left}>
        <h1 className={s.header}>
          The road to the <span className={s.accent}>depths</span> of the human
          soul
        </h1>
        <p className={s.text}>
          We help you to reveal your potential, overcome challenges and find a
          guide in your own life with the help of our experienced psychologists.
        </p>
        <Link to="/psychologists">
          <GetStartBtn />
        </Link>
      </div>
      <div className={s.right}>
        <div className={s.imageWrapper}>
          <img
            src={homex1}
            alt="woman"
            srcSet={`${homex1} 1x, ${homex2} 2x`}
            className={s.image}
          />
          <div className={s.question}>
            <svg width="17" height="35" className={s.iconQ}>
              <use href={`${sprite}#icon-question`} />
            </svg>
          </div>
          <div className={s.users}>
            <svg width="24" height="25" className={s.iconU}>
              <use href={`${sprite}#icon-users`} />
            </svg>
          </div>
          <div className={s.infoBox}>
            <div className={s.infoContent}>
              <div className={s.iconWrapper}>
                <svg width="30" height="30" className={s.icon}>
                  <use href={`${sprite}#icon-check`} />
                </svg>
              </div>
              <div className={s.infoTextNumber}>
                <p className={s.infoText}>Experienced psychologists</p>
                <p className={s.infoNumber}>15,000</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
