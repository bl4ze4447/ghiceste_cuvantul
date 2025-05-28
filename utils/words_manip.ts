import dayjs                        from 'dayjs';
import utc                          from 'dayjs/plugin/utc';
import timezone                     from 'dayjs/plugin/timezone';

import { SECRET_WORDS }             from '../constants/wordlist';
import { cyrb53 }                   from './utils';
import { Settings, GuessStatus }    from '../constants/constants';

dayjs.extend(utc);
dayjs.extend(timezone);

export function getWordOffsetedBy(days: number) {
    const now = dayjs().tz("Europe/Bucharest").subtract(days, 'day'); 
    const localMidnight = now.startOf('day'); 
    
    const daysSinceEpoch = Math.floor(localMidnight.valueOf() / 86400000);
    const rand = cyrb53(daysSinceEpoch.toString());
    return SECRET_WORDS[rand % SECRET_WORDS.length];
}

export function getDailyWord() { 
    return getWordOffsetedBy(0); 
}

export function getWordByLevel(level: number) {
    return SECRET_WORDS[level % SECRET_WORDS.length];
}

export function getGuessStatuses(word: string, secret: string) {
    word = word.toUpperCase();
    let secretArr: string[] = [...secret.toUpperCase()];
    let states = Array(Settings.MAX_LETTERS).fill(GuessStatus.GRAY);

    word.split('').forEach((ch, idx) => {
        if (ch === secretArr[idx]) {
            states[idx] = GuessStatus.GREEN;
            secretArr[idx] = '!';
        }
    });

    word.split('').forEach((ch, idx) => {
        const pos = secretArr.indexOf(ch);
        if (pos !== -1 && states[idx] !== GuessStatus.GREEN) {
            states[idx] = GuessStatus.YELLOW;
            secretArr[pos] = '!';
        }
    });

    return states;
}

const rowOneKeys    = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'];
const rowTwoKeys    = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l',];
const rowThreeKeys  = ['!', 'z', 'x', 'c', 'v', 'b', 'n', 'm', '!'];

const keyMap = [
    ...rowOneKeys,
    ...rowTwoKeys,
    ...rowThreeKeys
];

export function getKeyPos(key: string) {
    return keyMap.indexOf(key);
}

export function getLetterClass(state: GuessStatus, isKeyboard: boolean) {
    switch (state) {
        case GuessStatus.GREEN: return `guessed-letter${isKeyboard === true ? '-key ' : ''}`;
        case GuessStatus.YELLOW: return `half-letter${isKeyboard === true ? '-key ' : ''}`;
        case GuessStatus.GRAY: return `wrong-letter${isKeyboard  === true ? '-key ' : ''}`;
        default: return `empty-letter${isKeyboard === true ? '-key ' : ''}`;
    }
}