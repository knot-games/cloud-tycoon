import { Game } from '../objects/game';
import { getGameState } from '../utilities/localStorage';

export class GameStatePlugin extends Phaser.Plugins.BasePlugin {
  public Game: Game;

  constructor(pluginManager: Phaser.Plugins.PluginManager) {
    super(pluginManager);

    this.Game = new Game(getGameState());
  }

  public updateGameState(): void {
    const gameState = getGameState();
    console.log({ updateGameStateState: gameState})
    this.Game = new Game(gameState);
  }
}
