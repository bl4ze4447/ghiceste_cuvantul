'use client'

import '../../styles/GameGrid.css';
import GameRow from '../common/GameRow'
import { usePersistentGameState }   from '../../../hooks/usePersistentGameState';
import { 
    Settings, 
    GameStatus, 
    GuessStatus
} from '../../../constants/constants';
import Info from '../../Info';
import { WORDLIST }                 from '../../../constants/wordlist';
import { getDailyWord }             from '../../../utils/words_manip';

import { 
    useCallback, 
    useEffect, 
    useMemo, 
    useState 
} from 'react';
import dayjs                        from 'dayjs';
import utc                          from 'dayjs/plugin/utc';
import timezone                     from 'dayjs/plugin/timezone';
import { usePathname }              from 'next/navigation';

dayjs.extend(utc);
dayjs.extend(timezone);

interface GameGridDailyProps {
  virtualKeys: string[];
  consumeFirstKey: Function;
  blockingAnimation: boolean;
  setBlockingAnimation: React.Dispatch<React.SetStateAction<boolean>>;
  setUsedKeys: React.Dispatch<React.SetStateAction<GuessStatus[]>>;
}

const GameGridDaily: React.FC<GameGridDailyProps> = ({virtualKeys, consumeFirstKey, blockingAnimation, setBlockingAnimation, setUsedKeys}) => {
    const secretWord                            = useMemo(() => getDailyWord(), []);
    const [currentRow,      setCurrentRow]      = useState(0);
    const [words,           setWords]           = useState(Array(Settings.MAX_ROWS).fill(''));
    const [guessStatuses,   setGuessStatuses]   = useState(Array(Settings.MAX_ROWS).fill(false));
    const [gameStatus,      setGameStatus]      = useState(GameStatus.PLAYING);
    const [badWord,         setBadWord]         = useState(false);
    const [playAudio,       setPlayAudio]       = useState(true);
    const turnOffAnimation                      = useCallback(() => { setBlockingAnimation(false) }, [setBlockingAnimation]);

    const updateCurrentWord = useCallback((word: string) => {
        setWords(prevWords => prevWords.map((w, i) => i === currentRow ? word : w ));
    }, [currentRow, setWords]);
    
    const updateCurrentGuessStatus = useCallback((guessStatus: boolean) => {
        setGuessStatuses(prevGS => prevGS.map((gs, i) => i === currentRow ? guessStatus : gs));
    }, [currentRow, setGuessStatuses]); 

    const turnOffBadWord = useCallback(() => { 
        setBadWord(false);
    }, [setBadWord]);

    const pathname = usePathname();
    usePersistentGameState(
        currentRow,
        words,
        guessStatuses,
        gameStatus,
        0,
        0,
        0,
        setCurrentRow,
        setWords,
        setGuessStatuses,
        setGameStatus,
        setPlayAudio,
        pathname,
        false
    ); 

    const handleGameKeyPress = useCallback((key: string) => {
        if (!playAudio) setPlayAudio(true);
        if (currentRow === Settings.MAX_ROWS || gameStatus !== GameStatus.PLAYING || blockingAnimation) return;

        if (key === "Enter") {
            if (words[currentRow].length !== Settings.MAX_LETTERS) return;
            if (!WORDLIST.includes(words[currentRow].toUpperCase()) && !WORDLIST.includes(words[currentRow])) {
                // Make the entire row kind of bounce left-to-right, need a special state to be passed to the row
                setBadWord(true);
                setBlockingAnimation(true);
                return;
            }

            setCurrentRow(Math.min(currentRow + 1, Settings.MAX_ROWS));
            updateCurrentGuessStatus(true);
            setBlockingAnimation(true);
            return;
        }

        if (key === "Backspace") {
            updateCurrentWord(words[currentRow].slice(0, -1));
        }

        if (key.match(/^[a-zA-Z]$/) && words[currentRow].length < Settings.MAX_LETTERS) {
            updateCurrentWord(words[currentRow] + key);
        }
    }, [
        currentRow,
        words,
        gameStatus,
        blockingAnimation,
        setBlockingAnimation,
        updateCurrentGuessStatus,
        updateCurrentWord,
        setCurrentRow,
        playAudio
    ]);

    // console.log("Debugging info: \ncurrentRow: %d\nwords: %s\nguessStatuses: %s\ngameStatus: %d", currentRow, JSON.stringify(words), JSON.stringify(guessStatuses), gameStatus);

    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => { handleGameKeyPress(e.key); }
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
        if (gameStatus === GameStatus.PLAYING || !playAudio) return;

        const audio = gameStatus === GameStatus.WON ? new Audio('/sounds/correct.mp3') : new Audio('/sounds/wrong.mp3');
        audio.play();
    }, [gameStatus, playAudio]);
    
    return (
        <>
        <div className='game-grid'>
            {words.map((word, index) => (
                <GameRow
                    key={index}
                    word={word}
                    secretWord={secretWord}
                    reveal={guessStatuses[index]}
                    setGameStatus={setGameStatus}
                    turnOffAnimation={turnOffAnimation}
                    isCurrentRow={currentRow === index+1}
                    isLastRow={currentRow === Settings.MAX_ROWS}
                    setUsedKeys={setUsedKeys}
                    shouldBounce={badWord && currentRow === index}
                    turnOffBounce={turnOffBadWord}
                    beforeCurrentRow={index+1 < currentRow}
                />
            ))}
        </div>
        <Info message={`Cuvântul era`} important={secretWord} hide={gameStatus === GameStatus.PLAYING} hideText={gameStatus === GameStatus.PLAYING} />
        </>
    )
}

export default GameGridDaily;