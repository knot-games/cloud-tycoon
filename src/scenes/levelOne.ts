import { getGameWidth } from '../helpers';
import { button } from "../ui/button";

import eventsCenter, { GameplayBusinessEvents, UIEvents } from '../events/eventCenter';
import { BaseScene } from './baseScene';

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: 'LevelOne',
};

export class GameScene extends BaseScene {
  constructor() {
    super(sceneConfig);
  }

  public init(gameState: GameState): void {
    // Launch HUD Scene and pass the gameState
    this.scene.launch('HUDScene', gameState);
  }

  public create(): void {
    const gameWidth = getGameWidth(this);

    // Create a text object to display the day
    this.add.text(gameWidth / 2 - 100, 310, 'Game Scene');

    // Create menu to buy server 
    button(this, gameWidth / 2, 270, 'Buy Server', 200, this.GameState.getSoundEffectsEnabled(), () => eventsCenter.emit(UIEvents.UI_UPDATE_COSTS, { event: GameplayBusinessEvents.BUSINESS_ADD_SERVER }));

    button(this, gameWidth / 2, 310, 'Sell Server', 200, this.GameState.getSoundEffectsEnabled(), () => eventsCenter.emit(UIEvents.UI_UPDATE_COSTS, { event: GameplayBusinessEvents.BUSINESS_REMOVE_SERVER }));

    button(this, gameWidth / 2, 350, 'Add Customer', 200, this.GameState.getSoundEffectsEnabled(), () => eventsCenter.emit(UIEvents.UI_UPDATE_COSTS, { event: GameplayBusinessEvents.BUSINESS_ADD_CUSTOMER }));

    button(this, gameWidth / 2, 390, 'Remove Customer', 200, this.GameState.getSoundEffectsEnabled(), () => eventsCenter.emit(UIEvents.UI_UPDATE_COSTS, { event: GameplayBusinessEvents.BUSINESS_REMOVE_CUSTOMER }));
  }
}
