import { Business } from '../objects/business';
import { Clock } from '../objects/clock';

import { GameStatePlugin } from '../plugin/GameStatePlugin';

export abstract class BaseScene extends Phaser.Scene {
  GameState!: GameStatePlugin;
}
