import { FaHome } from 'react-icons/fa';
import './style.css';
import Link from 'next/link';

const BackButton = () => {
    return (
        <section className="button-container">
            <Link type="button" className="connect-button-back" href="/">
                <p
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        justifyItems: 'center',
                        alignItems: 'center',
                    }}
                >
                    <FaHome
                        style={{
                            marginRight: '5px',
                        }}
                    />
                    Meniu principal
                </p>
            </Link>
        </section>
    );
};

export default BackButton;
