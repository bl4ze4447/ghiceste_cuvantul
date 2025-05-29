import './styles/MainMenu.css';

import Header   from '../components/Header';
import Footer   from '../components/Footer';
import Link     from 'next/link';

function MainMenu() {
    return (
        <section className='main-menu'>
            <Header />
            <div className='menu-content'>
                <div className='center-buttons'>
                    <Link href="/nivele" className="game-button">Joacă nivele</Link>
                    <Link href="/cuvantul-zilei" className="game-button">Cuvântul zilei</Link>
                    <Link href="/contul-meu" className="game-button">Contul meu</Link>
                    <Link href="/cum-sa-joci" className="game-button">Cum se joacă</Link>
                </div>
            </div>
            <Footer />
        </section>
    );
}

export default MainMenu;