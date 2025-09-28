'use client';

import './style.css';

import { useCallback, useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

import GameRow from '../GameRow/component';

import { Settings, GameMode, GuessState, RunningState } from '@/constants/constants';
import { updateLastDaily, updateLastLevel } from '@/utils/backendUtils';
import { GameLevelDto } from '@/dto/game/gameLevel';
import { GameDailyDto } from '@/dto/game/gameDaily';
import Notification from '../../Notification/component';
import { WORDLIST } from '@/constants/wordlist';

dayjs.extend(utc);
dayjs.extend(timezone);

interface GameGridProps {
    gameMode: GameMode;
    virtualKeys: string[];
    words: string[];
    loaded: boolean;
    showRow: boolean[];
    runningState: RunningState;
    currentRow: number;
    blockingAnimation: boolean;
    signature: string;
    guessStates: GuessState[][];
    backendResult: boolean | null;
    backendMessage: string;
    consumeFirstKey: () => void;
    setSignature: React.Dispatch<React.SetStateAction<string>>;
    setGuessStates: React.Dispatch<React.SetStateAction<GuessState[][]>>;
    setCurrentLevel: React.Dispatch<React.SetStateAction<number>>;
    setGamesLost: React.Dispatch<React.SetStateAction<number>>;
    setGamesWon: React.Dispatch<React.SetStateAction<number>>;
    setBlockingAnimation: React.Dispatch<React.SetStateAction<boolean>>;
    setUsedKeys: React.Dispatch<React.SetStateAction<GuessState[]>>;
    setCurrentRow: React.Dispatch<React.SetStateAction<number>>;
    setWords: React.Dispatch<React.SetStateAction<string[]>>;
    setShowRow: React.Dispatch<React.SetStateAction<boolean[]>>;
    setRunningState: React.Dispatch<React.SetStateAction<RunningState>>;
}

const GameGrid: React.FC<GameGridProps> = ({
    gameMode,
    loaded,
    backendResult,
    backendMessage,
    virtualKeys,
    words,
    showRow,
    runningState,
    currentRow,
    guessStates,
    signature,
    blockingAnimation,
    consumeFirstKey,
    setGuessStates,
    setSignature,
    setGamesWon,
    setGamesLost,
    setCurrentLevel,
    setBlockingAnimation,
    setUsedKeys,
    setCurrentRow,
    setWords,
    setShowRow,
    setRunningState,
}) => {
    const [isInvalidWord, setIsInvalidWord] = useState(false);
    const [description, setDescription] = useState('');
    const [showNotification, setShowNotification] = useState(false);
    const [title, setTitle] = useState('');

    const wrongWordSound = useRef<HTMLAudioElement | null>(null);
    const wonSound = useRef<HTMLAudioElement | null>(null);
    const lostSound = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        wrongWordSound.current = new Audio('/sounds/wrong_word.wav');
        wonSound.current = new Audio('/sounds/won.wav');
        lostSound.current = new Audio('/sounds/lost.wav');
    }, []);

    useEffect(() => {
        if (!loaded || backendResult === true) return;

        setShowNotification(true);
        setDescription(backendMessage);
        if (backendResult === null) setTitle('Problemă internă');
        else setTitle('Avertisment');
    }, [loaded, backendResult, backendMessage]);

    const disableBounceAnimation = useCallback(() => {
        setIsInvalidWord(false);
    }, []);

    const disableBlockingAnimation = useCallback(() => {
        setBlockingAnimation(false);
    }, [setBlockingAnimation]);

    const updateCurrentWord = useCallback(
        (word: string) => {
            setWords((prevWords) => prevWords.map((w, i) => (i === currentRow ? word : w)));
        },
        [currentRow, setWords]
    );

    const handleGameKeyPress = useCallback(
        async (key: string) => {
            if (
                currentRow === Settings.MAX_ROWS ||
                runningState !== RunningState.PLAYING ||
                blockingAnimation
            )
                return;

            if (key === 'Enter') {
                if (words[currentRow].length !== Settings.MAX_LETTERS) return;
                if (!WORDLIST.includes(words[currentRow].toLowerCase())) {
                    setIsInvalidWord(true);
                    return;
                }

                if (gameMode === GameMode.LEVEL) {
                    const result = await updateLastLevel(words[currentRow], signature);

                    if (result.ok === null || result.ok === false) {
                        if (result.ok === null) {
                            setDescription(result.message);
                            setTitle('Problemă internă');
                        } else {
                            setDescription(result.message);
                            setTitle('Avertisment');
                        }

                        setShowNotification(true);
                        return;
                    }

                    if (result.faultyWord) {
                        setIsInvalidWord(true);
                    }

                    if (result.game) {
                        setBlockingAnimation(true);
                        const game = result.game as GameLevelDto;
                        setCurrentRow(game.currentRow);
                        setGuessStates(game.guessStates);
                        setRunningState(game.runningState);
                        setShowRow(game.showRow);
                        setSignature(game.signature);
                        setWords(game.words);
                        setGamesWon(game.wonLevels);
                        setGamesLost(game.lostLevels);
                        setCurrentLevel(game.level);
                    }
                } else {
                    const result = await updateLastDaily(words[currentRow], signature);
                    if (result.ok === null || result.ok === false) {
                        if (result.ok === null) {
                            setDescription(result.message);
                            setTitle('Problemă internă');
                        } else {
                            setDescription(result.message);
                            setTitle('Avertisment');
                        }

                        setShowNotification(true);
                        return;
                    }

                    if (result.faultyWord) {
                        setIsInvalidWord(true);
                    }

                    if (result.game) {
                        setBlockingAnimation(true);
                        const game = result.game as GameDailyDto;
                        setCurrentRow(game.currentRow);
                        setGuessStates(game.guessStates);
                        setRunningState(game.runningState);
                        setShowRow(game.showRow);
                        setSignature(game.signature);
                        setWords(game.words);
                        setGamesWon(game.wonDailies);
                        setGamesLost(game.lostDailies);
                    }
                }
            }

            if (key === 'Backspace') {
                updateCurrentWord(words[currentRow].slice(0, -1));
            }

            if (key.match(/^[a-zA-Z]$/) && words[currentRow].length < Settings.MAX_LETTERS) {
                updateCurrentWord(words[currentRow] + key);
            }
        },
        [
            signature,
            gameMode,
            currentRow,
            words,
            runningState,
            blockingAnimation,
            updateCurrentWord,
            setBlockingAnimation,
            setCurrentLevel,
            setCurrentRow,
            setGamesLost,
            setGamesWon,
            setGuessStates,
            setRunningState,
            setShowRow,
            setSignature,
            setWords,
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
        if (runningState === RunningState.PLAYING || !loaded) return;

        const timeout = setTimeout(() => {
            const audio = runningState === RunningState.WON ? wonSound : lostSound;
            if (audio.current === null) return;

            audio.current.currentTime = 0;
            audio.current.play();
        }, 2150);

        return () => {
            clearTimeout(timeout);
        };
    }, [runningState, gameMode, loaded, wonSound, lostSound]);

    return (
        <>
            <section
                role="list"
                aria-label="Grilă de joc cu 6 rânduri de cuvinte"
                className="game-grid"
            >
                {words.map((word, index) => (
                    <GameRow
                        key={index}
                        word={word}
                        guessStates={guessStates[index]}
                        reveal={showRow[index]}
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
                <Notification
                    title={title}
                    onClose={() => {
                        setShowNotification(false);
                    }}
                    description={description}
                    visible={showNotification}
                />
            </section>
        </>
    );
};

export default GameGrid;
