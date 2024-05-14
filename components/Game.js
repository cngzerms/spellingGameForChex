"use client";
import { useClient } from "next/client";
import { useState, useEffect } from "react";
import styles from "./Game.module.css";
import LanguageSelector from "./LanguageSelector";

const Game = ({ language }) => {
  const [letters, setLetters] = useState([]);
  const [input, setInput] = useState("");
  const [time, setTime] = useState(60);
  const [score, setScore] = useState(0);
  const [words, setWords] = useState([]);

  useEffect(() => {
    fetch(`/api/dictionary?lang=${language}`)
      .then((response) => response.json())
      .then((data) => {
        makeWord(data);
        setWords(data.words);
      });
  }, [language]);

  useEffect(() => {
    if (time > 0) {
      const timer = setTimeout(() => setTime(time - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [time]);

  const makeWord = (data) => {
    const randomIndex = Math.floor(Math.random() * data.words.length);
    const randomLetters = data.words[randomIndex]
      .split("")
      .sort(() => 0.5 - Math.random())
      .slice(0, 7);
    setLetters(randomLetters);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (words.includes(input)) {
      setScore(score + input.length);
      setTime(time + 15);
      setInput("");
      const randomIndex = Math.floor(Math.random() * words.length);
      const randomLetters = words[randomIndex]
        .split("")
        .sort(() => 0.5 - Math.random())
        .slice(0, 7);
      setLetters(randomLetters);
    }
  };

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <div className={styles.container}>
      <LanguageSelector />
      <h1>{language === "en" ? "Spelling Bee" : "Heceleme Yarışması"}</h1>
      <div className={styles.letters}>
        {letters.map((letter, index) => (
          <div key={index} className={styles.letter}>
            {letter}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={input} onChange={handleChange} />
        <button type="submit" style={{ padding: "20px" }}>
          {language === "en" ? "Submit" : "Gönder"}
        </button>
      </form>
      <div className={styles["score-time"]}>
        <p>
          {language === "en" ? "Time" : "Süre"}: {time}
        </p>
        <p>
          {language === "en" ? "Score" : "Puan"}: {score}
        </p>
      </div>
    </div>
  );
};

export default Game;
