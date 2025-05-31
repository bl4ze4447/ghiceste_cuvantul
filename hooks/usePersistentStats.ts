'use client'

import dayjs                    from 'dayjs';
import { useState, useEffect }  from 'react';
import { 
  GameStatus, 
  GameType, 
  Settings 
} from '@/constants/constants';

export function usePersistentStats(gameType: GameType) {
  // Add loaded state to prevent saving too early
  const [loaded,          setLoaded]          = useState(false);

  const [currentLevel,    setCurrentLevel]    = useState(1);
  const [numOfWrongWords, setNumOfWrongWords] = useState(0);
  const [numOfRightWords, setNumOfRightWords] = useState(0);

  const [currentRow,      setCurrentRow]      = useState(0);
  const [words,           setWords]           = useState(Array(Settings.MAX_ROWS).fill(''));
  const [guessStatuses,   setGuessStatuses]   = useState(Array(Settings.MAX_ROWS).fill(false));
  const [gameStatus,      setGameStatus]      = useState(GameStatus.PLAYING);

  useEffect(() => {
    const savedLevel  = localStorage.getItem('level-current');
    const savedWrongs = localStorage.getItem('level-wrongs');
    const savedRights = localStorage.getItem('level-rights');

    let savedRow:           string | null;
    let savedWords:         string | null;
    let savedGuessStatuses: string | null;
    let savedGameStatus:    string | null;
    let dailyExpired        = false;

    // Get the useStates based on the GameType
    switch (gameType) {
      case GameType.DAILY: {
        const result = localStorage.getItem('daily-valability');

        // Check if the data is still valid for the current day
        if (result !== null) {
          const savedDay        = Number(result);
          const now             = dayjs().tz("Europe/Bucharest").startOf('day');
          const daysSinceEpoch  = Math.floor(now.valueOf() / 86400000);
          dailyExpired          = savedDay !== daysSinceEpoch;
        }

        // If the data expired, reset every value
        if (dailyExpired) {
          savedRow            = '0';
          savedWords          = JSON.stringify(Array(Settings.MAX_ROWS).fill(''));
          savedGuessStatuses  = JSON.stringify(Array(Settings.MAX_ROWS).fill(false));
          savedGameStatus     = String(GameStatus.PLAYING);
        } else {
          // If not, we can read them from what we already have
          savedRow            = localStorage.getItem('daily-row');
          savedWords          = localStorage.getItem('daily-words');
          savedGuessStatuses  = localStorage.getItem('daily-guess-statuses');
          savedGameStatus     = localStorage.getItem('daily-game-status');
        }
        break;
      }
      case GameType.LEVEL: {
        savedRow            = localStorage.getItem('level-row');
        savedWords          = localStorage.getItem('level-words');
        savedGuessStatuses  = localStorage.getItem('level-guess-statuses');
        savedGameStatus     = localStorage.getItem('level-game-status');
        break;
      }
    }

    // If Settings.MAX_ROWS changed between saves of the data then just reset data
    if (savedWords          !== null) {
      let wordsArray: string[]  = JSON.parse(savedWords) as string[];
      if (wordsArray.length != Settings.MAX_ROWS) {
          savedRow            = '0';
          savedWords          = JSON.stringify(Array(Settings.MAX_ROWS).fill(''));
          savedGuessStatuses  = JSON.stringify(Array(Settings.MAX_ROWS).fill(false));
          savedGameStatus     = String(GameStatus.PLAYING);
      }
    }
    // Same for savedGuessStatuses
    if (savedGuessStatuses  !== null) {
      let gsArray: boolean[]    = JSON.parse(savedGuessStatuses) as boolean[];
      if (gsArray.length != Settings.MAX_ROWS) {
          savedRow            = '0';
          savedWords          = JSON.stringify(Array(Settings.MAX_ROWS).fill(''));
          savedGuessStatuses  = JSON.stringify(Array(Settings.MAX_ROWS).fill(false));
          savedGameStatus     = String(GameStatus.PLAYING);
      }
    }

    // Only update the values that we could read
    if (savedLevel  !== null) setCurrentLevel(Number(savedLevel));
    if (savedWrongs !== null) setNumOfWrongWords(Number(savedWrongs));
    if (savedRights !== null) setNumOfRightWords(Number(savedRights));

    if (savedRow            !== null) setCurrentRow(Number(savedRow));
    if (savedWords          !== null) setWords(JSON.parse(savedWords) as string[]);
    if (savedGuessStatuses  !== null) setGuessStatuses(JSON.parse(savedGuessStatuses) as boolean[]);
    if (savedGameStatus     !== null) setGameStatus(Number(savedGameStatus));

    // We finished the initial loading for the game, update the loaded state
    setLoaded(true);
  }, [gameType]);


  // Write to the localStorage based on the current GameType
  useEffect(() => {
    // This is here to prevent from writing the initial values of the useStates
    if (!loaded) return;

    switch (gameType) {
      case GameType.DAILY: {
        // Get the current day, this represents the valablity of the data stored
        const now = dayjs().tz("Europe/Bucharest").startOf('day');
        const daysSinceEpoch = Math.floor(now.valueOf() / 86400000);

        localStorage.setItem('daily-valability',      String(daysSinceEpoch));
        localStorage.setItem('daily-row',             String(currentRow));
        localStorage.setItem('daily-words',           JSON.stringify(words));
        localStorage.setItem('daily-guess-statuses',  JSON.stringify(guessStatuses));
        localStorage.setItem('daily-game-status',     String(Number(gameStatus)));
        break;
      }
      case GameType.LEVEL: {
        localStorage.setItem('level-current',         currentLevel.toString());
        localStorage.setItem('level-wrongs',          numOfWrongWords.toString());
        localStorage.setItem('level-rights',          numOfRightWords.toString());
        localStorage.setItem('level-row',             String(currentRow));
        localStorage.setItem('level-words',           JSON.stringify(words));
        localStorage.setItem('level-guess-statuses',  JSON.stringify(guessStatuses));
        localStorage.setItem('level-game-status',     String(Number(gameStatus)));
        break;
      }
    }
  }, [
    loaded,
    currentLevel,
    numOfWrongWords,
    numOfRightWords,
    gameType,
    currentRow,
    words,
    guessStatuses,
    gameStatus,
  ]);

  return {
    currentLevel, setCurrentLevel,
    numOfWrongWords, setNumOfWrongWords,
    numOfRightWords, setNumOfRightWords,
    currentRow, setCurrentRow,
    words, setWords,
    guessStatuses, setGuessStatuses,
    gameStatus, setGameStatus
  };
}