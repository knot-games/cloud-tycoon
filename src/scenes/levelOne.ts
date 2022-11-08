import { MenuButton } from '../ui/menuButton';
import { getGameWidth } from '../helpers';

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

    new MenuButton(this, gameWidth / 2 - 100, 450, 'Add Customer', () =>
      eventsCenter.emit(UIEvents.UI_UPDATE_COSTS, { event: GameplayBusinessEvents.BUSINESS_ADD_CUSTOMER }),
    );

    new MenuButton(this, gameWidth / 2 - 100, 490, 'Remove Customer', () =>
      eventsCenter.emit(UIEvents.UI_UPDATE_COSTS, { event: GameplayBusinessEvents.BUSINESS_REMOVE_CUSTOMER }),
    );
  }
}
