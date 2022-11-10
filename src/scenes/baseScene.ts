import { emit } from 'process';
import eventCenter, { GameplayEvents } from '../events/eventCenter';
import { GameStatePlugin } from '../plugin/GameStatePlugin';
export abstract class BaseScene extends Phaser.Scene {
  GameState!: GameStatePlugin;

  public init(): void {
    console.log("Base Scene Init")
  }

  public create(): void {
    eventCenter.on(GameplayEvents.GAMEPLAY_GAME_UPDATED, () => {
      this.GameState.updateGameState();
    })
    
  }

}
