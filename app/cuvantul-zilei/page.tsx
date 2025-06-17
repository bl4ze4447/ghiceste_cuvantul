"use client"

import '../styles/DailyGame.css';

import { 
    GameMode, 
    GuessState 
} from "@/constants/constants";
import GameGridDaily                from "@/components/game/daily_related/GameGridDaily";
import Keyboard                     from "@/components/Keyboard";

import { 
    useState, 
    useCallback, 
    useEffect
} from "react";
import { usePersistentStats }       from '@/hooks/usePersistentStats';
import LevelBar from '@/components/game/level_related/LevelBar';

function DailyGame() {
    // Used by the on-screen keyboard to send input
    const [virtualKeys,       setVirtualKeys]       = useState<string[]>([]);
    // Is there any animation playing that should block the game?
    const [blockingAnimation, setBlockingAnimation] = useState(true);
    // What keys were used and what is their GuessStatus? ; 27 -> All keys (25) + BACKSPACE/ENTER
    const [usedKeys,          setUsedKeys]          = useState(Array(27).fill(GuessState.EMPTY));
    const consumeFirstKey                           = useCallback(() => { setVirtualKeys(vk => vk.slice(1)) }, [setVirtualKeys]);

    const {
        loaded,
        guessedDaily,     setGuessedDaily,
        lostDaily,        setLostDaily,
        wonDaily,         setWonDaily,
        currentRow,       setCurrentRow,
        words,            setWords,
        rowsDisplayed,    setRowsDisplayed,
        runningState,     setRunningState
    } = usePersistentStats(GameMode.DAILY);

    useEffect(() => {
        if (!loaded) return;

        setBlockingAnimation(false);
    }, [loaded]);

    return (
    <section>
        <LevelBar 
            won={wonDaily}
            lost={lostDaily}
            centerText={(
                <p className="daily-word-message">Cuvântul zilei</p>
            )}
        />
        <GameGridDaily
            virtualKeys={virtualKeys} 
            consumeFirstKey={consumeFirstKey} 
            blockingAnimation={blockingAnimation} 
            setBlockingAnimation={setBlockingAnimation} 
            setUsedKeys={setUsedKeys} 
            currentRow={currentRow} 
            setCurrentRow={setCurrentRow}
            words={words}
            setWords={setWords}
            rowsDisplayed={rowsDisplayed}
            setRowsDisplayed={setRowsDisplayed}
            runningState={runningState}
            guessedDaily={guessedDaily}
            setGuessedDaily={setGuessedDaily}
            wonDaily={wonDaily}
            setWonDaily={setWonDaily}
            lostDaily={lostDaily}
            setLostDaily={setLostDaily}
            setRunningState={setRunningState} />
        <Keyboard 
            setVirtualKeys={setVirtualKeys} 
            usedKeys={usedKeys} />
    </section>
    )
}

export default DailyGame;