const GAME_STATE_TOKEN = "ct_game_state";
const SETTINGS_TOKEN = "ct_settings";

export const saveGameState = (gameState: GameState) => {
    const localStorage = window.localStorage;
    localStorage.setItem(GAME_STATE_TOKEN, JSON.stringify(gameState));
}

export const getGameState = (): GameState | null => {
    const localStorage = window.localStorage;
    const gameState = localStorage.getItem(GAME_STATE_TOKEN);
    if (gameState) {
        return JSON.parse(gameState);
    }
    return null;
}

export const saveSettings = (settings: GameSettings) => {
    const localStorage = window.localStorage;
    localStorage.setItem(SETTINGS_TOKEN, JSON.stringify(settings));
}

export const getSettings = (): GameSettings | null => {
    const localStorage = window.localStorage;
    const settings = localStorage.getItem(SETTINGS_TOKEN);
    if (settings) {
        return JSON.parse(settings);
    }
    return null;
}