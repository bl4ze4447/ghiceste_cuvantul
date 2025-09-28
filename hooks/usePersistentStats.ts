'use client';

import dayjs from 'dayjs';
import { useState, useEffect } from 'react';
import { RunningState, GameMode, Settings, GuessState } from '@/constants/constants';
import { getLastDaily, getLastLevel } from '@/utils/backendUtils';
import { GameLevelDto } from '@/dto/game/gameLevel';
import { GameDailyDto } from '@/dto/game/gameDaily';

export function usePersistentStats(gameMode: GameMode, demo: boolean = false) {
    // Add loaded state to prevent saving too early
    const [loaded, setLoaded] = useState(false);

    const [loadedLocal, setLoadedLocal] = useState(false);
    const [_, setLoadedBackend] = useState(false);
    const [backendResult, setBackendResult] = useState<boolean | null>(null);
    const [isServerDown, setIsServerDown] = useState<boolean | null>(null);
    const [backendMessage, setBackendMessage] = useState<string>('');

    const [currentLevel, setCurrentLevel] = useState(1);
    const [lostLevels, setLostLevels] = useState(0);
    const [wonLevels, setWonLevels] = useState(0);

    const [guessedDaily, setGuessedDaily] = useState(false);
    const [lostDaily, setLostDaily] = useState(0);
    const [wonDaily, setWonDaily] = useState(0);

    const [currentRow, setCurrentRow] = useState(0);
    const [words, setWords] = useState(Array(Settings.MAX_ROWS).fill(''));
    const [showRow, setShowRow] = useState(Array(Settings.MAX_ROWS).fill(false));
    const [runningState, setRunningState] = useState(RunningState.PLAYING);
    const [guessStates, setGuessStates] = useState<GuessState[][]>(
        Array.from({ length: Settings.MAX_ROWS }, () =>
            Array(Settings.MAX_LETTERS).fill(GuessState.EMPTY)
        )
    );

    const [signature, setSignature] = useState('');
    useEffect(() => {
        const savedLevel = localStorage.getItem('level-current');
        const savedLostLevels = localStorage.getItem('level-lost');
        const savedWonLevels = localStorage.getItem('level-won');

        const savedLostDaily = localStorage.getItem('daily-lost');
        const savedWonDaily = localStorage.getItem('daily-won');

        const savedWonDemo = localStorage.getItem('demo-won');
        const savedLostDemo = localStorage.getItem('demo-lost');

        let savedSignature: string | null;
        let savedGuessedDaily: string | null;
        let savedRow: string | null;
        let savedWords: string | null;
        let savedShowRow: string | null;
        let savedGuessStates: string | null;
        let savedRunningState: string | null;
        let dailyExpired = false;

        // Get the useStates based on the GameType
        if (demo) {
            savedRow = localStorage.getItem('demo-row');
            savedWords = localStorage.getItem('demo-words');
            savedShowRow = localStorage.getItem('demo-show-row');
            savedRunningState = localStorage.getItem('demo-running-state');
            savedGuessStates = localStorage.getItem('demo-guess-states');
            savedSignature = localStorage.getItem('demo-signature');
            savedGuessedDaily = null;
        } else {
            switch (gameMode) {
                case GameMode.DAILY: {
                    const result = localStorage.getItem('daily-valability');
                    savedSignature = localStorage.getItem('daily-signature');

                    // Check if the data is still valid for the current day
                    if (result !== null) {
                        const savedDay = Number(result);
                        const now = dayjs().utc();
                        const daysSinceEpoch = Math.floor(now.valueOf() / 86400000);
                        dailyExpired = savedDay !== daysSinceEpoch;
                    }

                    // If the data expired, reset every value
                    if (dailyExpired) {
                        savedRow = '0';
                        savedWords = JSON.stringify(Array(Settings.MAX_ROWS).fill(''));
                        savedShowRow = JSON.stringify(Array(Settings.MAX_ROWS).fill(false));
                        savedRunningState = String(RunningState.PLAYING);
                        savedGuessedDaily = String(false);
                        savedGuessStates = JSON.stringify(
                            Array.from({ length: Settings.MAX_ROWS }, () =>
                                Array(Settings.MAX_LETTERS).fill(GuessState.EMPTY)
                            )
                        );
                        localStorage.removeItem('daily-sw');
                    } else {
                        // If not, we can read them from what we already have
                        savedRow = localStorage.getItem('daily-row');
                        savedWords = localStorage.getItem('daily-words');
                        savedShowRow = localStorage.getItem('daily-show-row');
                        savedRunningState = localStorage.getItem('daily-running-state');
                        savedGuessedDaily = localStorage.getItem('daily-guessed');
                        savedGuessStates = localStorage.getItem('daily-guess-states');
                    }
                    break;
                }
                case GameMode.LEVEL: {
                    savedRow = localStorage.getItem('level-row');
                    savedWords = localStorage.getItem('level-words');
                    savedShowRow = localStorage.getItem('level-show-row');
                    savedRunningState = localStorage.getItem('level-running-state');
                    savedGuessStates = localStorage.getItem('level-guess-states');
                    savedSignature = localStorage.getItem('level-signature');

                    savedGuessedDaily = null;
                    break;
                }
            }

            // If Settings.MAX_ROWS changed between saves of the data then just reset data
            if (savedWords !== null) {
                let wordsArray: string[] = JSON.parse(savedWords) as string[];
                if (wordsArray.length != Settings.MAX_ROWS) {
                    savedRow = '0';
                    savedWords = JSON.stringify(Array(Settings.MAX_ROWS).fill(''));
                    savedShowRow = JSON.stringify(Array(Settings.MAX_ROWS).fill(false));
                    savedRunningState = String(RunningState.PLAYING);
                    savedGuessedDaily = String(false);
                    savedGuessStates = JSON.stringify(
                        Array.from({ length: Settings.MAX_ROWS }, () =>
                            Array(Settings.MAX_LETTERS).fill(GuessState.EMPTY)
                        )
                    );
                    localStorage.removeItem('daily-sw');
                }
            }
            // Same for savedGuessStatuses
            if (savedShowRow !== null) {
                let gsArray: boolean[] = JSON.parse(savedShowRow) as boolean[];
                if (gsArray.length != Settings.MAX_ROWS) {
                    savedRow = '0';
                    savedWords = JSON.stringify(Array(Settings.MAX_ROWS).fill(''));
                    savedShowRow = JSON.stringify(Array(Settings.MAX_ROWS).fill(false));
                    savedRunningState = String(RunningState.PLAYING);
                    savedGuessedDaily = String(false);
                    savedGuessStates = JSON.stringify(
                        Array.from({ length: Settings.MAX_ROWS }, () =>
                            Array(Settings.MAX_LETTERS).fill(GuessState.EMPTY)
                        )
                    );
                    localStorage.removeItem('daily-sw');
                }
            }
        }

        // Only update the values that we could read
        if (savedWonDemo !== null) setWonDaily(Number(savedWonDemo));
        if (savedLostDemo !== null) setLostDaily(Number(savedLostDemo));

        if (savedLevel !== null) setCurrentLevel(Number(savedLevel));
        if (savedLostLevels !== null) setLostLevels(Number(savedLostLevels));
        if (savedWonLevels !== null) setWonLevels(Number(savedWonLevels));

        if (savedGuessedDaily !== null) setGuessedDaily(savedGuessedDaily.toLowerCase() === 'true');
        if (savedLostDaily !== null) setLostDaily(Number(savedLostDaily));
        if (savedWonDaily !== null) setWonDaily(Number(savedWonDaily));

        if (savedRow !== null) setCurrentRow(Number(savedRow));
        if (savedWords !== null) setWords(JSON.parse(savedWords) as string[]);
        if (savedShowRow !== null) setShowRow(JSON.parse(savedShowRow) as boolean[]);
        if (savedRunningState !== null) setRunningState(Number(savedRunningState));
        if (savedGuessStates !== null)
            setGuessStates(JSON.parse(savedGuessStates) as GuessState[][]);
        if (savedSignature !== null) setSignature(savedSignature);

        // We finished the initial loading for the game, update the loaded state
        setLoadedLocal(true);
    }, [gameMode]);

    useEffect(() => {
        if (loadedLocal && demo) {
            setLoaded(true);
            return;
        }
        if (!loadedLocal) return;

        switch (gameMode) {
            case GameMode.DAILY:
                getLastDaily().then((result) => {
                    setBackendResult(result.ok);
                    setIsServerDown(result.ok === null);
                    setBackendMessage(result.message);
                    if (result.ok !== true) {
                        setLoaded(true);
                        setLoadedBackend(true);
                        return;
                    }

                    const game = result.game as GameDailyDto;
                    setCurrentRow(game.currentRow);
                    setGuessStates(game.guessStates);
                    setRunningState(game.runningState);
                    setShowRow(game.showRow);
                    setSignature(game.signature);
                    setWords(game.words);
                    setWonDaily(game.wonDailies);
                    setLostDaily(game.lostDailies);
                    setLoaded(true);
                    setLoadedBackend(true);
                });
                break;
            case GameMode.LEVEL:
                getLastLevel().then((result) => {
                    setBackendResult(result.ok);
                    setIsServerDown(result.ok === null);
                    setBackendMessage(result.message);
                    if (result.ok !== true) {
                        setLoaded(true);
                        setLoadedBackend(true);
                        return;
                    }

                    const game = result.game as GameLevelDto;
                    setCurrentRow(game.currentRow);
                    setGuessStates(game.guessStates);
                    setRunningState(game.runningState);
                    setShowRow(game.showRow);
                    setSignature(game.signature);
                    setWords(game.words);
                    setWonLevels(game.wonLevels);
                    setLostLevels(game.lostLevels);
                    setCurrentLevel(game.level);
                    setLoaded(true);
                    setLoadedBackend(true);
                });
                break;
        }
    }, [loadedLocal, gameMode, demo, isServerDown]);

    // Write to the localStorage based on the current GameType
    useEffect(() => {
        // This is here to prevent from writing the initial values of the useStates
        if (!loaded) return;

        if (demo) {
            localStorage.setItem('demo-row', currentRow.toString());
            localStorage.setItem('demo-words', JSON.stringify(words));
            localStorage.setItem('demo-show-row', JSON.stringify(showRow));
            localStorage.setItem('demo-running-state', Number(runningState).toString());
            localStorage.setItem('demo-guess-states', JSON.stringify(guessStates));
            localStorage.setItem('demo-signature', signature);

            localStorage.setItem('demo-won', wonDaily.toString());
            localStorage.setItem('demo-lost', lostDaily.toString());
            return;
        }

        switch (gameMode) {
            case GameMode.DAILY: {
                // Get the current day, this represents the valablity of the data stored
                const now = dayjs().utc();
                const daysSinceEpoch = Math.floor(now.valueOf() / 86400000);

                localStorage.setItem('daily-valability', daysSinceEpoch.toString());
                localStorage.setItem('daily-lost', lostDaily.toString());
                localStorage.setItem('daily-guessed', guessedDaily.toString());
                localStorage.setItem('daily-won', wonDaily.toString());
                localStorage.setItem('daily-row', currentRow.toString());
                localStorage.setItem('daily-words', JSON.stringify(words));
                localStorage.setItem('daily-show-row', JSON.stringify(showRow));
                localStorage.setItem('daily-running-state', Number(runningState).toString());
                localStorage.setItem('daily-guess-states', JSON.stringify(guessStates));
                localStorage.setItem('daily-signature', signature);
                break;
            }
            case GameMode.LEVEL: {
                localStorage.setItem('level-current', currentLevel.toString());
                localStorage.setItem('level-lost', lostLevels.toString());
                localStorage.setItem('level-won', wonLevels.toString());
                localStorage.setItem('level-row', currentRow.toString());
                localStorage.setItem('level-words', JSON.stringify(words));
                localStorage.setItem('level-show-row', JSON.stringify(showRow));
                localStorage.setItem('level-running-state', Number(runningState).toString());
                localStorage.setItem('level-guess-states', JSON.stringify(guessStates));
                localStorage.setItem('level-signature', signature);
                break;
            }
        }
    }, [
        loaded,
        signature,
        currentLevel,
        lostLevels,
        wonLevels,
        lostDaily,
        wonDaily,
        gameMode,
        currentRow,
        words,
        showRow,
        runningState,
        guessStates,
    ]);

    useEffect(() => {
        if (!loaded) return;

        localStorage.removeItem('level-sw');
    }, [currentLevel]);

    return {
        loaded,
        isServerDown,
        backendResult,
        backendMessage,
        signature,
        setSignature,
        guessStates,
        setGuessStates,
        currentLevel,
        setCurrentLevel,
        lostLevels,
        setLostLevels,
        wonLevels,
        setWonLevels,
        guessedDaily,
        setGuessedDaily,
        lostDaily,
        setLostDaily,
        wonDaily,
        setWonDaily,
        currentRow,
        setCurrentRow,
        words,
        setWords,
        showRow,
        setShowRow,
        runningState,
        setRunningState,
    };
}
