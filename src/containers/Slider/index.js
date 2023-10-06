import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
  );
  const nextCard = () => {
      setTimeout(() => {
      setIndex((index + 1) % (byDateDesc?.length || 0));
    }, 5000);
  };
    /* setTimeout(
      () => setIndex(index < byDateDesc.length ? index + 1 : 0),
      5000
    );
  }; */
  
  useEffect(() => {
    const timer = nextCard();
    return () => clearTimeout(timer); // nettoyage du timeout
  }, [index, byDateDesc]);

  /* Modifs des keys */
  function generateUniqueKey() {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }

  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <>
          <div
            key={`${event.date}-${generateUniqueKey()}`}
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
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
              {byDateDesc.map((_, radioIdx) => (
                <input
                  key={generateUniqueKey()}
                  type="radio"
                  name="radio-button"
                  checked={index === radioIdx}
                  onChange={() => {}}
                />
              ))}
            </div>
          </div>
        </>
      ))}
    </div>
  );
};

export default Slider;