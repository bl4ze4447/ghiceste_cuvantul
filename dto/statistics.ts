export interface StatisticsDto {
    username: string;
    emailAddress: string;
    verified: boolean;
    banned: boolean;
    totalGames: number;
    dailyWins: number;
    dailyLoses: number;
    dailyStreak: number;
    dailyMaxStreak: number;
    levelWins: number;
    levelLoses: number;
    levelStreak: number;
    levelMaxStreak: number;
}
