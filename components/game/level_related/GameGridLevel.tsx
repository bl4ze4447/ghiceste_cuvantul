'use client'

import '../../styles/GameGrid.css';
import GameRow                       from '../common/GameRow'
import { 
    Settings, 
    GameStatus,
    GuessStatus 
} from '../../../constants/constants';
import { getWordByLevel }           from '../../../utils/words_manip';
import { WORDLIST }                 from '../../../constants/wordlist';
import Info                         from '../../Info';

import { 
    useCallback, 
    useEffect, 
    useMemo, 
    useState ,
} from 'react';
import dayjs                        from 'dayjs';
import utc                          from 'dayjs/plugin/utc';
import timezone                     from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

interface GameGridLevelProps {
    virtualKeys: string[];
    consumeFirstKey: Function;
    blockingAnimation: boolean;
    setBlockingAnimation: React.Dispatch<React.SetStateAction<boolean>>;
    setUsedKeys: React.Dispatch<React.SetStateAction<GuessStatus[]>>;
    currentLevel: number;
    incrementLevel: Function;
    incrementRights: Function;
    incrementWrongs: Function;
    currentRow: number, 
    setCurrentRow: React.Dispatch<React.SetStateAction<number>>,
    words: string[],
    setWords: React.Dispatch<React.SetStateAction<string[]>>,
    guessStatuses: boolean[],
    setGuessStatuses: React.Dispatch<React.SetStateAction<boolean[]>>,
    gameStatus: GameStatus,
    setGameStatus: React.Dispatch<React.SetStateAction<GameStatus>>
}

const GameGridLevel: React.FC<GameGridLevelProps> = ({
    virtualKeys, 
    consumeFirstKey, 
    blockingAnimation, 
    setBlockingAnimation, 
    setUsedKeys, 
    currentLevel, 
    incrementLevel, 
    incrementRights, 
    incrementWrongs, 
    currentRow, 
    setCurrentRow,
    words,
    setWords,
    guessStatuses,
    setGuessStatuses,
    gameStatus,
    setGameStatus
}) => {
    const secretWord                            = useMemo(() => getWordByLevel(currentLevel), [currentLevel]);
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

    const handleGameKeyPress = useCallback((key: string) => {
        if (!playAudio) setPlayAudio(true);
        if (currentRow === Settings.MAX_ROWS || gameStatus !== GameStatus.PLAYING || blockingAnimation) return;

        if (key === "Enter") {
            if (words[currentRow].length !== Settings.MAX_LETTERS) return;
            if (!WORDLIST.includes(words[currentRow].toUpperCase())) {
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

    //console.log("Debugging info: \ncurrentRow: %d\nwords: %s\nguessStatuses: %s\ngameStatus: %d", currentRow, JSON.stringify(words), JSON.stringify(guessStatuses), gameStatus);

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
        if (gameStatus === GameStatus.PLAYING) return;

        const audio = gameStatus === GameStatus.WON ? new Audio('/sounds/correct.mp3') : new Audio('/sounds/wrong.mp3');
        if (playAudio) audio.play();
        setTimeout(() => {
            // reset all data to initial state
            setCurrentRow(0);
            setWords(Array(Settings.MAX_ROWS).fill(''));
            setGuessStatuses(Array(Settings.MAX_ROWS).fill(false));
            setGameStatus(GameStatus.PLAYING);
            setUsedKeys((val) => val.map(() => GuessStatus.EMPTY));
            incrementLevel();
            if (gameStatus === GameStatus.WON) incrementRights();
            else incrementWrongs();

            setGameStatus(GameStatus.PLAYING);
        }, 4000);
    }, [gameStatus, incrementLevel, setGameStatus, incrementRights, incrementWrongs, setUsedKeys, playAudio]);
    
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

export default GameGridLevel;