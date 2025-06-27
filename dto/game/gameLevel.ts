import { RunningState } from '@/constants/constants';

export interface GameLevelDto {
    currentLevel: number;
    wonLevels: number;
    lostLevels: number;
    words: string[];
    currentRow: number;
    rowsDisplayed: boolean[];
    runningState: RunningState;
    test: string;
}
