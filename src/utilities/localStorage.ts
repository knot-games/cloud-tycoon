import { baseSettings } from '../config/baseSettings';
import { newGameState } from '../config/newGame';

const GAME_STATE_TOKEN = 'ct_game_state';
const SETTINGS_TOKEN = 'ct_settings';

export const saveGameState = (gameState: GameState) => {
  const localStorage = window.localStorage;
  localStorage.setItem(GAME_STATE_TOKEN, JSON.stringify(gameState));
};

export const getGameState = (): GameState => {
  const localStorage = window.localStorage;
  const gameState = localStorage.getItem(GAME_STATE_TOKEN);
  if (gameState) {
    return JSON.parse(gameState);
  }
  const startGameState = newGameState();
  saveGameState(startGameState);
  return startGameState;
};

export const saveSettings = (settings: GameSettings) => {
  const localStorage = window.localStorage;
  localStorage.setItem(SETTINGS_TOKEN, JSON.stringify(settings));
};

export const getSettings = (): GameSettings | null => {
  const localStorage = window.localStorage;
  const settings = localStorage.getItem(SETTINGS_TOKEN);
  if (settings) {
    return JSON.parse(settings);
  }
  return null;
};

export const isMusicOn = (): boolean => {
  let settings = getSettings();
  if (!settings) {
    settings = baseSettings();
    saveSettings(settings);
  }
  return settings.music;
};
