import { Business } from "../objects/business";
import { Settings } from "../objects/settings";

export interface IGame {
    getCurrentLevel(): number;
    saveCurrentLevel(currentLevel: number): GameState;
    getPlayerBusiness(): BusinessState;
    savePlayerBusiness(playerBusiness: Business): GameState;
    savePlayerLevelState(playerLevelState: PlayerLevelState): GameState;
    saveStore(store: StoreState): GameState;
    saveSettings(settings: Settings): GameState;
}