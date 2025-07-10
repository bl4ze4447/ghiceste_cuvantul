'use client';

import './styles/BackButton.css';
import Link from 'next/link';

const BackButton = () => {
    return (
        <div className="button-container">
            <Link
                style={{
                    marginTop: '25px',
                    marginLeft: '10px',
                    marginBottom: '25px',
                    fontFamily: 'Bungee, Bungee Fallback',
                }}
                type="button"
                className="connect-button-back"
                href="/"
            >
                Înapoi la meniul principal
            </Link>
        </div>
    );
};

export default BackButton;
