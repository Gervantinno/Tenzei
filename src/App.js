import React from "react";
import Die from "./Die";
import Confetti from "react-confetti";
import { nanoid } from "nanoid";

export default function App() {
  const [dice, setDice] = React.useState(() => initDice());

  const [isGameWon, setIsGameWon] = React.useState(false);

  const [rerollCounter, setRerollCounter] = React.useState(0);

  React.useEffect(() => {
    if (gameEndCheck()) {
      setIsGameWon(true);
    }
  }, [dice]);

  function initDice() {
    let newArray = [];
    for (let i = 0; i < 10; i++) {
      newArray[i] = {
        id: nanoid(),
        value: Math.floor(Math.random() * 6) + 1,
        isPressed: false,
      };
    }
    if (isGameWon) setIsGameWon(false);
    return newArray;
  }

  function actionClick() {
    //if the game is won we want to get new set of dice and change our game state to false(not won yet)
    if (isGameWon) {
      setDice(initDice());
      setIsGameWon(false);
      return;
    }

    setDice((prevDice) => {
      const newArray = [];
      for (let die of prevDice) {
        die.isPressed
          ? newArray.push({
              ...die,
            })
          : newArray.push({
              ...die,
              value: Math.floor(Math.random() * 6) + 1,
            });
      }
      return newArray;
    });
    setRerollCounter((prevCounter) => prevCounter + 1);
  }

  function dieOnClick(id) {
    setDice((prevDice) => {
      return prevDice.map((die) => {
        return die.id === id ? { ...die, isPressed: !die.isPressed } : die;
      });
    });
  }

  function gameEndCheck() {
    const allPressed = dice.every((die) => die.isPressed);
    const value = dice[0].value;
    const allSameValue = dice.every((die) => die.value === value);
    return allPressed && allSameValue;
  }

  const diceComponents = dice.map((die) => (
    <Die
      key={die.id}
      id={die.id}
      value={die.value}
      isPressed={die.isPressed}
      clickHandler={dieOnClick}
    />
  ));

  return (
    <main>
      {isGameWon && <Confetti />}
      {rerollCounter !== 0 && (
        <span className="counter">Rerolls number: {rerollCounter}</span>
      )}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        {isGameWon
          ? "Congratulations! You Won in " + rerollCounter
          : `Roll until all dice are the same. Click each die to freeze it at its
					current value between rolls.`}
      </p>
      <div className="wrapper">{diceComponents}</div>
      <button onClick={actionClick}>
        {isGameWon ? "Try Again" : "Reroll"}
      </button>
    </main>
  );
}
