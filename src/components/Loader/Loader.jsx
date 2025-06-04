import { BeatLoader } from "react-spinners";
import s from "./Loader.module.css";
const Loader = () => {
  return (
    <div className={s.loader}>
      <BeatLoader
        size={15}
        margin={2}
        color="#54be96"
        loading={true}
        speedMultiplier={1}
        cssOverride={{
          display: "block",
          margin: "0 auto",
          borderColor: "red",
        }}
      />
    </div>
  );
};

export default Loader;
