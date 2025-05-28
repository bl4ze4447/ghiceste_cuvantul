"use client"

import '../styles/DailyGame.css'
import { GuessStatus }              from "../../constants/constants";
import GameGridDaily                from "../../components/game/daily_related/GameGridDaily";
import Keyboard                     from "../../components/Keyboard";

import { 
    useState, 
    useCallback 
} from "react";
import { FaCloudSun }               from "react-icons/fa6";

function DailyGame() {
    // Used by the on-screen keyboard to send input
    const [virtualKeys,       setVirtualKeys]       = useState<string[]>([]);
    // Is there any animation playing that should block the game?
    const [blockingAnimation, setBlockingAnimation] = useState(false);
    // What keys were used and what is their GuessStatus? ; 27 -> All keys (25) + BACKSPACE/ENTER
    const [usedKeys,          setUsedKeys]          = useState(Array(27).fill(GuessStatus.EMPTY));
    const consumeFirstKey                           = useCallback(() => { setVirtualKeys(vk => vk.slice(1)) }, [setVirtualKeys]);
    
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
            setUsedKeys={setUsedKeys} />
        <Keyboard 
            setVirtualKeys={setVirtualKeys} 
            usedKeys={usedKeys} />
    </section>
    )
}

export default DailyGame;