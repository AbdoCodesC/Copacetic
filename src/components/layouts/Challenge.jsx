import React, { useState } from "react";
import ProgressBar from "../ProgressBar";
import { isEncountered, shuffle } from "../../utils";
import DEFINITIONS from "../../utils/VOCAB.json";

function Challenge({
  dayWords,
  handleChangePage,
  day,
  handleIncrementAttempts,
  handleCompleteDay,
  PLAN,
}) {
  const [wordIndex, setWordIndex] = useState(0);
  const [inputVal, setInputVal] = useState("");
  const [showDef, setShowDef] = useState(false);
  const [listToLearn, setListToLearn] = useState([
    ...dayWords,
    ...shuffle(dayWords),
    ...shuffle(dayWords),
    ...shuffle(dayWords),
  ]);

  const word = listToLearn[wordIndex];
  const isNewWord =
    showDef || (!isEncountered(day, word) && wordIndex < dayWords.length);
  const definition = DEFINITIONS[word];

  function iForgot() {
    setShowDef(true);
    setListToLearn([...listToLearn, word]);
  }

  return (
    <section id="challenge">
      <h1>{word}</h1>
      {isNewWord && <p>{definition}</p>}
      <div className="helper">
        <div>
          {/**  */}
          {[...Array(definition.length).keys()].map((char, charIndex) => {
            const styleToApply =
              inputVal.length < char + 1
                ? ""
                : inputVal.split("")[charIndex].toLowerCase() ===
                  definition.split("")[charIndex].toLowerCase()
                ? "correct"
                : "incorrect";
            return <div key={charIndex} className={" " + styleToApply}></div>;
          })}
        </div>
        <input
          value={inputVal}
          onChange={(e) => {
            if (
              e.target.value.length === definition.length &&
              e.target.value.length > inputVal.length
            ) {
              if (e.target.value.toLowerCase() === definition.toLowerCase()) {
                console.log("good");
                if (wordIndex >= listToLearn.length - 1) {
                  handleCompleteDay();
                  return;
                }
                setWordIndex((prev) => prev + 1);
                setInputVal("");
                setShowDef(false);
                return;
              } else {
                console.log("bad");
                handleIncrementAttempts();
              }
            }
            setInputVal(e.target.value);
          }}
          type="text"
          placeholder="Enter definition..."
        />
      </div>

      <div className="challenge-btns">
        <button
          className="card-button-secondary"
          onClick={() => handleChangePage(1)}
        >
          <h6>Quit</h6>
        </button>
        <button onClick={iForgot} className="card-button-primary">
          <h6>I Forgot</h6>
        </button>
      </div>

      <ProgressBar
        text={`${wordIndex} / ${listToLearn.length}`}
        remainder={(wordIndex * 100) / listToLearn.length}
      />
    </section>
  );
}

export default Challenge;
