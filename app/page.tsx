'use client';

import './style.css';

import Header from '@/components/Header/component';
import Footer from '@/components/Footer/component';
import Link from 'next/link';

function MainMenu() {
    return (
        <section className="main-menu">
            <Header />
            <div className="menu-content">
                <div className="center-buttons">
                    <Link href="/niveluri" className="game-button-account">
                        <span>Niveluri</span>
                        <span className="gba-bottom">Necesită cont</span>
                    </Link>
                    <Link href="/cuvantul-zilei" className="game-button">
                        Cuvântul zilei
                    </Link>
                    <Link href="/cont" className="game-button-small">
                        Contul meu
                    </Link>
                    <Link href="/cum-se-joaca" className="game-button-small">
                        Cum se joacă
                    </Link>
                </div>
            </div>
            <Footer />
        </section>
    );
}

export default MainMenu;
