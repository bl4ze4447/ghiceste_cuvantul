'use client';

import './style.css';
import LetterBox from '../LetterBox/component';
import { Settings, GuessState, TimesCSS, RunningState } from '@/constants/constants';
import { getKeyPos } from '@/utils/wordUtils';

import { useEffect, memo } from 'react';

interface GameRowProps {
    word: string;
    isCurrentRow: boolean;
    isLastRow: boolean;
    beforeCurrentRow: boolean;
    shouldBounce: boolean;
    guessStates: GuessState[];
    reveal: boolean;
    setUsedKeys: React.Dispatch<React.SetStateAction<GuessState[]>>;
    setRunningState: React.Dispatch<React.SetStateAction<RunningState>>;
    disableBlockingAnimation: () => void;
    disableBounceAnimation: () => void;
}

const GameRow: React.FC<GameRowProps> = ({
    word,
    isCurrentRow,
    isLastRow,
    beforeCurrentRow,
    shouldBounce,
    guessStates,
    reveal,
    setUsedKeys,
    setRunningState,
    disableBlockingAnimation,
    disableBounceAnimation,
}) => {
    useEffect(() => {
        let timeout1: NodeJS.Timeout, timeout2: NodeJS.Timeout;
        if (reveal && isCurrentRow) {
            timeout1 = setTimeout(() => {
                disableBlockingAnimation();
            }, TimesCSS.LETTER_FLIP_TRANSITION + (TimesCSS.LETTER_FLIP_DELAY - 1) * Settings.MAX_LETTERS);
        }

        if (shouldBounce) {
            timeout2 = setTimeout(() => {
                disableBlockingAnimation();
                disableBounceAnimation();
            }, TimesCSS.ROW_BAD_ANIMATION);
        }

        return () => {
            clearTimeout(timeout1);
            clearTimeout(timeout2);
        };
    }, [
        isCurrentRow,
        reveal,
        disableBlockingAnimation,
        shouldBounce,
        disableBounceAnimation,
        guessStates,
        isLastRow,
        setRunningState,
    ]);

    useEffect(() => {
        if ((reveal && isCurrentRow) || beforeCurrentRow) {
            setUsedKeys((val) => {
                const newKeys = [...val];
                word.split('').forEach((key, idx) => {
                    const pos = getKeyPos(key);
                    if (Number(newKeys[pos]) < Number(guessStates[idx])) {
                        newKeys[pos] = guessStates[idx];
                    }
                });

                return newKeys;
            });
        }
    }, [isCurrentRow, guessStates, setUsedKeys, word, reveal, beforeCurrentRow]);

    return (
        <section
            role="list"
            aria-label={`Rând de cuvinte ${isCurrentRow ? '(curent)' : ''} ${
                beforeCurrentRow ? '(anterior)' : ''
            }`}
            className={`game-row ${shouldBounce ? 'bounce-bad' : ''}`}
        >
            {Array(Settings.MAX_LETTERS)
                .fill(0)
                .map((_, i) => (
                    <LetterBox
                        key={i}
                        character={i < word.length ? word[i] : ''}
                        guessState={reveal ? guessStates[i] : GuessState.EMPTY}
                        position={i}
                        reveal={reveal}
                    />
                ))}
        </section>
    );
};

export default memo(GameRow);
