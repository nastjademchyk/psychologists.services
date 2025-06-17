import s from "./PsychologistCard.module.css";
import sprite from "../../assets/icons.svg";
import Heart from "../../components/Heart/Heart";

const PsychologistCard = ({
  psychologist,
  isExpanded,
  onToggle,
  onOpenModal,
  onRemoveFavorite,
}) => {
  return (
    <li className={s.item}>
      <div className={s.left}>
        <div className={s.imageWrapper}>
          <svg className={s.iconEllipse} width="9" height="9">
            <use href={`${sprite}#icon-Ellipse`} />
          </svg>
          <img
            src={psychologist.avatar_url}
            alt={psychologist.name}
            width={96}
            height={96}
            className={s.yourImageClass}
          />
        </div>
      </div>

      <div className={s.right}>
        <div className={s.top}>
          <div className={s.titleTop}>
            <p className={s.psychologist}>Psychologist</p>
            <h3 className={s.psychologistName}>{psychologist.name}</h3>
          </div>

          <div className={s.ratingPrice}>
            <svg className={s.icon} width="22" height="22">
              <use href={`${sprite}#icon-star`} />
            </svg>

            <p className={s.rating}>Rating: {psychologist.rating}</p>
            <span className={s.divider}></span>
            <p className={s.rating}>
              Price / 1 hour:{" "}
              <span className={s.price}>{psychologist.price_per_hour}$</span>
            </p>
            <Heart
              psychologist={psychologist}
              onRemoveFavorite={onRemoveFavorite}
            />
          </div>
        </div>

        <ul className={s.listExperience}>
          <li className={s.part}>
            Experience:{" "}
            <span className={s.listSpan}>{psychologist.experience}</span>
          </li>
          <li className={s.part}>
            License: <span className={s.listSpan}>{psychologist.license}</span>
          </li>
          <li className={s.part}>
            Specialization:{" "}
            <span className={s.listSpan}>{psychologist.specialization}</span>
          </li>
          <li className={s.part}>
            Initial consultation:{" "}
            <span className={s.listSpan}>
              {psychologist.initial_consultation}
            </span>
          </li>
        </ul>

        <p className={s.about}>About: {psychologist.about}</p>

        <button type="button" className={s.btnReadMore} onClick={onToggle}>
          {isExpanded ? "Hide reviews" : "Read more"}
        </button>

        {isExpanded && (
          <div className={s.reviews}>
            {psychologist.reviews?.map((review, i) => (
              <div key={i} className={s.reviewItem}>
                <div className={s.wrap}>
                  <div className={s.left}>
                    <div className={s.circle}>
                      <p className={s.letter}>{review.reviewer.slice(0, 1)}</p>
                    </div>
                  </div>
                  <div className={s.right}>
                    <p className={s.reviewer}>{review.reviewer}</p>
                    <div className={s.starRating}>
                      <svg className={s.icon} width="22" height="22">
                        <use href={`${sprite}#icon-star`} />
                      </svg>
                      <p className={s.reviewerRating}>{review.rating}</p>
                    </div>
                  </div>
                </div>
                <p className={s.comment}>{review.comment}</p>
              </div>
            ))}

            <button
              type="button"
              className={s.makeAppointment}
              onClick={() => onOpenModal(psychologist)}
            >
              Make an appointment
            </button>
          </div>
        )}
      </div>
    </li>
  );
};

export default PsychologistCard;
