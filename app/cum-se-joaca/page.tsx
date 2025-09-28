'use client';

import { useEffect, useRef, useState } from 'react';
import Card from '@/components/Card/component';
import GameRow from '@/components/game/GameRow/component';
import './htp.css';
import { GuessState, Settings } from '@/constants/constants';
import LevelBar from '@/components/game/StatusBar/component';
import { FaCircleCheck, FaCircleXmark } from 'react-icons/fa6';
import BackButton from '@/components/BackButton/component';

function HowToPlay() {
    const timeouts = useRef<NodeJS.Timeout[]>([]);

    useEffect(() => {
        return () => {
            timeouts.current.forEach(clearTimeout);
            timeouts.current = [];
        };
    }, []);
    const exampleMixed = 'CARTE';

    const [reveal, setReveal] = useState(true);
    const [guessStates] = useState([
        GuessState.GREEN,
        GuessState.YELLOW,
        GuessState.GRAY,
        GuessState.GRAY,
        GuessState.GRAY,
    ]);
    const [key, setKey] = useState(0);

    const handlePlay = () => {
        setReveal(false);
        setKey((prev) => prev + 1);
        timeouts.current.push(setTimeout(() => setReveal(true), 50));
    };

    return (
        <>
            <BackButton />
            <main className="how-to-play-container">
                <h1 className="how-to-play-title">Cum se joacă</h1>

                <section className="how-to-play-content">
                    <Card>
                        <p className="lh1-5 justify">
                            Ghicește cuvântul în maximum <b>{Settings.MAX_ROWS}</b> încercări.
                        </p>
                        <p className="justify">
                            După fiecare încercare, literele se colorează pentru a-ți arăta cât de
                            aproape ai fost:
                        </p>

                        <section className="example-section">
                            <GameRow
                                key={key}
                                word={exampleMixed}
                                guessStates={guessStates}
                                isCurrentRow={false}
                                isLastRow={false}
                                beforeCurrentRow={false}
                                shouldBounce={false}
                                reveal={reveal}
                                setUsedKeys={() => {}}
                                setRunningState={() => {}}
                                disableBlockingAnimation={() => {}}
                                disableBounceAnimation={() => {}}
                            />
                            <div className="button-row">
                                <button className="htp-button" onClick={handlePlay}>
                                    Redă exemplul
                                </button>
                            </div>

                            <div>
                                <p>
                                    <b className="htp-green">Verde</b> — litera există și se află pe
                                    poziția corectă.
                                </p>
                                <p>
                                    <b className="htp-yellow">Galben</b> — litera există, dar se
                                    află pe poziția greșită.
                                </p>
                                <p>
                                    <b className="htp-gray">Gri</b> — litera nu există în cuvânt.
                                </p>
                                <p className="justify progress-text-htp">
                                    Pe parcursul jocului, progresul tău va fi afișat deasupra
                                    tabelului de joc astfel:
                                </p>
                                <LevelBar centerText="Modul de joc" won={12} lost={6} />
                                <section className="section-htp-game">
                                    <p>
                                        <b className="htp-game-mode">Modul de joc</b> poate fi:
                                    </p>
                                    <p className="htp-game-example">
                                        — <i className="htp-game-mode">Cuvântul Zilei</i>, un singur
                                        cuvânt nou în fiecare zi.
                                    </p>
                                    <p className="htp-game-example">
                                        — <i className="htp-game-mode">Nivelul X</i>, unde{' '}
                                        <i style={{ marginRight: '6px' }}>X</i>
                                        este nivelul la care ai ajuns.
                                    </p>
                                    <div
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: '8px',
                                            marginTop: '12px',
                                        }}
                                    >
                                        <div
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                textAlign: 'center',
                                            }}
                                        >
                                            <FaCircleCheck
                                                className="check-ico"
                                                style={{ margin: '0' }}
                                            />
                                            <p className="exo-htp" style={{ marginLeft: '5px' }}>
                                                — numărul de cuvinte ghicite.
                                            </p>
                                        </div>
                                        <div
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                textAlign: 'center',
                                            }}
                                        >
                                            <FaCircleXmark
                                                className="wrong-ico"
                                                style={{ margin: '0' }}
                                            />
                                            <p className="exo-htp" style={{ marginLeft: '5px' }}>
                                                — numărul de cuvinte greșite.
                                            </p>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </section>
                    </Card>
                </section>
            </main>
        </>
    );
}

export default HowToPlay;
