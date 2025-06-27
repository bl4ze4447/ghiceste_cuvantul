'use client';

import { useState } from 'react';
import Card from '@/components/Card';
import GameRow from '@/components/game/GameRow';
import './htp.css';
import { Settings } from '@/constants/constants';

function HowToPlay() {
    const secret = 'CXAXX';
    const exampleMixed = 'CARTE';
    const exampleCorrect = 'CURTE';

    const [reveal, setReveal] = useState(true);
    const [key, setKey] = useState(0);

    const handlePlay = () => {
        setReveal(false);
        setKey((prev) => prev + 1);
        setTimeout(() => setReveal(true), 50);
    };

    return (
        <div className="how-to-play-container">
            <h2 className="how-to-play-title">Cum se joacă</h2>

            <div className="how-to-play-content">
                <Card>
                    <p className="exo lh1-5">
                        Ghicește cuvântul în maximum <b>{Settings.MAX_ROWS}</b> încercări.
                    </p>
                    <p className="exo">
                        După fiecare încercare, literele se colorează pentru a-ți arăta cât de
                        aproape ai fost:
                    </p>

                    <div className="example-section">
                        <GameRow
                            key={key} // forțează rerender complet
                            word={exampleMixed}
                            secretWord={secret}
                            isCurrentRow={false}
                            isLastRow={false}
                            beforeCurrentRow={true}
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
                            <p className="exo">
                                <b style={{ color: '#2ea200' }}>Verde</b> — litera există și e pe
                                poziția corectă.
                            </p>
                            <p className="exo">
                                <b style={{ color: '#e6b800' }}>Galben</b> — litera există, dar e pe
                                poziția greșită.
                            </p>
                            <p className="exo">
                                <b style={{ color: '#5c7680' }}>Gri</b> — litera nu există în
                                cuvânt.
                            </p>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}

export default HowToPlay;
