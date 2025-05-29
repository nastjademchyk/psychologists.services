import { Link } from "react-router-dom";
import s from "./AppBar.module.css";

const AppBar = () => {
  return (
    <div className={s.wrapper}>
      <Link to="/" className={s.logo}>
        psychologists.<span>services</span>
      </Link>
      <nav>
        <ul>
          <li>Home</li>
          <li>Psychologists</li>
        </ul>
      </nav>
    </div>
  );
};

export default AppBar;
