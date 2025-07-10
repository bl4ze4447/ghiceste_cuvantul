'use client';

import '../styles/DailyGame.css';

import { GameMode, GuessState, RunningState } from '@/constants/constants';

import Keyboard from '@/components/Keyboard';
import LevelBar from '@/components/game/LevelBar';
import GameGrid from '@/components/game/GameGrid';

import { useState, useCallback, useEffect } from 'react';

import { usePersistentStats } from '@/hooks/usePersistentStats';
import BackButton from '@/components/BackButton';
import GameEndModal from '@/components/game/GameEndModal';

function DailyGame() {
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
        signature,
        setSignature,
        guessStates,
        setGuessStates,
        lostDaily,
        setLostDaily,
        wonDaily,
        setWonDaily,
        currentRow,
        setCurrentRow,
        words,
        setWords,
        showRow,
        setShowRow,
        runningState,
        setRunningState,
    } = usePersistentStats(GameMode.DAILY);

    useEffect(() => {
        if (loaded) setBlockingAnimation(false);
    }, [loaded]);

    return (
        <section>
            <BackButton />
            <LevelBar
                won={wonDaily}
                lost={lostDaily}
                centerText={<p className="daily-word-message">Cuvântul zilei</p>}
            />

            <GameEndModal
                visible={runningState !== RunningState.PLAYING}
                isWin={runningState === RunningState.WON}
                guessGrid={guessStates}
                level={null}
                gameMode={GameMode.DAILY}
                onNextLevel={() => {}}
            />

            <GameGrid
                gameMode={GameMode.DAILY}
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
                setGamesWon={setWonDaily}
                setGamesLost={setLostDaily}
                setRunningState={setRunningState}
                setCurrentLevel={() => {}}
            />

            <Keyboard setVirtualKeys={setVirtualKeys} usedKeys={usedKeys} />
        </section>
    );
}

export default DailyGame;
