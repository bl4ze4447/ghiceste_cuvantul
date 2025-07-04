'use client';

import Keyboard from '@/components/Keyboard';
import LevelBar from '@/components/game/LevelBar';
import GameGrid from '@/components/game/GameGrid';
import { usePersistentStats } from '@/hooks/usePersistentStats';
import { GameMode, GuessState } from '@/constants/constants';

import { useState, useCallback, useEffect } from 'react';

function LevelGame() {
    // Used by the on-screen keyboard to send input
    const [virtualKeys, setVirtualKeys] = useState<string[]>([]);

    // Is there any animation playing that should block the game?
    const [blockingAnimation, setBlockingAnimation] = useState(true);

    // What keys were used and what is their GuessStatus? ; 27 -> All keys (25) + BACKSPACE/ENTER
    const [usedKeys, setUsedKeys] = useState(Array(27).fill(GuessState.EMPTY));

    const consumeFirstKey = useCallback(() => {
        setVirtualKeys((vk) => vk.slice(1));
    }, []);

    const {
        loaded,
        currentLevel,
        setCurrentLevel,
        lostLevels,
        setLostLevels,
        wonLevels,
        setWonLevels,
        currentRow,
        setCurrentRow,
        words,
        setWords,
        rowsDisplayed,
        setRowsDisplayed,
        runningState,
        setRunningState,
    } = usePersistentStats(GameMode.LEVEL);

    useEffect(() => {
        if (loaded) setBlockingAnimation(false);
    }, [loaded]);

    return (
        <section>
            <LevelBar
                centerText={<p>Nivelul {currentLevel}</p>}
                won={wonLevels}
                lost={lostLevels}
            />

            <GameGrid
                gameMode={GameMode.LEVEL}
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
                setGamesWon={setWonLevels}
                setGamesLost={setLostLevels}
                currentLevel={currentLevel}
                setCurrentLevel={setCurrentLevel}
                setRunningState={setRunningState}
                guessedDaily={false} // will be ignored from here to bottom
                setGuessedDaily={() => {}}
            />

            <Keyboard setVirtualKeys={setVirtualKeys} usedKeys={usedKeys} />
        </section>
    );
}

export default LevelGame;
