import { Business } from "../objects/business";
import { saveGameState } from "../utilities/localStorage";
import { MenuButton } from "../ui/menuButton";
import { getGameHeight, getGameWidth } from "../helpers";

import eventsCenter, { GameplayBusinessEvents, UIEvents } from "../events/eventCenter";
import { DialogModalPlugin } from "../plugins/dialogModal";

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: 'LevelOne',
};

export class GameScene extends Phaser.Scene {

  constructor() {
    super(sceneConfig);
  }

  public init(gameState: GameState): void {

    // Launch HUD Scene and pass the gameState
    this.scene.launch('HUDScene', gameState);

  };

  public create(): void {

    this.sys.plugins.installScenePlugin('DialogModalPlugin', DialogModalPlugin, 'DialogModalPlugin', this);
    this.sys['DialogModalPlugin'].init()
    this.sys['DialogModalPlugin'].setText('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', true);

    const gameWidth = getGameWidth(this);

    // Create a text object to display the day
    this.add.text(gameWidth / 2 - 100, 310, 'Game Scene');

    // Create menu to buy server 

    new MenuButton(this, gameWidth / 2 - 100, 370, 200, 32, 'Buy Server', () => eventsCenter.emit(UIEvents.UI_UPDATE_COSTS, { event: GameplayBusinessEvents.BUSINESS_ADD_SERVER }));

    new MenuButton(this, gameWidth / 2 - 100, 410, 200, 32, 'Sell Server', () => eventsCenter.emit(UIEvents.UI_UPDATE_COSTS, { event: GameplayBusinessEvents.BUSINESS_REMOVE_SERVER }));

    new MenuButton(this, gameWidth / 2 - 100, 450, 200, 32, 'Add Customer', () => eventsCenter.emit(UIEvents.UI_UPDATE_COSTS, { event: GameplayBusinessEvents.BUSINESS_ADD_CUSTOMER }));

    new MenuButton(this, gameWidth / 2 - 100, 490, 200, 32, 'Remove Customer', () => eventsCenter.emit(UIEvents.UI_UPDATE_COSTS, { event: GameplayBusinessEvents.BUSINESS_REMOVE_CUSTOMER }));


  }

}
