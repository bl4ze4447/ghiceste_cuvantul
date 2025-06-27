'use client';

import './LetterBox.css';

import { GuessState, TimesCSS } from '@/constants/constants';
import { getLetterClass } from '@/utils/words_manip';

import { useEffect, useState } from 'react';

interface LetterBoxProps {
    character: string;
    guessState: GuessState;
    position: number;
    reveal: boolean;
}

const LetterBox: React.FC<LetterBoxProps> = ({ character, guessState, position, reveal }) => {
    const [bounce, setBounce] = useState(character !== '');

    useEffect(() => {
        setTimeout(() => {
            if (bounce) {
                setBounce(false);
            }
        }, TimesCSS.LETTER_BOUNCE / 2);
    }, [setBounce, bounce]);

    useEffect(() => {
        setBounce(character !== '');
    }, [character]);

    const transitionDelay = 0.3 * position;
    return (
        <div
            className={`letter-box ${getLetterClass(guessState, false)} ${
                reveal ? 'letter-flip' : ''
            } ${bounce ? 'letter-bounce' : ''}`}
            style={{
                transition: `rotate 0.5s linear ${transitionDelay}s, background-color 0.5s ease-in-out ${transitionDelay}s, 
                border 0.5s linear ${transitionDelay}s, scale 0.3s ease-in-out`,
            }}
        >
            <span
                role="listitem"
                aria-label={`Litera ${character || 'gol'}, poziția ${position + 1}, stare: ${
                    guessState === GuessState.GREEN
                        ? 'corectă'
                        : guessState === GuessState.YELLOW
                        ? 'parțial corectă'
                        : guessState === GuessState.GRAY
                        ? 'greșită'
                        : 'necompletată'
                }`}
                className="letter"
            >
                {character}
            </span>
        </div>
    );
};

export default LetterBox;
