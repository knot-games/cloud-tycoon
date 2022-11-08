// list of gameplay events that can be emitted

export enum UIEvents {
  UI_UPDATE_CASH = 'ui.update.cash',
  UI_UPDATE_COSTS = 'ui.update.costs',
  UI_UPDATE_SOUND = 'ui.update.sound',
}

export enum GameplayBusinessEvents {
  BUSINESS_UPDATE_CASH = 'gameplay.business.update.cash',
  BUSINESS_UPDATE_COSTS = 'gameplay.business.update.costs',
  BUSINESS_ADD_CUSTOMER = 'gameplay.business.add.customer',
  BUSINESS_REMOVE_CUSTOMER = 'gameplay.business.remove.customer',
  BUSINESS_ADD_SERVER = 'gameplay.business.add.server',
  BUSINESS_REMOVE_SERVER = 'gameplay.business.remove.server',
}

export enum ClockEvents {
  CLOCK_UPDATE_DATE = 'clock.update.date',
  CLOCK_MONTH_END = 'clock.month.end',
  CLOCK_YEAR_END = 'clock.year.end',
  CLOCK_WEEK_END = 'clock.week.end',
  CLOCK_DAY_END = 'clock.day.end',
}

export enum SettingsEvents {
  TOGGLE_MUSIC = 'settings.toggle.music',
  TOGGLE_SOUND_EFFECTS = 'settings.toggle.sound.effects',
}

export enum GamplayRandomEvents {
  RANDOM_EVENT = 'gameplay.random.event',
}

const eventCenter = new Phaser.Events.EventEmitter();

export default eventCenter;
