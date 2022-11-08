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
