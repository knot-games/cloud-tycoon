import eventCenter, { ClockEvents } from '../events/eventCenter';

export class Clock {
  private year: number;
  private month: number;
  private week: number;
  private day: number;
  private isPaused: boolean;

  constructor(year = 0, month = 0, week = 0, day = 0, isPaused = false) {
    this.year = year;
    this.month = month;
    this.week = week;
    this.day = day;
    this.isPaused = isPaused;
  }

  public getYear(): number {
    return this.year;
  }

  public getMonth(): number {
    return this.month;
  }

  public getWeek(): number {
    return this.week;
  }

  public getDay(): number {
    return this.day;
  }

  public setYear(year: number): void {
    this.year = year;
  }

  public setMonth(month: number, date?: number): void {
    this.month = month;
  }

  public setWeek(week: number): void {
    this.week = week;
  }

  public setDay(day: number): void {
    this.day = day;
  }

  public pauseClock(): void {
    this.isPaused = true;
  }

  public unPauseClock(): void {
    this.isPaused = false;
  }

  public getIsPaused(): boolean {
    return this.isPaused;
  }

  public updateDate(): void {
    if (!this.getIsPaused()) {
      this.day++;
      // 5 Business Days in a week
      if (this.day > 5) {
        this.day = 1;
        this.week++;
        // Jank but honestly good enough for now
        eventCenter.emit(ClockEvents.CLOCK_WEEK_END);
        if (this.week > 4) {
          this.week = 1;
          this.month++;
          if (this.month > 12) {
            this.month = 1;
            this.year++;
          }
        }
      }
    }
  }

  public getDateString(): string {
    return `Y${this.year} M${this.month} W${this.week} D${this.day}`;
  }
}
