'use client';

import './style.css';

import { GameMode, GuessState, RunningState } from '@/constants/constants';

import Keyboard from '@/components/Keyboard/component';
import StatusBar from '@/components/game/StatusBar/component';
import GameGrid from '@/components/game/GameGrid/component';

import { useState, useCallback, useEffect } from 'react';

import { usePersistentStats } from '@/hooks/usePersistentStats';
import BackButton from '@/components/BackButton/component';
import GameEndModal from '@/components/game/GameEndModal/component';
import Link from 'next/link';
import GameGridLocal from '@/components/game/GameGridLocal/component';

function DailyGame() {
    // Used by the on-screen keyboard to send input
    const [virtualKeys, setVirtualKeys] = useState<string[]>([]);

    // Is there any animation playing that should block the game?
    const [blockingAnimation, setBlockingAnimation] = useState(true);

    // What keys were used and what is their GuessStatus? ; 27 -> All keys (25) + BACKSPACE/ENTER
    const [usedKeys, setUsedKeys] = useState(Array(27).fill(GuessState.EMPTY));

    const [loggedIn, setLoggedIn] = useState<boolean | null>(null);

    const consumeFirstKey = useCallback(() => {
        setVirtualKeys((vk) => vk.slice(1));
    }, []);

    const {
        loaded,
        isServerDown,
        backendResult,
        backendMessage,
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

    const getOnlineDotColor = () => {
        if (backendResult === null) {
            return 'game-dot-gray';
        }

        if (backendResult === true) {
            return 'game-dot-green';
        }

        return 'game-dot-red';
    };

    // for safari
    let audioCtx;
    useEffect(() => {
        audioCtx = new AudioContext();
    }, []);

    useEffect(() => {
        if (isServerDown === true) {
            setLoggedIn(null);
            return;
        }

        setLoggedIn(backendResult);
    }, [backendResult, isServerDown]);

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
                    <StatusBar
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
                        local={loggedIn === false}
                    />
                    {loggedIn === false ? (
                        <GameGridLocal
                            virtualKeys={virtualKeys}
                            consumeFirstKey={consumeFirstKey}
                            blockingAnimation={blockingAnimation}
                            setBlockingAnimation={setBlockingAnimation}
                            setUsedKeys={setUsedKeys}
                            currentRow={currentRow}
                            setCurrentRow={setCurrentRow}
                            words={words}
                            setWords={setWords}
                            setGuessStates={setGuessStates}
                            runningState={runningState}
                            setGamesWon={setWonDaily}
                            setGamesLost={setLostDaily}
                            setRunningState={setRunningState}
                            rowsDisplayed={showRow}
                            setRowsDisplayed={setShowRow}
                        />
                    ) : (
                        <GameGrid
                            loaded={loaded}
                            backendResult={backendResult}
                            backendMessage={backendMessage}
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
                    )}
                </>
            )}
            <Keyboard setVirtualKeys={setVirtualKeys} usedKeys={usedKeys} />
        </section>
    );
}

export default DailyGame;
