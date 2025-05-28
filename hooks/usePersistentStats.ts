'use client'

import { useState, useEffect } from 'react';

export function usePersistentStats() {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [numOfWrongWords, setNumOfWrongWords] = useState(0);
  const [numOfRightWords, setNumOfRightWords] = useState(0);

  useEffect(() => {
    const savedLevel = localStorage.getItem('ro-wordle-level');
    const savedWrongs = localStorage.getItem('ro-wordle-wrongs');
    const savedRights = localStorage.getItem('ro-wordle-rights');

    if (savedLevel !== null) setCurrentLevel(Number(savedLevel));
    if (savedWrongs !== null) setNumOfWrongWords(Number(savedWrongs));
    if (savedRights !== null) setNumOfRightWords(Number(savedRights));
  }, []);

  useEffect(() => {
    localStorage.setItem('ro-wordle-level', currentLevel.toString());
    localStorage.setItem('ro-wordle-wrongs', numOfWrongWords.toString());
    localStorage.setItem('ro-wordle-rights', numOfRightWords.toString());
  }, [currentLevel, numOfWrongWords, numOfRightWords]);

  return {
    currentLevel, setCurrentLevel,
    numOfWrongWords, setNumOfWrongWords,
    numOfRightWords, setNumOfRightWords,
  };
}