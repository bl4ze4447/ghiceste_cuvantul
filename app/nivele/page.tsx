"use client"

import Keyboard                     from "../../components/Keyboard";
import LevelBar                     from "../../components/game/level_related/LevelBar";
import GameGridLevel                from "../../components/game/level_related/GameGridLevel";
import { GameType, GuessStatus }              from "../../constants/constants";
import { usePersistentStats }       from "../../hooks/usePersistentStats"


import { 
    useState, 
    useCallback 
} from "react";

function LevelGame() {
    // Used by the on-screen keyboard to send input
    const [virtualKeys,       setVirtualKeys]       = useState<string[]>([]);
    // Is there any animation playing that should block the game?
    const [blockingAnimation, setBlockingAnimation] = useState(false);
    // What keys were used and what is their GuessStatus? ; 27 -> All keys (25) + BACKSPACE/ENTER
    const [usedKeys,          setUsedKeys]          = useState(Array(27).fill(GuessStatus.EMPTY));

    const { currentLevel,     setCurrentLevel,
            numOfWrongWords,  setNumOfWrongWords,
            numOfRightWords,  setNumOfRightWords,
            currentRow,       setCurrentRow,
            words,            setWords,
            guessStatuses,    setGuessStatuses,
            gameStatus,       setGameStatus}  = usePersistentStats(GameType.LEVEL);
    const consumeFirstKey                           = useCallback(() => { setVirtualKeys(vk => vk.slice(1)) }, [setVirtualKeys]);
    const incrementLevel                            = useCallback(() => { setCurrentLevel((lvl) => lvl+1) }, [setCurrentLevel]);
    const incrementRights                           = useCallback(() => { setNumOfRightWords((rg) => rg+1) }, [setNumOfRightWords]);
    const incrementWrongs                           = useCallback(() => { setNumOfWrongWords((wrg) => wrg+1) }, [setNumOfWrongWords]);

    return (
    <section>
        <LevelBar 
            currentLevel={currentLevel}
            numOfRightWords={numOfRightWords}
            numOfWrongWords={numOfWrongWords} />
        <GameGridLevel
            virtualKeys={virtualKeys} 
            consumeFirstKey={consumeFirstKey} 
            blockingAnimation={blockingAnimation} 
            setBlockingAnimation={setBlockingAnimation} 
            setUsedKeys={setUsedKeys} 
            currentLevel={currentLevel} 
            incrementLevel={incrementLevel}
            incrementRights={incrementRights}
            incrementWrongs={incrementWrongs}
            currentRow={currentRow} 
            setCurrentRow={setCurrentRow}
            words={words}
            setWords={setWords}
            guessStatuses={guessStatuses}
            setGuessStatuses={setGuessStatuses}
            gameStatus={gameStatus}
            setGameStatus={setGameStatus}
            />
        <Keyboard 
            setVirtualKeys={setVirtualKeys} 
            usedKeys={usedKeys} />
    </section>
    )
}

export default LevelGame;