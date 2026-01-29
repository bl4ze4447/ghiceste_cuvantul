'use client';

import './style.css';

import Keyboard from '@/components/Keyboard/component';
import StatusBar from '@/components/game/StatusBar/component';
import GameGrid from '@/components/game/GameGrid/component';
import { usePersistentStats } from '@/hooks/usePersistentStats';
import { GameMode, GuessState, RunningState, Settings } from '@/constants/constants';

import { useState, useCallback, useEffect, useRef } from 'react';
import BackButton from '@/components/BackButton/component';
import GameEndModal from '@/components/game/GameEndModal/component';
import Link from 'next/link';

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
        isServerDown,
        backendResult,
        backendMessage,
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

    const getOnlineStatusElement = () => {
        if (backendResult === null) {
            return <span className="skeleton-status"></span>;
        }

        if (backendResult === true) {
            return (
                <Link href="cont" className="game-link">
                    Contul meu
                </Link>
            );
        }

        return (
            <Link href="cont/login" className="game-link">
                Intră în cont
            </Link>
        );
    };

    // for safari
    const audioCtx = useRef<AudioContext | null>(null);

    useEffect(() => {
        if (!audioCtx.current) {
            const AudioContextClass = window.AudioContext;
            audioCtx.current = new AudioContextClass();
        }

        return () => {
            if (audioCtx.current) {
                audioCtx.current.close();
            }
        };
    }, []);
    const getOnlineDotColor = () => {
        if (backendResult === null) {
            return 'game-dot-gray';
        }

        if (backendResult === true) {
            return 'game-dot-green';
        }

        return 'game-dot-red';
    };

    return (
        <section>
            <div className="game-account-status">
                <BackButton />
                <div className="game-account-status-line">
                    <span className={`game-dot-status ${getOnlineDotColor()}`}></span>
                    {getOnlineStatusElement()}
                </div>
            </div>

            {isServerDown === true && loaded ? (
                <p className="working-on-game-p">
                    Ne pare rău dar jocul este momentan în mentenanță. Reveniți mai târziu!
                </p>
            ) : (
                <>
                    <GameEndModal
                        visible={runningState !== RunningState.PLAYING}
                        isWin={runningState === RunningState.WON}
                        guessGrid={guessStates}
                        level={currentLevel}
                        gameMode={GameMode.LEVEL}
                        onNextLevel={() => {
                            resetGame();
                        }}
                        local={false}
                    />

                    <StatusBar
                        centerText={
                            <p>
                                Nivelul{' '}
                                <span
                                    style={{ fontFamily: 'var(--font-exo2)', fontSize: '1.2rem' }}
                                >
                                    {currentLevel}
                                </span>
                            </p>
                        }
                        won={wonLevels}
                        lost={lostLevels}
                    />

                    <GameGrid
                        loaded={loaded}
                        backendResult={backendResult}
                        backendMessage={backendMessage}
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
                </>
            )}

            <Keyboard setVirtualKeys={setVirtualKeys} usedKeys={usedKeys} />
        </section>
    );
}

export default LevelGame;
