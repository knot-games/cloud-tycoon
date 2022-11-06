interface IClock {
    getYear(): number;
    getMonth(): number;
    getWeek(): number;
    getDay(): number;
    setYear(year: number): void;
    setMonth(month: number): void;
    setWeek(week: number): void;
    setDay(day: number): void;
    updateDate(): void;
    getDateString(): string;
}