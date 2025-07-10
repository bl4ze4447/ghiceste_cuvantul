import { GuessState, RunningState } from '@/constants/constants';

export interface GameLevelDto {
    words: string[];
    runningState: RunningState;
    showRow: boolean[];
    guessStates: GuessState[][];
    currentRow: number;
    level: number;
    wonLevels: number;
    lostLevels: number;
    signature: string;
}
