import { GuessState, RunningState } from '@/constants/constants';

export interface GameDailyDto {
    words: string[];
    runningState: RunningState;
    showRow: boolean[];
    guessStates: GuessState[][];
    currentRow: number;
    wonDailies: number;
    lostDailies: number;
    signature: string;
}
