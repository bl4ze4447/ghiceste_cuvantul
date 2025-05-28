'use client'

import './styles/Keyboard.css';
import { getLetterClass }       from "../utils/words_manip";

import { 
    memo, 
    useCallback 
} from "react";
import { AiOutlineEnter }       from "react-icons/ai";
import { IoBackspaceOutline }   from "react-icons/io5";
import { GuessStatus } from '@/constants/constants';

const rowOneKeys    = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'];
const rowTwoKeys    = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'];
const rowThreeKeys  = ['Enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'Backspace'];

interface KeyboardProps {
  setVirtualKeys: React.Dispatch<React.SetStateAction<string[]>>;
  usedKeys: GuessStatus[];
}

const Keyboard: React.FC<KeyboardProps> = ({setVirtualKeys, usedKeys}) => {
    const handleKeyClick = useCallback((key: string) => {
        setVirtualKeys((keys) => [...keys, key]);
    }, [setVirtualKeys]);

    return (
        <section className="keyboard-grid">
            <div className="key-row row-1">
                {rowOneKeys.map((key, i) => (
                    <div key={i} className={`key-box ${getLetterClass(usedKeys[i], true)}`} onClick={() => handleKeyClick(key)}>
                        <p className="key-letter">{key}</p>
                    </div>
                ))}
            </div>
            <div className="key-row row-2">
                <div></div>
                {rowTwoKeys.map((key, i) => (
                    <div key={i+rowOneKeys.length} className={`key-box ${getLetterClass(usedKeys[i+rowOneKeys.length], true)}`} onClick={() => handleKeyClick(key)}>
                        {key.length === 1 && <p className="key-letter">{key}</p>}                    
                    </div>
                ))}
            </div>
            <div className="key-row row-3">
                {rowThreeKeys.map((key, i) => (
                    <div key={i+rowOneKeys.length+rowTwoKeys.length} className={`key-box ${getLetterClass(usedKeys[i+rowOneKeys.length+rowTwoKeys.length], true)}`} onClick={() => handleKeyClick(key)}>
                        {key === 'Enter' && <AiOutlineEnter className="react-icon longer" />}
                        {key === 'Backspace' && <IoBackspaceOutline className="react-icon longer" />}
                        {key.length === 1 && <p className="key-letter">{key}</p>}
                    </div>
                ))}
            </div>
        </section>
    )
}

export default memo(Keyboard);