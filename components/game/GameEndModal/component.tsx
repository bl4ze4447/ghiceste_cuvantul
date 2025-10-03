'use client';

import { GameMode, GuessState, Settings } from '@/constants/constants';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import './style.css';
import { FaCheck } from 'react-icons/fa6';
import { IoCopy } from 'react-icons/io5';
import { IoArrowRedo } from 'react-icons/io5';
import { IoClose } from 'react-icons/io5';
import { secretWord } from '@/utils/backendUtils';

interface GameEndModalProps {
    visible: boolean;
    isWin: boolean;
    guessGrid: GuessState[][];
    level: number | null;
    gameMode: GameMode;
    onNextLevel?: () => void;
}

const stateToEmoji = (state: GuessState): string => {
    switch (state) {
        case GuessState.GREEN:
            return '🟩';
        case GuessState.YELLOW:
            return '🟨';
        default:
            return '⬛';
    }
};

const convertGridToEmoji = (grid: GuessState[][], level: number | null): string => {
    const levelText = level !== null ? 'nivelul ' + level.toString() : 'cuvântul zilei';

    const resultRows: string[] = [];
    for (const row of grid) {
        const emojiRow = row.map(stateToEmoji).join('');
        resultRows.push(emojiRow);

        if (row.every((state) => state === GuessState.GREEN)) break;
    }

    return `Ghicește cuvântul, ${levelText} [${resultRows.length}/${
        Settings.MAX_ROWS
    }]\n${resultRows.join('\n')}`;
};

const GameEndModal: React.FC<GameEndModalProps> = ({
    visible,
    isWin,
    level,
    guessGrid,
    gameMode,
    onNextLevel,
}) => {
    const [shouldRender, setShouldRender] = useState(false);
    const [copied, setCopied] = useState(false);
    const [word, setWord] = useState('');
    const timeouts = useRef<NodeJS.Timeout[]>([]);

    useEffect(() => {
        return () => {
            timeouts.current.forEach(clearTimeout);
            timeouts.current = [];
        };
    }, []);

    const secretWordChecked = useCallback(async () => {
        const value: string | null =
            gameMode === GameMode.LEVEL
                ? localStorage.getItem('level-sw')
                : localStorage.getItem('daily-sw');
        if (value !== null && value.length === 5) {
            setWord(value);
            return;
        }

        const result = await secretWord(gameMode);
        if (result.ok === null || result.ok === false) {
            setWord(result.message);
            return;
        }

        if (gameMode === GameMode.LEVEL) localStorage.setItem('level-sw', result.message);
        else localStorage.setItem('daily-sw', result.message);
        setWord(result.message);
    }, [setWord, gameMode]);

    useEffect(() => {
        if (visible) {
            timeouts.current.push(
                setTimeout(() => {
                    setShouldRender(true);
                }, 2250)
            );

            secretWordChecked();
        } else {
            timeouts.current.push(setTimeout(() => setShouldRender(false), 10));
        }
    }, [visible, secretWordChecked]);

    const handleShare = () => {
        const result = convertGridToEmoji(guessGrid, level);
        navigator.clipboard.writeText(result).then(() => {
            setCopied(true);
        });
    };

    useEffect(() => {
        if (shouldRender === false) {
            setCopied(false);
        }
    }, [shouldRender]);

    // const [definition, setDefinition] = useState('');

    // useEffect(() => {
    //     if (word.length === 0) return;

    //     const uncheckedDefinition = fetchWordDefinition(word);
    //     uncheckedDefinition.then((def) => setDefinition(def));
    // }, [word]);

    return (
        <div
            className={`modal-overlay ${shouldRender ? 'fade-in' : 'fade-out'}`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
            onClick={() => {
                setShouldRender(false);
            }}
        >
            <div
                className="modal"
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                <div className="modal-container">
                    <h2 className="modal-title">{isWin ? 'Ai câștigat!' : 'Ai pierdut!'}</h2>
                    <button
                        className="close-button"
                        onClick={() => {
                            setShouldRender(false);
                        }}
                        aria-label="Închide fereastra"
                    >
                        <IoClose />
                    </button>
                </div>
                <p>Cuvântul pentru acest joc era:</p>
                <p className="modal-secret-word">{word}</p>
                {/* <p className="modal-definition">{definition}</p> */}
                <div className="buttons-modal-container">
                    <button
                        className="modal-button"
                        onClick={(e) => {
                            e.currentTarget.disabled = true;
                            handleShare();
                            e.currentTarget.disabled = false;
                        }}
                    >
                        {copied ? (
                            <>
                                <span>Rezultat copiat</span>
                                <FaCheck style={{ fontSize: '1.25rem' }} />
                            </>
                        ) : (
                            <>
                                <span>Copiază rezultatul</span>
                                <IoCopy style={{ fontSize: '1.25rem' }} />
                            </>
                        )}
                    </button>
                    {gameMode === GameMode.LEVEL && onNextLevel && shouldRender && (
                        <button
                            className="modal-button"
                            style={{ marginTop: '5px' }}
                            onClick={(e) => {
                                e.currentTarget.disabled = true;
                                onNextLevel();
                                e.currentTarget.disabled = false;
                            }}
                        >
                            <span>Nivelul următor</span>
                            <IoArrowRedo style={{ fontSize: '1.25rem' }} />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default GameEndModal;
