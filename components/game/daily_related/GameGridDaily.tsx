'use client'

import '../../styles/GameGrid.css';

import GameRow from '../common/GameRow';
import Info                         from '../../Info';
import { 
    Settings, 
    GameMode, 
    GuessState,
    RunningState
} from '@/constants/constants';
import { WORDLIST }                 from '@/constants/wordlist';
import { getDailyWord }             from '@/utils/words_manip';

import { 
    useCallback, 
    useEffect, 
    useMemo, 
    useState 
} from 'react';
import dayjs                        from 'dayjs';
import utc                          from 'dayjs/plugin/utc';
import timezone                     from 'dayjs/plugin/timezone';
import { authorizedFetch } from '@/utils/authorizedFetch';
import { GameDailyDto } from '@/dto/game/gameDaily';

dayjs.extend(utc);
dayjs.extend(timezone);

interface GameGridDailyProps {
    virtualKeys: string[];
    words: string[];
    rowsDisplayed: boolean[];
    runningState: RunningState;
    currentRow: number;
    guessedDaily: boolean;
    wonDaily: number;
    lostDaily: number;
    blockingAnimation: boolean;
    consumeFirstKey: () => void;
    setGuessedDaily: React.Dispatch<React.SetStateAction<boolean>>;
    setLostDaily: React.Dispatch<React.SetStateAction<number>>;
    setWonDaily: React.Dispatch<React.SetStateAction<number>>;
    setBlockingAnimation: React.Dispatch<React.SetStateAction<boolean>>;
    setUsedKeys: React.Dispatch<React.SetStateAction<GuessState[]>>;
    setCurrentRow: React.Dispatch<React.SetStateAction<number>>;
    setWords: React.Dispatch<React.SetStateAction<string[]>>;
    setRowsDisplayed: React.Dispatch<React.SetStateAction<boolean[]>>;
    setRunningState: React.Dispatch<React.SetStateAction<RunningState>>
}

const GameGridDaily: React.FC<GameGridDailyProps> = ({
    virtualKeys,
    words,
    rowsDisplayed,
    runningState,
    currentRow,
    guessedDaily,
    wonDaily,
    lostDaily,
    blockingAnimation,
    consumeFirstKey,
    setGuessedDaily,
    setWonDaily,
    setLostDaily,
    setBlockingAnimation,
    setUsedKeys,
    setCurrentRow,
    setWords,
    setRowsDisplayed,
    setRunningState
}) => {
    async function uploadGameData() {
        try {
            return;
            const body: GameDailyDto = {
                wonDaily: wonDaily,
                lostDaily: lostDaily,
                words: words,
                currentRow: currentRow,
                rowsDisplayed: rowsDisplayed,
                runningState: runningState
            };

            const response = await authorizedFetch("http://localhost:5224/api/game/daily-last", {
                method: "PUT",
                headers: {
                "Content-Type": "application/json"
                },
                credentials: 'include',
                body: JSON.stringify(body)
            });

            if (!response.ok) {
                // todo: show message
            }
        } catch (_) {
            // todo: show message (probabil unauthorized, trebuie logat din nou utilizatorul)
        }
    }
    async function fetchGameData() {
        try {
            const response = await authorizedFetch("http://localhost:5224/api/game/daily-last", {
                method: "GET",
                headers: {
                "Content-Type": "application/json"
                },
                credentials: 'include'
            });

            if (!response.ok) {
                // todo
            }

            const data = await response.json();
            const lastGame: GameDailyDto = data.game;

            setWords(lastGame.words);
            setCurrentRow(lastGame.currentRow);
            setRunningState(lastGame.runningState);
            setWonDaily(lastGame.wonDaily);
            setLostDaily(lastGame.lostDaily);
            setRowsDisplayed(lastGame.rowsDisplayed);
            //todo: currentRow in database, modificat dto-urile in backend, modificat gameRow si persistentStats
        } catch (_) {
            // todo
        }
    }

    const secretWord                            = useMemo(() => getDailyWord(), []);
    const [newGameStarted, setNewGameStarted]   = useState(false);
    const [isInvalidWord,   setIsInvalidWord]   = useState(false);

    const disableBounceAnimation = useCallback(() => {
        setIsInvalidWord(false);
    }, [setIsInvalidWord]);
    const disableBlockingAnimation = useCallback(() => { 
        setBlockingAnimation(false) 
    }, [setBlockingAnimation]);
    const updateCurrentWord = useCallback((word: string) => {
        setWords(prevWords => prevWords.map((w, i) => i === currentRow ? word : w ));
    }, [currentRow, setWords]);
    const updateCurrentRowDisplay = useCallback((displayRow: boolean) => {
        setRowsDisplayed(prev => prev.map((value, i) => i === currentRow ? displayRow : value));
    }, [currentRow, setRowsDisplayed]); 
    
    const handleGameKeyPress = useCallback(async (key: string) => {
        if (currentRow === Settings.MAX_ROWS || runningState !== RunningState.PLAYING || blockingAnimation) return;

        if (key === "Enter") {
            if (words[currentRow].length !== Settings.MAX_LETTERS) return;
            if (!WORDLIST.includes(words[currentRow].toUpperCase())) {
                // Make the entire row kind of bounce left-to-right, need a special state to be passed to the row
                setIsInvalidWord(true);
                setBlockingAnimation(true);
                return;
            }

            setCurrentRow(Math.min(currentRow + 1, Settings.MAX_ROWS));
            updateCurrentRowDisplay(true);
            setBlockingAnimation(true);
            // await updateLastGame();
            return;
        }

        if (key === "Backspace") 
            updateCurrentWord(words[currentRow].slice(0, -1));


        if (key.match(/^[a-zA-Z]$/) && words[currentRow].length < Settings.MAX_LETTERS)
            updateCurrentWord(words[currentRow] + key);
    }, [
        currentRow,
        words,
        runningState,
        blockingAnimation,
        setBlockingAnimation,
        updateCurrentRowDisplay,
        updateCurrentWord,
        setCurrentRow,
    ]);

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
        if (runningState === RunningState.PLAYING) return;

        const audio = runningState === RunningState.WON ? new Audio('/sounds/correct.mp3') : new Audio('/sounds/wrong.mp3');
        audio.play();
        if (guessedDaily === false) {
            setTimeout(() => {            
                if (runningState === RunningState.WON) setWonDaily((prev) => prev+1);
                else setLostDaily((prev) => prev+1);

                setGuessedDaily(true);
            }, 4000);
        }
    }, [runningState, setRunningState, setLostDaily, setWonDaily, setUsedKeys, setCurrentRow, setRowsDisplayed, setWords]);
    
    return (
        <>
        <div className='game-grid'>
            {words.map((word, index) => (
                <GameRow
                    key={index}
                    word={word}
                    secretWord={secretWord}
                    reveal={rowsDisplayed[index]}
                    setRunningState={setRunningState}
                    disableBlockingAnimation={disableBlockingAnimation}
                    isCurrentRow={currentRow === index+1}
                    isLastRow={currentRow === Settings.MAX_ROWS}
                    setUsedKeys={setUsedKeys}
                    shouldBounce={isInvalidWord && currentRow === index}
                    disableBounceAnimation={disableBounceAnimation}
                    beforeCurrentRow={index+1 < currentRow}
                />
            ))}
        </div>
        <Info message={`Cuvântul era`} important={secretWord} hide={runningState === RunningState.PLAYING} hideText={runningState === RunningState.PLAYING} />
        </>
    )
}

export default GameGridDaily;