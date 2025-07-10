'use client';

import Link from 'next/link';

interface TermsCheckboxProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
}

const TermsCheckbox: React.FC<TermsCheckboxProps> = ({ checked, onChange }) => {
    const containerStyle: React.CSSProperties = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'Exo 2', sans-serif",
        fontSize: '0.9rem',
        color: '#fff',
        gap: '0.5rem',
        marginBottom: '10px',
        marginTop: '10px',
        maxWidth: '290px',
    };

    const checkboxStyle: React.CSSProperties = {
        width: '18px',
        height: '18px',
        border: '2px solid #ccc',
        borderRadius: '4px',
        backgroundColor: checked ? '#1a4a5a' : 'transparent',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        userSelect: 'none',
        marginTop: '-2.5px',
        transition: 'background-color 0.2s ease',
    };

    const checkmarkStyle: React.CSSProperties = {
        color: '#fff',
        visibility: checked ? 'visible' : 'hidden',
    };

    const linkStyle: React.CSSProperties = {
        color: '#93c5fd',
        textDecoration: 'underline',
        display: 'inline-block',
    };

    return (
        <label style={containerStyle}>
            <div
                style={checkboxStyle}
                onClick={() => onChange(!checked)}
                role="checkbox"
                aria-checked={checked}
                tabIndex={0}
            >
                <span style={checkmarkStyle}>✓</span>
            </div>
            <div className="exo">
                Sunt de acord cu{' '}
                <Link href="/termeni-si-conditii" style={linkStyle}>
                    termenii și condițiile
                </Link>{' '}
                și cu{' '}
                <Link href="/politica-de-confidentialitate" style={linkStyle}>
                    politica de confidențialitate
                </Link>
            </div>
        </label>
    );
};

export default TermsCheckbox;
