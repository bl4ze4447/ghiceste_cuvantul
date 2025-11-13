'use client';

import '../GameGrid/style.css';

import { useCallback, useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

import { Settings, GuessState, RunningState, GameMode } from '@/constants/constants';
import { WORDLIST } from '@/constants/wordlist';
import GameRowDemo from '../GameRowDemo/component';
import { secretWord as getSecretWord } from '@/utils/backendUtils';

dayjs.extend(utc);
dayjs.extend(timezone);

interface GameGridLocalProps {
    virtualKeys: string[];
    words: string[];
    rowsDisplayed: boolean[];
    runningState: RunningState;
    currentRow: number;
    blockingAnimation: boolean;
    consumeFirstKey: () => void;
    setGamesLost: React.Dispatch<React.SetStateAction<number>>;
    setGamesWon: React.Dispatch<React.SetStateAction<number>>;
    setBlockingAnimation: React.Dispatch<React.SetStateAction<boolean>>;
    setUsedKeys: React.Dispatch<React.SetStateAction<GuessState[]>>;
    setCurrentRow: React.Dispatch<React.SetStateAction<number>>;
    setWords: React.Dispatch<React.SetStateAction<string[]>>;
    setRowsDisplayed: React.Dispatch<React.SetStateAction<boolean[]>>;
    setGuessStates: React.Dispatch<React.SetStateAction<GuessState[][]>>;
    setRunningState: React.Dispatch<React.SetStateAction<RunningState>>;
}

function normalizeString(str: string | null) {
    if (!str) return '';
    return str
        .trim()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase();
}

const GameGridLocal: React.FC<GameGridLocalProps> = ({
    virtualKeys,
    words,
    rowsDisplayed,
    runningState,
    currentRow,
    blockingAnimation,
    consumeFirstKey,
    setGamesWon,
    setGamesLost,
    setBlockingAnimation,
    setUsedKeys,
    setCurrentRow,
    setWords,
    setRowsDisplayed,
    setRunningState,
    setGuessStates,
}) => {
    const [secretWord, setSecretWord] = useState('');
    const secretWordChecked = useCallback(async () => {
        const value: string | null = localStorage.getItem('daily-sw');
        if (value !== null) {
            setSecretWord(JSON.parse(value));
            return;
        }

        const result = await getSecretWord(GameMode.DAILY);
        const secretWord = normalizeString(result.message);
        setSecretWord(secretWord);
    }, []);

    useEffect(() => {
        secretWordChecked();
    }, [secretWordChecked]);

    const [isInvalidWord, setIsInvalidWord] = useState(false);
    const disableBounceAnimation = useCallback(() => {
        setIsInvalidWord(false);
    }, []);

    const disableBlockingAnimation = useCallback(() => {
        setBlockingAnimation(false);
    }, [setBlockingAnimation]);

    const wrongWordSound = useRef<HTMLAudioElement | null>(null);
    const wonSound = useRef<HTMLAudioElement | null>(null);
    const lostSound = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        wrongWordSound.current = new Audio('/sounds/wrong_word.wav');
        wonSound.current = new Audio('/sounds/won.wav');
        lostSound.current = new Audio('/sounds/lost.wav');
    }, []);

    const updateCurrentWord = useCallback(
        (word: string) => {
            setWords((prevWords) => prevWords.map((w, i) => (i === currentRow ? word : w)));
        },
        [currentRow, setWords]
    );

    const updateCurrentRowDisplay = useCallback(
        (displayRow: boolean) => {
            setRowsDisplayed((prev) => prev.map((val, i) => (i === currentRow ? displayRow : val)));
        },
        [currentRow, setRowsDisplayed]
    );

    const updateCurrentGuessState = useCallback(
        (idx: number, guessState: GuessState[]) => {
            setGuessStates((prev) => prev.map((val, i) => (i === idx ? guessState : val)));
        },
        [setGuessStates]
    );

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

                console.log(secretWord);

                if (!WORDLIST.includes(words[currentRow].toLowerCase())) {
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
            secretWord,
            currentRow,
            words,
            runningState,
            blockingAnimation,
            updateCurrentWord,
            updateCurrentRowDisplay,
            setBlockingAnimation,
            setCurrentRow,
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
    }, [virtualKeys, consumeFirstKey, handleGameKeyPress]);

    useEffect(() => {
        if (!isInvalidWord || wrongWordSound.current === null) return;

        wrongWordSound.current.currentTime = 0;
        wrongWordSound.current.play();
    }, [isInvalidWord, wrongWordSound]);

    useEffect(() => {
        if (runningState === RunningState.PLAYING) return;

        const timeout = setTimeout(() => {
            const audio = runningState === RunningState.WON ? wonSound : lostSound;
            if (audio.current === null) return;

            audio.current.currentTime = 0;
            audio.current.play();

            if (runningState === RunningState.WON) setGamesWon(1);
            else setGamesLost(1);
        }, 2150);

        return () => {
            clearTimeout(timeout);
        };
    }, [runningState, setGamesWon, setGamesLost]);

    return (
        <>
            <div className="game-grid">
                {words.map((word, index) => (
                    <GameRowDemo
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
                        setGuessStates={updateCurrentGuessState}
                        row={index}
                    />
                ))}
            </div>
        </>
    );
};

export default GameGridLocal;
