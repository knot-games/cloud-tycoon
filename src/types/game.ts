import { Business } from "../objects/business";

export interface IGame {
    getCurrentLevel(): number;
    saveCurrentLevel(currentLevel: number): GameState;
    getPlayerBusiness(): BusinessState;
    savePlayerBusiness(playerBusiness: Business): GameState;
    savePlayerLevelState(playerLevelState: PlayerLevelState): GameState;
    saveStore(store: StoreState): GameState;
}