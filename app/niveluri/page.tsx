'use client';

import Keyboard from '@/components/Keyboard';
import LevelBar from '@/components/game/LevelBar';
import GameGrid from '@/components/game/GameGrid';
import { usePersistentStats } from '@/hooks/usePersistentStats';
import { GameMode, GuessState, RunningState, Settings } from '@/constants/constants';

import { useState, useCallback, useEffect } from 'react';
import BackButton from '@/components/BackButton';
import GameEndModal from '@/components/game/GameEndModal';

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

    const resetGame = () => {
        setCurrentRow(0);
        setWords(Array(Settings.MAX_ROWS).fill(''));
        setShowRow(Array(Settings.MAX_ROWS).fill(false));
        setRunningState(RunningState.PLAYING);
        setGuessStates(
            Array.from({ length: Settings.MAX_ROWS }, () =>
                Array(Settings.MAX_LETTERS).fill(GuessState.EMPTY)
            )
        );
        setUsedKeys((val) => val.map(() => GuessState.EMPTY));
        setCurrentLevel((prev) => prev + 1);
    };

    const {
        loaded,
        signature,
        setSignature,
        guessStates,
        setGuessStates,
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
        showRow,
        setShowRow,
        runningState,
        setRunningState,
    } = usePersistentStats(GameMode.LEVEL);

    useEffect(() => {
        if (loaded) setBlockingAnimation(false);
    }, [loaded]);

    return (
        <section>
            <BackButton />

            <GameEndModal
                visible={runningState !== RunningState.PLAYING}
                isWin={runningState === RunningState.WON}
                guessGrid={guessStates}
                level={currentLevel}
                gameMode={GameMode.LEVEL}
                onNextLevel={() => {
                    resetGame();
                }}
            />

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
                signature={signature}
                setSignature={setSignature}
                guessStates={guessStates}
                setGuessStates={setGuessStates}
                showRow={showRow}
                setShowRow={setShowRow}
                runningState={runningState}
                setGamesWon={setWonLevels}
                setGamesLost={setLostLevels}
                setCurrentLevel={setCurrentLevel}
                setRunningState={setRunningState}
            />

            <Keyboard setVirtualKeys={setVirtualKeys} usedKeys={usedKeys} />
        </section>
    );
}

export default LevelGame;
