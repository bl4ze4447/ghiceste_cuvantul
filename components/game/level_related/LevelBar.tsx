import './LevelBar.css';

import { 
  FaCircleXmark, 
  FaCircleCheck 
} from "react-icons/fa6";

interface LevelBarProps {
  currentLevel: number;
  numOfWrongWords: number;
  numOfRightWords: number,
}

const LevelBar: React.FC<LevelBarProps> = ({ 
  currentLevel, 
  numOfWrongWords, 
  numOfRightWords 
}) => {
    return (
      <div className='container' style={{marginTop: '30px'}}>
        <div className='level-div'>
          <div className='icon-text'>
            <p>{numOfWrongWords}</p>
            <FaCircleXmark className='wrong-ico' />
          </div>
          <p className='center-text'>Nivelul {currentLevel}</p>
          <div className='icon-text'>
            <FaCircleCheck className='check-ico' />
            <p>{numOfRightWords}</p>
          </div>
        </div>
      </div>
    )
}

export default LevelBar;