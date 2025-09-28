import './style.css';

import romanianFlag from '@/public/romanian_flag.png';
import Image from 'next/image';

const Header = () => {
    return (
        <header className="header-container">
            <Image
                src={romanianFlag}
                width={60}
                height={60}
                className="header-ro-flag"
                alt="Steagul României"
            />
            <section>
                <h1 className="header-title-top">Ghicește</h1>
                <h1 className="header-title-bottom">
                    <span className="header-text-blue">cuv</span>
                    <span className="header-text-yellow">ân</span>
                    <span className="header-text-red">tul</span>
                </h1>
            </section>
        </header>
    );
};

export default Header;
