import { Business } from '../objects/business';
import { Clock } from '../objects/clock';

export class GameStatePlugin extends Phaser.Plugins.BasePlugin {

  public currentLevel: number = 0;
  public PlayerBusiness: Business;
  public Clock: Clock;

  constructor(pluginManager: Phaser.Plugins.PluginManager) {
    super(pluginManager);

    this.PlayerBusiness = new Business();
    this.Clock = new Clock();
  }

  public hasSaveGame(): boolean {
    // TODO - check if there is a save game in local storage
    return false;
  }
}
