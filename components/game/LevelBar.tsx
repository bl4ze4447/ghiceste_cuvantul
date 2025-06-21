import { ReactNode } from 'react';
import './LevelBar.css';

import { 
  FaCircleXmark, 
  FaCircleCheck 
} from "react-icons/fa6";

interface LevelBarProps {
  centerText: ReactNode;
  won: number;
  lost: number,
}

const LevelBar: React.FC<LevelBarProps> = ({ 
  centerText, 
  won, 
  lost 
}) => {
    return (
      <div className='container' style={{marginTop: '30px'}}>
        <div className='level-div'>
          <div className='icon-text'>
            <p>{lost}</p>
            <FaCircleXmark className='wrong-ico' />
          </div>
          <div className='center-text'>{centerText}</div>
          <div className='icon-text'>
            <FaCircleCheck className='check-ico' />
            <p>{won}</p>  
          </div>
        </div>
      </div>
    )
}

export default LevelBar;