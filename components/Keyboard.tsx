'use client';

import './styles/Keyboard.css';
import { getLetterClass } from '@/utils/wordUtils';

import { memo, useCallback } from 'react';
import { AiOutlineEnter } from 'react-icons/ai';
import { IoBackspaceOutline } from 'react-icons/io5';
import { GuessState } from '@/constants/constants';

const rowOneKeys = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'];
const rowTwoKeys = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'];
const rowThreeKeys = ['Enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'Backspace'];

interface KeyboardProps {
    setVirtualKeys: React.Dispatch<React.SetStateAction<string[]>>;
    usedKeys: GuessState[];
}

const Keyboard: React.FC<KeyboardProps> = ({ setVirtualKeys, usedKeys }) => {
    const handleKeyClick = useCallback(
        (key: string) => {
            setVirtualKeys((keys) => [...keys, key]);
        },
        [setVirtualKeys]
    );

    return (
        <div className="keyboard-fixed">
            <section className="keyboard-grid">
                <div className="key-row row-1">
                    {rowOneKeys.map((key, i) => (
                        <button
                            aria-label={
                                key === 'Enter'
                                    ? 'Cheia Enter'
                                    : key === 'Backspace'
                                    ? 'Cheia Backspace'
                                    : `Litera ${key}`
                            }
                            key={i}
                            className={`key-box ${getLetterClass(usedKeys[i], true)}`}
                            onPointerDown={() => handleKeyClick(key)}
                        >
                            <p className="key-letter">{key}</p>
                        </button>
                    ))}
                </div>
                <div className="key-row row-2">
                    <div></div>
                    {rowTwoKeys.map((key, i) => (
                        <button
                            aria-label={
                                key === 'Enter'
                                    ? 'Cheia Enter'
                                    : key === 'Backspace'
                                    ? 'Cheia Backspace'
                                    : `Litera ${key}`
                            }
                            key={i + rowOneKeys.length}
                            className={`key-box ${getLetterClass(
                                usedKeys[i + rowOneKeys.length],
                                true
                            )}`}
                            onPointerDown={() => handleKeyClick(key)}
                        >
                            {key.length === 1 && <p className="key-letter">{key}</p>}
                        </button>
                    ))}
                </div>
                <div className="key-row row-3">
                    {rowThreeKeys.map((key, i) => (
                        <button
                            aria-label={
                                key === 'Enter'
                                    ? 'Cheia Enter'
                                    : key === 'Backspace'
                                    ? 'Cheia Backspace'
                                    : `Litera ${key}`
                            }
                            key={i + rowOneKeys.length + rowTwoKeys.length}
                            className={`key-box ${getLetterClass(
                                usedKeys[i + rowOneKeys.length + rowTwoKeys.length],
                                true
                            )}`}
                            onPointerDown={() => handleKeyClick(key)}
                        >
                            {key === 'Enter' && <AiOutlineEnter className="react-icon longer" />}
                            {key === 'Backspace' && (
                                <IoBackspaceOutline className="react-icon longer" />
                            )}
                            {key.length === 1 && <p className="key-letter">{key}</p>}
                        </button>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default memo(Keyboard);
