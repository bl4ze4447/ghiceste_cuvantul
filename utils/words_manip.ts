import dayjs                        from 'dayjs';
import utc                          from 'dayjs/plugin/utc';
import timezone                     from 'dayjs/plugin/timezone';

import { SECRET_WORDS }             from '../constants/wordlist';
import { cyrb53 }                   from './utils';
import { Settings, GuessStatus }    from '../constants/constants';

dayjs.extend(utc);
dayjs.extend(timezone);

export function getWordOffsetedBy(days: number) {
    // Get the current day offseted by the days parameter
    const now               = dayjs().tz("Europe/Bucharest").subtract(days, 'day'); 
    const localMidnight     = now.startOf('day'); 
    const daysSinceEpoch    = Math.floor(localMidnight.valueOf() / 86400000);

    // Hash the days for a 'randomized' index
    const rand              = cyrb53(daysSinceEpoch.toString());
    return SECRET_WORDS[rand % SECRET_WORDS.length];
}

export function getDailyWord() { 
    return getWordOffsetedBy(0); 
}

export function getWordByLevel(level: number) {
    return SECRET_WORDS[(level-1) % SECRET_WORDS.length];
}

export function getGuessStatuses(word: string, secret: string) {
    word = word.toUpperCase();

    let guessStatuses       = Array(Settings.MAX_LETTERS).fill(GuessStatus.GRAY);
    let secretArr: string[] = [...secret.toUpperCase()];

    // Mark all of the correct ones with green and replace them with an impossible character '!'
    // We replace instead of removing because the index used to access both guessStatuses
    // and secretArr would not match after
    word.split('').forEach((ch, idx) => {
        if (ch === secretArr[idx]) {
            guessStatuses[idx]  = GuessStatus.GREEN;
            secretArr[idx]      = '!';
        }
    });

    // Now mark all of remaining partially-correct ones with orange
    word.split('').forEach((ch, idx) => {
        const pos = secretArr.indexOf(ch);
        if (pos !== -1 && guessStatuses[idx] !== GuessStatus.GREEN) {
            guessStatuses[idx]  = GuessStatus.YELLOW;
            secretArr[pos]      = '!';
        }
    });

    return guessStatuses;
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
        case GuessStatus.GREEN:     return `guessed-letter${isKeyboard === true ? '-key ' : ''}`;
        case GuessStatus.YELLOW:    return `half-letter${isKeyboard === true ? '-key ' : ''}`;
        case GuessStatus.GRAY:      return `wrong-letter${isKeyboard  === true ? '-key ' : ''}`;
        default:                    return `empty-letter${isKeyboard === true ? '-key ' : ''}`;
    }
}