import { IGame } from "../types/game";
import { saveGameState } from "../utilities/localStorage";
import { Business } from "./business";
import { Settings } from "./settings";

export class Game implements IGame {

    private currentLevel: number;
    private playerLevelState: PlayerLevelState;
    private playerBusiness: BusinessState;
    private store: StoreState;
    private settings: PlayerSettingsState;
    private gameState: GameState;

    constructor(gameState: GameState) {
        this.currentLevel = gameState.currentLevel;
        this.playerLevelState = gameState.playerLevelState;
        this.playerBusiness = gameState.playerBusiness;
        this.store = gameState.store;
        this.settings = gameState.settings;
        this.gameState = gameState;
    }

    public getCurrentLevel(): number {
        return this.currentLevel;
    }

    public saveCurrentLevel(currentLevel: number): GameState {
        this.currentLevel = currentLevel;
        return this.updateGameState();
    }

    public getPlayerBusiness(): BusinessState {
        return this.playerBusiness;
    }

    public savePlayerBusiness(playerBusiness: Business): GameState {
        const newPlayerBusiness = playerBusiness.getPlayerBusiness();
        this.playerBusiness = newPlayerBusiness;
        return this.updateGameState();
    }

    public savePlayerLevelState(playerLevelState: PlayerLevelState): GameState {
        this.playerLevelState = playerLevelState;
        return this.updateGameState();
    }

    public saveStore(store: StoreState): GameState {
        this.store = store;
        return this.updateGameState();
    }

    public saveSettings(settings: Settings): GameState {
        this.settings = settings.getSettingsState();
        return this.updateGameState();
    }

    private updateGameState(): GameState {
        this.gameState.currentLevel = this.currentLevel;
        this.gameState.playerLevelState = this.playerLevelState;
        this.gameState.playerBusiness = this.playerBusiness;
        this.gameState.store = this.store;
        this.gameState.settings = this.settings;
        saveGameState(this.gameState);
        return this.gameState;
    }

}
