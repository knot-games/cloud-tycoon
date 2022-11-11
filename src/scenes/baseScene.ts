import { GameStatePlugin } from '../plugin/GameStatePlugin';
export abstract class BaseScene extends Phaser.Scene {
  GameState!: GameStatePlugin;

}
