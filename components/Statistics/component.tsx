import './style.css';

import { StatisticsDto } from '@/dto/statistics';
import Card from '../Card/component';
import React from 'react';

function generateAccountCard(
    title: string,
    keyValues: Record<string, string | number | { value: string | number; className: string }>
): React.JSX.Element {
    return (
        <Card>
            <h4 className="card-account-title">{title}</h4>
            {Object.entries(keyValues).map(([key, value]) => (
                <div key={key} className="card-account-container">
                    <p className="card-account-key">{key}:</p>
                    <p
                        className={`card-account-value ${
                            typeof value === 'object' ? value.className : ''
                        }`}
                    >
                        {formatValue(value)}
                    </p>
                </div>
            ))}
        </Card>
    );
}

function formatValue(
    value: string | number | { value: string | number; className: string }
): string {
    if (typeof value === 'object') return value.value.toString();
    return value.toString();
}

interface StatisticsProps {
    statistics: StatisticsDto;
}

const Statistics: React.FC<StatisticsProps> = ({ statistics }) => {
    return (
        <section>
            <div className="statistics-container">
                <h1 className="statistics-title">Contul meu</h1>
                <div className="statistics-cards-container">
                    {generateAccountCard('Informații utilizator', {
                        Poreclă: statistics.username,
                        Email: statistics.emailAddress,
                        Verificat: {
                            value: statistics.verified ? 'Da' : 'Nu',
                            className: statistics.verified ? 'statistics-good' : 'statistics-bad',
                        },
                        Restricționat: {
                            value: statistics.banned ? 'Da' : 'Nu',
                            className: statistics.banned ? 'statistics-bad' : 'statistics-good',
                        },
                        'Total jocuri': statistics.totalGames,
                    })}

                    {generateAccountCard('Statistici niveluri', {
                        'Niveluri jucate': statistics.levelLoses + statistics.levelWins,
                        'Niveluri câștigate': statistics.levelWins,
                        'Niveluri pierdute': statistics.levelLoses,
                        'Victorii consecutive': statistics.levelStreak,
                        'Record victorii consecutive': statistics.levelMaxStreak,
                    })}

                    {generateAccountCard('Statistici cuvântul zilei', {
                        'Jocuri jucate': statistics.dailyLoses + statistics.dailyLoses,
                        'Jocuri câștigate': statistics.dailyWins,
                        'Jocuri pierdute': statistics.dailyLoses,
                        'Victorii consecutive': statistics.dailyStreak,
                        'Record victorii consecutive': statistics.dailyMaxStreak,
                    })}
                </div>
            </div>
        </section>
    );
};

export default Statistics;
