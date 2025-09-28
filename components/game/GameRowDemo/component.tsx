'use client';

import '../GameRow/style.css';
import LetterBox from '../LetterBox/component';
import { Settings, GuessState, TimesCSS, RunningState } from '@/constants/constants';
import { getGuessStates, getKeyPos } from '@/utils/wordUtils';

import { useEffect, useMemo, memo } from 'react';

interface GameRowDemoProps {
    secretWord: string;
    word: string;
    isCurrentRow: boolean;
    isLastRow: boolean;
    beforeCurrentRow: boolean;
    shouldBounce: boolean;
    reveal: boolean;
    row: number;
    setUsedKeys: React.Dispatch<React.SetStateAction<GuessState[]>>;
    setRunningState: React.Dispatch<React.SetStateAction<RunningState>>;
    disableBlockingAnimation: () => void;
    setGuessStates: (idx: number, guessStates: GuessState[]) => void;
    disableBounceAnimation: () => void;
}

const GameRowDemo: React.FC<GameRowDemoProps> = ({
    secretWord,
    word,
    isCurrentRow,
    isLastRow,
    beforeCurrentRow,
    shouldBounce,
    reveal,
    row,
    setUsedKeys,
    setRunningState,
    setGuessStates,
    disableBlockingAnimation,
    disableBounceAnimation,
}) => {
    const guessStates = useMemo(
        () =>
            reveal
                ? getGuessStates(word, secretWord)
                : Array(Settings.MAX_LETTERS).fill(GuessState.EMPTY),
        [reveal, word, secretWord]
    );

    useEffect(() => {
        setGuessStates(row, guessStates);
    }, [guessStates, row, setGuessStates]);

    useEffect(() => {
        if (reveal && isCurrentRow) {
            setTimeout(() => {
                disableBlockingAnimation();
                if (guessStates.every((gs) => gs === GuessState.GREEN)) {
                    setRunningState(RunningState.WON);
                } else if (reveal && isLastRow) {
                    setRunningState(RunningState.LOST);
                }
            }, TimesCSS.LETTER_FLIP_TRANSITION + (TimesCSS.LETTER_FLIP_DELAY - 1) * Settings.MAX_LETTERS);
        }

        if (shouldBounce) {
            setTimeout(() => {
                disableBlockingAnimation();
                disableBounceAnimation();
            }, TimesCSS.ROW_BAD_ANIMATION);
        }
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
                        guessState={guessStates[i]}
                        position={i}
                        reveal={i < word.length ? reveal : false}
                    />
                ))}
        </section>
    );
};

export default memo(GameRowDemo);
