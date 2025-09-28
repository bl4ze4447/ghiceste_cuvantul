import './style.css';
import React from 'react';

interface CardProps {
    children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ children }) => {
    return (
        <section role="region" className="card">
            {children}
        </section>
    );
};

export default Card;
