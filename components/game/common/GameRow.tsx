'use client'

import './GameRow.css';
import LetterBox from './LetterBox';
import { 
    Settings, 
    GuessStatus, 
    TimesCSS, 
    GameStatus 
} from '@/constants/constants';
import { 
    getGuessStatuses, 
    getKeyPos 
} from '@/utils/words_manip';

import { 
    useEffect, 
    useMemo, 
    memo 
} from 'react';

interface GameRowProps {
  word: string;
  secretWord: string;
  turnOffAnimation: Function,
  reveal: boolean,
  setGameStatus: React.Dispatch<React.SetStateAction<GameStatus>>;
  isCurrentRow: boolean;
  isLastRow: boolean;
  setUsedKeys: React.Dispatch<React.SetStateAction<GuessStatus[]>>;
  shouldBounce: boolean;
  turnOffBounce: Function;
  beforeCurrentRow: boolean;
}

const GameRow: React.FC<GameRowProps> = ({
    word, 
    secretWord, 
    turnOffAnimation, 
    reveal, 
    setGameStatus, 
    isCurrentRow, 
    isLastRow,
    setUsedKeys, 
    shouldBounce, 
    turnOffBounce, 
    beforeCurrentRow
}) => {
    const guessStatuses = useMemo(() => reveal ? getGuessStatuses(word, secretWord) : Array(Settings.MAX_LETTERS).fill(GuessStatus.EMPTY), [reveal, word, secretWord]);

    useEffect(() => {
        if (reveal && isCurrentRow) {
            setTimeout(() => {
                turnOffAnimation();
                if (guessStatuses.every(gs => gs === GuessStatus.GREEN)) {
                    setGameStatus(GameStatus.WON);
                } else if (reveal && isLastRow) {
                    setGameStatus(GameStatus.LOST);
                }
            }, TimesCSS.LETTER_FLIP_TRANSITION + (TimesCSS.LETTER_FLIP_DELAY-1) * Settings.MAX_LETTERS);
        }

        if (shouldBounce) {
            setTimeout(() => {
                turnOffAnimation();
                turnOffBounce();
            }, TimesCSS.ROW_BAD_ANIMATION);
        }
    }, [isCurrentRow, reveal, turnOffAnimation, shouldBounce, turnOffBounce, guessStatuses, isLastRow, setGameStatus]);

    useEffect(() => {
        
    }, [reveal, setGameStatus, isLastRow, guessStatuses]);

    useEffect(() => {
        if ((reveal && isCurrentRow) || beforeCurrentRow) {
            setUsedKeys((val) => {
                const newKeys = [...val];
                word.split('').forEach((key, idx) => {
                    const pos = getKeyPos(key);
                    if (Number(newKeys[pos]) < Number(guessStatuses[idx])) {
                        newKeys[pos] = guessStatuses[idx];
                    }
                });

                return newKeys;
            });
        }
    }, [isCurrentRow, guessStatuses, setUsedKeys, word, reveal, beforeCurrentRow]);

    return (
        <div className={`game-row ${shouldBounce ? 'bounce-bad' : ''}`}>
            {Array(Settings.MAX_LETTERS).fill(0).map((_, i) => (
                <LetterBox 
                    key={i}
                    character={i < word.length ? word[i] : ''}
                    guessStatus={guessStatuses[i]}
                    position={i}
                    reveal={i < word.length ? reveal : false}
                />
            ))}
        </div>
    );
}

export default memo(GameRow);