"use client"

import '../styles/DailyGame.css'
import { GameType, GuessStatus }              from "../../constants/constants";
import GameGridDaily                from "../../components/game/daily_related/GameGridDaily";
import Keyboard                     from "../../components/Keyboard";

import { 
    useState, 
    useCallback 
} from "react";
import { FaCloudSun }               from "react-icons/fa6";
import { usePersistentStats } from '@/hooks/usePersistentStats';

function DailyGame() {
    // Used by the on-screen keyboard to send input
    const [virtualKeys,       setVirtualKeys]       = useState<string[]>([]);
    // Is there any animation playing that should block the game?
    const [blockingAnimation, setBlockingAnimation] = useState(false);
    // What keys were used and what is their GuessStatus? ; 27 -> All keys (25) + BACKSPACE/ENTER
    const [usedKeys,          setUsedKeys]          = useState(Array(27).fill(GuessStatus.EMPTY));
    const consumeFirstKey                           = useCallback(() => { setVirtualKeys(vk => vk.slice(1)) }, [setVirtualKeys]);

    const { currentRow,       setCurrentRow,
            words,            setWords,
            guessStatuses,    setGuessStatuses,
            gameStatus,       setGameStatus}  = usePersistentStats(GameType.DAILY);

    return (
    <section>
        <div className="daily-word-container">
            <FaCloudSun className='fa-cloud-sun'/> 
            <p className="daily-word-message">Cuvântul zilei</p>
        </div>
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
            guessStatuses={guessStatuses}
            setGuessStatuses={setGuessStatuses}
            gameStatus={gameStatus}
            setGameStatus={setGameStatus} />
        <Keyboard 
            setVirtualKeys={setVirtualKeys} 
            usedKeys={usedKeys} />
    </section>
    )
}

export default DailyGame;