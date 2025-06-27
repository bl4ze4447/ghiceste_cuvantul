'use client';

import '../styles/GameGrid.css';

import { useCallback, useEffect, useMemo, useState } from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

import GameRow from './GameRow';
import Info from '../Info';

import { Settings, GameMode, GuessState, RunningState } from '@/constants/constants';
import { WORDLIST } from '@/constants/wordlist';
import { getDailyWord, getWordByLevel } from '@/utils/words_manip';

dayjs.extend(utc);
dayjs.extend(timezone);

interface GameGridProps {
    gameMode: GameMode;
    virtualKeys: string[];
    words: string[];
    rowsDisplayed: boolean[];
    runningState: RunningState;
    currentRow: number;
    guessedDaily: boolean;
    currentLevel: number;
    blockingAnimation: boolean;
    consumeFirstKey: () => void;
    setGuessedDaily: React.Dispatch<React.SetStateAction<boolean>>;
    setCurrentLevel: React.Dispatch<React.SetStateAction<number>>;
    setGamesLost: React.Dispatch<React.SetStateAction<number>>;
    setGamesWon: React.Dispatch<React.SetStateAction<number>>;
    setBlockingAnimation: React.Dispatch<React.SetStateAction<boolean>>;
    setUsedKeys: React.Dispatch<React.SetStateAction<GuessState[]>>;
    setCurrentRow: React.Dispatch<React.SetStateAction<number>>;
    setWords: React.Dispatch<React.SetStateAction<string[]>>;
    setRowsDisplayed: React.Dispatch<React.SetStateAction<boolean[]>>;
    setRunningState: React.Dispatch<React.SetStateAction<RunningState>>;
}

const GameGrid: React.FC<GameGridProps> = ({
    gameMode,
    virtualKeys,
    words,
    rowsDisplayed,
    runningState,
    currentRow,
    guessedDaily,
    currentLevel,
    blockingAnimation,
    consumeFirstKey,
    setGuessedDaily,
    setGamesWon,
    setGamesLost,
    setCurrentLevel,
    setBlockingAnimation,
    setUsedKeys,
    setCurrentRow,
    setWords,
    setRowsDisplayed,
    setRunningState,
}) => {
    const secretWord = useMemo(() => {
        return gameMode === GameMode.DAILY ? getDailyWord() : getWordByLevel(currentLevel);
    }, [gameMode, currentLevel]);

    const [isInvalidWord, setIsInvalidWord] = useState(false);

    const disableBounceAnimation = useCallback(() => {
        setIsInvalidWord(false);
    }, []);

    const disableBlockingAnimation = useCallback(() => {
        setBlockingAnimation(false);
    }, []);

    const updateCurrentWord = useCallback(
        (word: string) => {
            setWords((prevWords) => prevWords.map((w, i) => (i === currentRow ? word : w)));
        },
        [currentRow]
    );

    const updateCurrentRowDisplay = useCallback(
        (displayRow: boolean) => {
            setRowsDisplayed((prev) => prev.map((val, i) => (i === currentRow ? displayRow : val)));
        },
        [currentRow]
    );

    const resetGame = () => {
        setCurrentRow(0);
        setWords(Array(Settings.MAX_ROWS).fill(''));
        setRowsDisplayed(Array(Settings.MAX_ROWS).fill(false));
        setRunningState(RunningState.PLAYING);
        setUsedKeys((val) => val.map(() => GuessState.EMPTY));
        setCurrentLevel((prev) => prev + 1);
    };

    const updateGameProgress = () => {
        if (runningState === RunningState.WON) {
            setGamesWon((prev) => prev + 1);
        } else {
            setGamesLost((prev) => prev + 1);
        }
    };

    const handleGameKeyPress = useCallback(
        (key: string) => {
            if (
                currentRow === Settings.MAX_ROWS ||
                runningState !== RunningState.PLAYING ||
                blockingAnimation
            )
                return;

            if (key === 'Enter') {
                if (words[currentRow].length !== Settings.MAX_LETTERS) return;

                if (!WORDLIST.includes(words[currentRow].toUpperCase())) {
                    setIsInvalidWord(true);
                    setBlockingAnimation(true);
                    return;
                }

                setCurrentRow(Math.min(currentRow + 1, Settings.MAX_ROWS));
                updateCurrentRowDisplay(true);
                setBlockingAnimation(true);
                return;
            }

            if (key === 'Backspace') {
                updateCurrentWord(words[currentRow].slice(0, -1));
            }

            if (key.match(/^[a-zA-Z]$/) && words[currentRow].length < Settings.MAX_LETTERS) {
                updateCurrentWord(words[currentRow] + key);
            }
        },
        [
            currentRow,
            words,
            runningState,
            blockingAnimation,
            updateCurrentWord,
            updateCurrentRowDisplay,
        ]
    );

    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            handleGameKeyPress(e.key);
        };
        window.addEventListener('keydown', onKeyDown);
        return () => {
            window.removeEventListener('keydown', onKeyDown);
        };
    }, [handleGameKeyPress]);

    useEffect(() => {
        if (virtualKeys.length > 0) {
            handleGameKeyPress(virtualKeys[0]);
            consumeFirstKey();
        }
    }, [virtualKeys]);

    useEffect(() => {
        if (runningState === RunningState.PLAYING || guessedDaily === true) return;

        const audio =
            runningState === RunningState.WON
                ? new Audio('/sounds/correct.mp3')
                : new Audio('/sounds/wrong.mp3');

        audio.play();

        if (gameMode === GameMode.LEVEL) {
            setTimeout(updateGameProgress, 1000);
            setTimeout(resetGame, 4000);
        } else if (gameMode === GameMode.DAILY && guessedDaily === false) {
            setTimeout(() => {
                updateGameProgress();
                setGuessedDaily(true);
            }, 1000);
        }

        return () => {
            audio.pause();
            audio.currentTime = 0;
        };
    }, [runningState, guessedDaily]);

    return (
        <>
            <section
                role="list"
                aria-label="Grilă de joc cu rânduri de cuvinte"
                className="game-grid"
            >
                {words.map((word, index) => (
                    <GameRow
                        key={index}
                        word={word}
                        secretWord={secretWord}
                        reveal={rowsDisplayed[index]}
                        setRunningState={setRunningState}
                        disableBlockingAnimation={disableBlockingAnimation}
                        isCurrentRow={currentRow === index + 1}
                        isLastRow={currentRow === Settings.MAX_ROWS}
                        setUsedKeys={setUsedKeys}
                        shouldBounce={isInvalidWord && currentRow === index}
                        disableBounceAnimation={disableBounceAnimation}
                        beforeCurrentRow={index + 1 < currentRow}
                    />
                ))}
            </section>
            <Info
                message="Cuvântul era"
                important={secretWord}
                hide={runningState === RunningState.PLAYING}
                hideText={runningState === RunningState.PLAYING}
            />
        </>
    );
};

export default GameGrid;
