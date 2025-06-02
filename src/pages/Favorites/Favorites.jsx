import Appointment from "../../components/Appointment/Appointment";
import s from "./Favorites.module.css";
import Modal from "../../components/Modal/Modal";

const Favorites = () => {
  return (
    <div>
      <Modal>
        <Appointment />
      </Modal>
    </div>
  );
};
export default Favorites;
