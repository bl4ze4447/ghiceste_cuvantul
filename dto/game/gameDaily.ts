import { RunningState } from '@/constants/constants';

export interface GameDailyDto {
    wonDaily: number;
    lostDaily: number;
    words: string[];
    currentRow: number;
    rowsDisplayed: boolean[];
    runningState: RunningState;
}
