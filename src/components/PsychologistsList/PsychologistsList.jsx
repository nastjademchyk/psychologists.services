import s from "./PsychologistsList.module.css";
import PsychologistCard from "../PsychologistCard/PsychologistCard";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import Heart from "../Heart/Heart";

const PsychologistsList = ({
  psychologists,
  visibleCount,
  expandedIndexes,
  onToggle,
  onOpenModal,
  onLoadMore,
  showLoadMore = true,
  isLoading,
  onRemoveFavorite,
}) => {
  const isEndOfList = visibleCount >= psychologists.length;
  return (
    <ul className={s.list}>
      {psychologists.slice(0, visibleCount).map((psychologist, index) => (
        <PsychologistCard
          key={index}
          psychologist={psychologist}
          isExpanded={expandedIndexes.includes(index)}
          onToggle={() => onToggle(index)}
          onOpenModal={onOpenModal}
          psychologistIndex={index}
          onRemoveFavorite={onRemoveFavorite}
        />
      ))}
      {showLoadMore && visibleCount < psychologists.length && (
        <div className={s.btnWrapper}>
          <LoadMoreBtn onClick={onLoadMore} />
        </div>
      )}

      {showLoadMore && isEndOfList && !isLoading && (
        <div className={s.endWrapper}>
          <p className={s.end}>End of the psychologists list.</p>
        </div>
      )}
    </ul>
  );
};

export default PsychologistsList;
