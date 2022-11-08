import { saveGameState } from "../utilities/localStorage";
import { Business } from "./business";

export class Game  {

    private currentLevel: number;
    private playerLevelState: PlayerLevelState;
    private playerBusiness: BusinessState;
    private store: StoreState;
    private gameState: GameState;
    private clock: ClockState;
    private settings: GameSettings;

    constructor(gameState: GameState) {
        this.currentLevel = gameState.currentLevel;
        this.playerLevelState = gameState.playerLevelState;
        this.playerBusiness = gameState.playerBusiness;
        this.store = gameState.store;
        this.gameState = gameState;
        this.settings = gameState.settings;
        this.clock = gameState.clock;
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
        const newPlayerBusiness = playerBusiness.getPlayerBusinessState();
        this.playerBusiness = newPlayerBusiness;
        return this.updateGameState();
    }

    public getIsNewGame(): boolean {
        return this.playerBusiness.name === null;
    }

    public savePlayerLevelState(playerLevelState: PlayerLevelState): GameState {
        this.playerLevelState = playerLevelState;
        return this.updateGameState();
    }

    public saveStore(store: StoreState): GameState {
        this.store = store;
        return this.updateGameState();
    }

    public getSettings(): GameSettings {
        return this.settings;
    }

    public saveSettings(settings: GameSettings): GameState {
        this.settings = settings;
        return this.updateGameState();
    }

    public getClock(): ClockState {
        return this.clock;
    }

    public saveClock(clock: ClockState): GameState {
        this.clock = clock;
        return this.updateGameState();
    }

    private updateGameState(): GameState {
        this.gameState.currentLevel = this.currentLevel;
        this.gameState.playerLevelState = this.playerLevelState;
        this.gameState.playerBusiness = this.playerBusiness;
        this.gameState.store = this.store;
        this.gameState.settings = this.settings;
        this.gameState.clock = this.clock;
        saveGameState(this.gameState);
        return this.gameState;
    }

}