import { newGameState } from '../config/newGame';

const GAME_STATE_TOKEN = 'ct_game_state';

export const hasSaveGame = () => {
  const localStorage = window.localStorage;
  return localStorage.getItem(GAME_STATE_TOKEN) !== null;
}

export const saveGameState = (gameState: GameState) => {
  console.log("Saving game state!");
  console.log({gameState});
  const localStorage = window.localStorage;
  localStorage.setItem(GAME_STATE_TOKEN, JSON.stringify(gameState));
  console.log("Game state saved!");
  console.log(getGameState());
  
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
