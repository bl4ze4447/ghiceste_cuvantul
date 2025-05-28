import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { GameStatus, Settings } from '@/constants/constants';
import { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import dayjs from 'dayjs';

dayjs.extend(utc);
dayjs.extend(timezone);

export function usePersistentGameState(
  currentRow: number,
  words: string[],
  guessStatuses: boolean[],
  gameStatus: GameStatus,
  rights: number,
  wrongs: number,
  level: number,
  setCurrentRow: React.Dispatch<React.SetStateAction<number>>,
  setWords: React.Dispatch<React.SetStateAction<string[]>>,
  setGuessStatuses: React.Dispatch<React.SetStateAction<boolean[]>>,
  setGameStatus: React.Dispatch<React.SetStateAction<GameStatus>>,
  setPlayAudio: React.Dispatch<React.SetStateAction<boolean>>,
  location: string,
  isLevelGame: boolean
) {
  const STORAGE_KEY = useMemo(() => isLevelGame ? 'ro-wordle-level-data' : 'ro-wordle-daily', [isLevelGame]);
  
  const [hydrated, setHydrated] = useState(false);  // <-- new flag

  useEffect(() => {
    const ls = localStorage.getItem(STORAGE_KEY);
    if (ls === null) return;

    let result = null;
    try {
      result = JSON.parse(ls);
    } catch {
      result = null;
    }
    if (!result) return;

    const day = result.day;
    const now = dayjs().tz("Europe/Bucharest").startOf('day');
    const daysSinceEpoch = Math.floor(now.valueOf() / 86400000);

    if (!(isLevelGame || daysSinceEpoch === day)) return;

    setPlayAudio(result.guessStatuses.every((gs: boolean) => gs === false));
    setCurrentRow(result.currentRow);
    setWords(result.words);
    setGuessStatuses(result.guessStatuses);
    setGameStatus(result.gameStatus);

    setHydrated(true); 
  }, [setCurrentRow, setWords, setGuessStatuses, setGameStatus, setPlayAudio, STORAGE_KEY, isLevelGame]);

  const saveGameSession = useCallback(() => {
    if (!hydrated) return;

    const now = dayjs().tz('Europe/Bucharest').startOf('day');
    const daysSinceEpoch = Math.floor(now.valueOf() / 86400000);

    const ls = localStorage.getItem(STORAGE_KEY);
    let stored = null;
    if (ls !== null) {
      try {
        stored = JSON.parse(ls);
      } catch {
        stored = null;
      }
    }
    const day: number = stored !== null ? stored.day : daysSinceEpoch;

    const result = isLevelGame
      ? {
          currentRow,
          words,
          guessStatuses,
          gameStatus,
          rights,
          wrongs,
          level,
        }
      : {
          day: daysSinceEpoch,
          currentRow: day === daysSinceEpoch ? currentRow : 0,
          words: day === daysSinceEpoch ? words : Array(Settings.MAX_ROWS).fill(''),
          guessStatuses: day === daysSinceEpoch ? guessStatuses : Array(Settings.MAX_ROWS).fill(false),
          gameStatus: day === daysSinceEpoch ? gameStatus : GameStatus.PLAYING,
        };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(result));
  }, [STORAGE_KEY, currentRow, gameStatus, guessStatuses, isLevelGame, level, rights, wrongs, words, hydrated]);

  const saveGameSessionRef = useRef(saveGameSession);
  useEffect(() => {
    saveGameSessionRef.current = saveGameSession;
  }, [saveGameSession]);


  const handleBeforeUnload = (event: BeforeUnloadEvent | null) => {
    saveGameSession();
    if (event !== null) event.returnValue = '';
  };

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        saveGameSession();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [saveGameSession]);

  useEffect(() => {
    if (!hydrated) return;  // <-- only save on location change if hydrated
    handleBeforeUnload(null);
  }, [location, handleBeforeUnload, hydrated]);
}