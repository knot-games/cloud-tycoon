import { Business } from '../objects/business';
import { Clock } from '../objects/clock';
import { Game } from '../objects/game';
import { getGameState } from '../utilities/localStorage';

export class GameStatePlugin extends Phaser.Plugins.BasePlugin {

  public currentLevel: number = 0;
  public GameState: Game;
  public PlayerBusiness: Business;
  public Clock: Clock;

  constructor(pluginManager: Phaser.Plugins.PluginManager) {
    super(pluginManager);

    this.GameState = new Game(getGameState());
    this.PlayerBusiness = new Business();
    this.Clock = new Clock();
  }

  public hasSaveGame(): boolean {
    const localStorage = window.localStorage;
    return localStorage.getItem('ct_game_state') !== null;
  }

  public getCurrentLevel(): number {
    return this.GameState.getCurrentLevel();
  }

  // SETTINGS

  public getSettings(): GameSettings {
    return this.GameState.getSettings();
  }

  public getMusicEnabled(): boolean {
    return this.getSettings().music;
  }

  public getSoundEffectsEnabled(): boolean {
    return this.getSettings().soundEffects;
  }

  public getSettingText(setting: string): string {
    switch (setting) {
        case "music":
            return "Play music";
        case "soundEffects":
            return "Play sound effects";
        default:
            return "";
    }
  }

  public toggleMusic(): void {
    const settings = this.getSettings();
    settings.music = !settings.music;
    this.updateSettings(settings);
  }

  public toggleSoundEffects(): void {
    const settings = this.getSettings();
    settings.soundEffects = !settings.soundEffects;
    this.updateSettings(settings);
  }

  public updateSettings(settings: GameSettings): void {
    this.GameState = new Game(this.GameState.saveSettings(settings));
  }
}
