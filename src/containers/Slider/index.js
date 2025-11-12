import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) > new Date(evtB.date) ? -1 : 1
  );
 const nextCard = () => {
    if (!byDateDesc || !byDateDesc.length) return; // protège si data pas encore dispo

    setTimeout(
      () => setIndex(index < byDateDesc.length - 1 ? index + 1 : 0),
      5000
    );
  };

  useEffect(() => {
    nextCard();
  }, [index, byDateDesc]); // ajoute byDateDesc en dépendance

  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <div key={`${event.title}-${event.id}`}
        data-key={`${event.title}-${event.id}`}>
          <div
            key={`slide-${event.title}`}
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
            data-testid="slide"
            data-key={event.title}
          >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateDesc.map((_, radioIndex) => {
                const uniqueKey = `radio-${event.id}-${event.title}-${radioIndex}`;
                return (
                  <input
                    key={uniqueKey}
                    type="radio"
                    name="radio-button"
                    checked={index === radioIndex}
                    data-testid="radio"
                    data-key={event.id}
                    readOnly
                  />
                );
              })}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Slider;
