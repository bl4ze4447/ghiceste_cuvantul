import { GuessState, Settings } from '../constants/constants';

const rowOneKeys = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'];
const rowTwoKeys = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'];
const rowThreeKeys = ['!', 'z', 'x', 'c', 'v', 'b', 'n', 'm', '!'];
const keyMap = [...rowOneKeys, ...rowTwoKeys, ...rowThreeKeys];

export function getKeyPos(key: string) {
    return keyMap.indexOf(key);
}

export function getGuessStates(word: string, secret: string) {
    word = word.toUpperCase();

    let guessStatuses = Array(Settings.MAX_LETTERS).fill(GuessState.GRAY);
    let secretArr: string[] = [...secret.toUpperCase()];

    // Mark all of the correct ones with green and replace them with an impossible character '!'
    // We replace instead of removing because the index used to access both guessStatuses
    // and secretArr would not match after
    word.split('').forEach((ch, idx) => {
        if (ch === secretArr[idx]) {
            guessStatuses[idx] = GuessState.GREEN;
            secretArr[idx] = '!';
        }
    });

    // Now mark all of remaining partially-correct ones with orange
    word.split('').forEach((ch, idx) => {
        const pos = secretArr.indexOf(ch);
        if (pos !== -1 && guessStatuses[idx] !== GuessState.GREEN) {
            guessStatuses[idx] = GuessState.YELLOW;
            secretArr[pos] = '!';
        }
    });

    return guessStatuses;
}

export function getLetterClass(state: GuessState, isKeyboard: boolean) {
    switch (state) {
        case GuessState.GREEN:
            return `guessed-letter${isKeyboard === true ? '-key ' : ''}`;
        case GuessState.YELLOW:
            return `half-letter${isKeyboard === true ? '-key ' : ''}`;
        case GuessState.GRAY:
            return `wrong-letter${isKeyboard === true ? '-key ' : ''}`;
        default:
            return `empty-letter${isKeyboard === true ? '-key ' : ''}`;
    }
}
