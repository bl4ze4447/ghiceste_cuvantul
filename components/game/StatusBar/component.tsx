import { ReactNode } from 'react';
import './style.css';

import { FaCircleXmark, FaCircleCheck } from 'react-icons/fa6';

interface StatusBarProps {
    centerText: ReactNode;
    won: number;
    lost: number;
}

const StatusBar: React.FC<StatusBarProps> = ({ centerText, won, lost }) => {
    return (
        <div className="container">
            <div className="level-div">
                <div className="icon-text">
                    <p>{lost}</p>
                    <FaCircleXmark className="wrong-ico" />
                </div>
                <div className="center-text">{centerText}</div>
                <div className="icon-text">
                    <FaCircleCheck className="check-ico" />
                    <p>{won}</p>
                </div>
            </div>
        </div>
    );
};

export default StatusBar;
