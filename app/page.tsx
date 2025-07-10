'use client';

import './styles/MainMenu.css';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';

function MainMenu() {
    return (
        <section className="main-menu">
            <Header />
            <div className="menu-content">
                <div className="center-buttons">
                    <Link
                        href="/niveluri"
                        className="game-button-account"
                        style={{ display: 'grid', gridTemplateRows: '1fr 1fr' }}
                    >
                        <span>Joacă niveluri</span>
                        <span className="exo" style={{ opacity: '0.7' }}>
                            Necesită cont
                        </span>
                    </Link>
                    <Link
                        href="/cuvantul-zilei"
                        className="game-button-account"
                        style={{ display: 'grid', gridTemplateRows: '1fr 1fr' }}
                    >
                        <span>Cuvântul zilei</span>
                        <span className="exo" style={{ opacity: '0.7' }}>
                            Necesită cont
                        </span>
                    </Link>
                    <Link href="/cont" className="game-button">
                        Contul meu
                    </Link>
                    <Link href="/demo" className="game-button-small" style={{ marginTop: '5px' }}>
                        Joc Demo
                    </Link>
                    <Link href="/cum-se-joaca" className="game-button-small">
                        Cum se joacă
                    </Link>
                    <div
                        style={{
                            display: 'flex',
                            width: '100%',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Link
                            href="/termeni-si-conditii"
                            className="game-button-small game-button-half"
                        >
                            Termeni și condiții
                        </Link>
                        <Link
                            href="/politica-de-confidentialitate"
                            className="game-button-small game-button-half"
                        >
                            Protecția datelor
                        </Link>
                    </div>
                </div>
            </div>
            <Footer />
        </section>
    );
}

export default MainMenu;
