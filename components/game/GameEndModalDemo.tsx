'use client';

import { GuessState, Settings } from '@/constants/constants';
import React, { useEffect, useRef, useState } from 'react';
import './GameEndModal.css';
import { FaCheck } from 'react-icons/fa6';
import { IoCopy } from 'react-icons/io5';
import { IoClose } from 'react-icons/io5';

import './LevelBar.css';
import Link from 'next/link';

interface GameEndModalDemoProps {
    visible: boolean;
    isWin: boolean;
    guessGrid: GuessState[][];
}

const stateToEmoji = (state: GuessState): string => {
    switch (state) {
        case GuessState.GREEN:
            return '🟩';
        case GuessState.YELLOW:
            return '🟨';
        case GuessState.GRAY:
            return '⬛';
        default:
            return '⬛';
    }
};

const convertGridToEmoji = (grid: GuessState[][]): string => {
    const levelText = 'demo';

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

const GameEndModalDemo: React.FC<GameEndModalDemoProps> = ({ visible, isWin, guessGrid }) => {
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

    const secretWordChecked = async () => {
        setWord('carte');
    };

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
    }, [visible]);

    const handleShare = () => {
        const result = convertGridToEmoji(guessGrid);
        navigator.clipboard.writeText(result).then(() => {
            setCopied(true);
        });
    };

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
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <div></div>
                    <h2
                        id="modal-title"
                        style={{
                            marginTop: '-10px',
                            marginBottom: '10px',
                        }}
                    >
                        {isWin ? 'Ai câștigat!' : 'Ai pierdut!'}
                    </h2>
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
                <p className="exo">Cuvântul pentru acest joc era:</p>
                <p style={{ fontSize: '1.2rem' }}>{word}</p>
                <div
                    style={{
                        marginTop: '15px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <button
                        className="connect-button-small"
                        onClick={(e) => {
                            e.currentTarget.disabled = true;
                            handleShare();
                            e.currentTarget.disabled = false;
                        }}
                    >
                        {copied ? (
                            <>
                                <span>Rezultat copiat</span>
                                <span style={{ marginLeft: '5px', fontSize: '1.35rem' }}>
                                    <FaCheck />
                                </span>
                            </>
                        ) : (
                            <>
                                <span>Copiază rezultatul</span>
                                <span style={{ marginLeft: '5px', fontSize: '1.35rem' }}>
                                    <IoCopy />
                                </span>
                            </>
                        )}
                    </button>
                    <p className="exo" style={{ marginTop: '20px' }}>
                        Pentru a putea accesa toate modurile de joc,statistici personalizate și
                        progres salvat peste tot, vă rugăm să folosiți un cont:
                    </p>
                    <Link
                        href={'/cont/login'}
                        className="connect-button-small"
                        style={{ marginTop: '10px' }}
                    >
                        Am deja un cont
                    </Link>
                    <Link
                        href={'/cont/register'}
                        className="connect-button-small"
                        style={{ marginTop: '10px' }}
                    >
                        <span>Creează cont</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default GameEndModalDemo;
