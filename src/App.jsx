import React, { useState, useEffect } from "react";
import Layout from "./components/layouts/Layout";
import Welcome from "./components/layouts/Welcome";
import Dashboard from "./components/layouts/Dashboard";
import Challenge from "./components/layouts/Challenge";
import WORDS from "./utils/VOCAB.json";
import { countdownIn24Hours, getWordByIndex, PLAN } from "./utils/index";

function App() {
  const [selectedPage, setSelectedPage] = useState(0); // 0 w, 1 d, 2 challenge
  const [name, setName] = useState("");
  const [day, setDay] = useState(1);
  const [datetime, setDatetime] = useState(null);
  const [history, setHistory] = useState({});
  const [attempts, setAttempts] = useState(0);

  const dayWords = PLAN[day].map((idx) => {
    return getWordByIndex(WORDS, idx).word;
  });

  function handleCompleteDay() {
    const newDay = day + 1;
    const newDateTime = Date.now();
    setDay(newDay);
    setDatetime(newDateTime);
    localStorage.setItem(
      "day",
      JSON.stringify({ day: newDay, datetime: newDateTime })
    );
    setSelectedPage(1);
  }
  function handleIncrementAttempts() {
    const newRecord = attempts + 1;
    localStorage.setItem("attempts", newRecord);
    setAttempts(newRecord);
  }

  useEffect(() => {
    if (!localStorage) return;
    if (localStorage.getItem("username")) {
      setName(localStorage.getItem("username"));
      handleChangePage(1);
    }
    if (localStorage.getItem("day")) {
      const { day: d, datetime: dt } = JSON.parse(localStorage.getItem("day"));
      setDay(d);
      setDatetime(dt);

      if (d > 1 && dt) {
        const diff = countdownIn24Hours(dt) * -1;
        if (diff < 0) {
          console.log("failed challenge");
          let newHistory = {};
          const timestamp = new Date(dt);
          const formattedTimestamp = timestamp
            .toString()
            .split(" ")
            .slice(1, 4)
            .join(" ");
          newHistory[formattedTimestamp] = d;
          setHistory(newHistory);
          setDay(1);
          setDatetime(null);
          setAttempts(0);
          localStorage.setItem("attempts", 0);
          localStorage.setItem("history", JSON.stringify(newHistory));
          localStorage.setItem(
            "day",
            JSON.stringify({ day: 1, datetime: null })
          );
        }
      }
    }
    if (localStorage.getItem("attempts")) {
      setAttempts(+localStorage.getItem("attempts"));
    }

    if (localStorage.getItem("history")) {
      setHistory(JSON.parse(localStorage.getItem("history")));
    }
  }, []);

  function handleChangePage(pg) {
    setSelectedPage(pg);
  }

  function handleCreateAccount() {
    if (!name) return;
    localStorage.setItem("username", name);
    handleChangePage(1);
  }

  const pages = {
    0: (
      <Welcome
        name={name}
        setName={setName}
        handleCreateAccount={handleCreateAccount}
      />
    ),
    1: (
      <Dashboard
        name={name}
        day={day}
        attempts={attempts}
        PLAN={PLAN}
        handleChangePage={handleChangePage}
        datetime={datetime}
        history={history}
        dayWords={dayWords}
      />
    ),
    2: (
      <Challenge
        handleChangePage={handleChangePage}
        dayWords={dayWords}
        day={day}
        PLAN={PLAN}
        handleCompleteDay={handleCompleteDay}
        handleIncrementAttempts={handleIncrementAttempts}
      />
    ),
  };

  return (
    <>
      <Layout>{pages[selectedPage]}</Layout>
    </>
  );
}

export default App;
