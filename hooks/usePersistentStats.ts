'use client'

import dayjs                    from 'dayjs';
import { useState, useEffect }  from 'react';
import { 
  RunningState, 
  GameMode, 
  Settings 
} from '@/constants/constants';

export function usePersistentStats(gameMode: GameMode) {
  // Add loaded state to prevent saving too early
  const [loaded,          setLoaded]          = useState(false);

  const [currentLevel,    setCurrentLevel]    = useState(1);
  const [lostLevels,      setLostLevels]      = useState(0);
  const [wonLevels,       setWonLevels]       = useState(0);

  const [lostDaily,       setLostDaily]       = useState(0);
  const [wonDaily,        setWonDaily]        = useState(0);

  const [currentRow,      setCurrentRow]      = useState(0);
  const [words,           setWords]           = useState(Array(Settings.MAX_ROWS).fill(''));
  const [rowsDisplayed,   setRowsDisplayed]   = useState(Array(Settings.MAX_ROWS).fill(false));
  const [runningState,    setRunningState]    = useState(RunningState.PLAYING);

  useEffect(() => {
    const savedLevel  = localStorage.getItem('level-current');
    let savedLostLevels = localStorage.getItem('level-lost');
    let savedWonLevels = localStorage.getItem('level-won');
    const savedLostDaily = localStorage.getItem('daily-lost');
    const savedWonDaily = localStorage.getItem('daily-won');
    if (localStorage.getItem('level-wrongs')) {
      savedLostLevels = localStorage.getItem('level-wrongs');
      localStorage.removeItem('level-wrongs');  
    }
    if (localStorage.getItem('level-rights')) {
      savedWonLevels = localStorage.getItem('level-rights');
      localStorage.removeItem('level-rights');  
    }

    let savedRow:           string | null;
    let savedWords:         string | null;
    let savedRowsDisplayed: string | null;
    let savedRunningState:  string | null;
    let dailyExpired        = false;

    // Get the useStates based on the GameType
    switch (gameMode) {
      case GameMode.DAILY: {
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
          savedRowsDisplayed  = JSON.stringify(Array(Settings.MAX_ROWS).fill(false));
          savedRunningState     = String(RunningState.PLAYING);
        } else {
          // If not, we can read them from what we already have
          savedRow            = localStorage.getItem('daily-row');
          savedWords          = localStorage.getItem('daily-words');
          savedRowsDisplayed  = localStorage.getItem('daily-rows-displayed');
          savedRunningState     = localStorage.getItem('daily-running-state');
        }
        break;
      }
      case GameMode.LEVEL: {
        savedRow            = localStorage.getItem('level-row');
        savedWords          = localStorage.getItem('level-words');
        savedRowsDisplayed  = localStorage.getItem('level-rows-displayed');
        savedRunningState     = localStorage.getItem('level-running-state');
        break;
      }
    }

    // If Settings.MAX_ROWS changed between saves of the data then just reset data
    if (savedWords          !== null) {
      let wordsArray: string[]  = JSON.parse(savedWords) as string[];
      if (wordsArray.length != Settings.MAX_ROWS) {
          savedRow            = '0';
          savedWords          = JSON.stringify(Array(Settings.MAX_ROWS).fill(''));
          savedRowsDisplayed  = JSON.stringify(Array(Settings.MAX_ROWS).fill(false));
          savedRunningState     = String(RunningState.PLAYING);
      }
    }
    // Same for savedGuessStatuses
    if (savedRowsDisplayed  !== null) {
      let gsArray: boolean[]    = JSON.parse(savedRowsDisplayed) as boolean[];
      if (gsArray.length != Settings.MAX_ROWS) {
          savedRow            = '0';
          savedWords          = JSON.stringify(Array(Settings.MAX_ROWS).fill(''));
          savedRowsDisplayed  = JSON.stringify(Array(Settings.MAX_ROWS).fill(false));
          savedRunningState     = String(RunningState.PLAYING);
      }
    }

    // Only update the values that we could read
    if (savedLevel  !== null) setCurrentLevel(Number(savedLevel));
    if (savedLostLevels !== null) setLostLevels(Number(savedLostLevels));
    if (savedWonLevels !== null) setWonLevels(Number(savedWonLevels));

    if (savedLostDaily !== null) setLostDaily(Number(savedLostDaily));
    if (savedWonDaily !== null) setWonDaily(Number(savedWonDaily));

    if (savedRow            !== null) setCurrentRow(Number(savedRow));
    if (savedWords          !== null) setWords(JSON.parse(savedWords) as string[]);
    if (savedRowsDisplayed  !== null) setRowsDisplayed(JSON.parse(savedRowsDisplayed) as boolean[]);
    if (savedRunningState     !== null) setRunningState(Number(savedRunningState));

    // We finished the initial loading for the game, update the loaded state
    setLoaded(true);
  }, [gameMode]);


  // Write to the localStorage based on the current GameType
  useEffect(() => {
    // This is here to prevent from writing the initial values of the useStates
    if (!loaded) return;

    switch (gameMode) {
      case GameMode.DAILY: {
        // Get the current day, this represents the valablity of the data stored
        const now = dayjs().tz("Europe/Bucharest").startOf('day');
        const daysSinceEpoch = Math.floor(now.valueOf() / 86400000);

        localStorage.setItem('daily-valability',        daysSinceEpoch.toString());
        localStorage.setItem('daily-lost',              lostDaily.toString());
        localStorage.setItem('daily-won',               wonDaily.toString());        
        localStorage.setItem('daily-row',               currentRow.toString());
        localStorage.setItem('daily-words',             JSON.stringify(words));
        localStorage.setItem('daily-rows-displayed',    JSON.stringify(rowsDisplayed));
        localStorage.setItem('daily-running-state',     Number(runningState).toString());
        break;
      }
      case GameMode.LEVEL: {
        localStorage.setItem('level-current',         currentLevel.toString());
        localStorage.setItem('level-lost',            lostLevels.toString());
        localStorage.setItem('level-won',             wonLevels.toString());
        localStorage.setItem('level-row',             currentRow.toString());
        localStorage.setItem('level-words',           JSON.stringify(words));
        localStorage.setItem('level-rows-displayed',  JSON.stringify(rowsDisplayed));
        localStorage.setItem('level-running-state',   Number(runningState).toString());
        break;
      }
    }
  }, [
    loaded,
    currentLevel,
    lostLevels,
    wonLevels,
    lostDaily,
    wonDaily,
    gameMode,
    currentRow,
    words,
    rowsDisplayed,
    runningState,
  ]);

  return {
    loaded,
    currentLevel, setCurrentLevel,
    lostLevels, setLostLevels,
    wonLevels, setWonLevels,
    lostDaily, setLostDaily,
    wonDaily, setWonDaily,
    currentRow, setCurrentRow,
    words, setWords,
    rowsDisplayed, setRowsDisplayed,
    runningState, setRunningState
  };
}