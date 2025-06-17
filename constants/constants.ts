export enum RunningState {
    WON,
    LOST,
    PLAYING
};
  
export enum GuessState {
    EMPTY,
    GRAY,
    YELLOW,
    GREEN
};
  
export enum Settings {
    MAX_LETTERS = 5,
    MAX_ROWS = 6,
};

export enum AccountLoad {
    LOADING,
    LOGGED,
    NOT_LOGGED
}

export enum ModalAnswer {
    NO,
    YES
};

export enum GameMode {
    LEVEL,
    DAILY
}

// Milliseconds
export const TimesCSS = {
    LETTER_FLIP_DELAY: 300, // Found in LetterBox.js
    LETTER_FLIP_TRANSITION: 500, // Found in LetterBox.css
    LETTER_BOUNCE: 300, // Found in LetterBox.css and js
    ROW_BAD_ANIMATION: 555 // Found in GameRow.js and css
};