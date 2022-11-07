import { getGameHeight, getGameWidth } from "../helpers";

import eventsCenter, { GameplayBusinessEvents, UIEvents } from "../events/eventCenter";
import { DialogModalPlugin } from "../plugins/dialogModal";
import { Button } from "../ui/button";
import { Settings } from "../objects/settings";
import { SettingsModalPlugin } from "../plugins/settingsModal";

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: 'LevelOne',
};

export class GameScene extends Phaser.Scene {

  constructor() {
    super(sceneConfig);
  }

  private settings: Settings;

  public init(gameState: GameState): void {
    this.settings = new Settings(gameState.settings);

    // Launch HUD Scene and pass the gameState
    this.scene.launch('HUDScene', gameState);

  };

  public create(): void {

    this.sys.plugins.installScenePlugin('DialogModalPlugin', DialogModalPlugin, 'DialogModalPlugin', this);
    // this.sys.scenePlugin.start('SettingsModalPlugin');
    console.log(this.sys);
    // start settings modal plugin
    this.sys.plugins.installScenePlugin('SettingsModalPlugin', SettingsModalPlugin, 'SettingsModalPlugin', this);
    console.log({isActive: this.sys.plugins.isActive('SettingsModalPlugin')});
    this.sys.plugins.installScenePlugin('SettingsModalPlugin', SettingsModalPlugin, 'SettingsModalPlugin', this);
    this.sys['DialogModalPlugin'].init()
    this.sys['DialogModalPlugin'].setText("The year is 2013, you have recently started self-hosting your favorite game, SphereCraft, and have some extra space on your rig to spare. You have an idea to offer server space to others to make some extra cash (which would be nice, as you are currently crashing in your parents' basement).", true);

    const gameWidth = getGameWidth(this);
    const gameHeight = getGameHeight(this);

    // Create a text object to display the day
    this.add.text(gameWidth / 2 - 100, 310, 'Game Scene');

    // Create menu to buy server 

    Button(this, gameWidth / 2, 270, 'Buy Server', this.settings, () => eventsCenter.emit(UIEvents.UI_UPDATE_COSTS, { event: GameplayBusinessEvents.BUSINESS_ADD_SERVER }));

    Button(this, gameWidth / 2, 310, 'Sell Server', this.settings, () => eventsCenter.emit(UIEvents.UI_UPDATE_COSTS, { event: GameplayBusinessEvents.BUSINESS_REMOVE_SERVER }));

    Button(this, gameWidth / 2, 350, 'Add Customer', this.settings, () => eventsCenter.emit(UIEvents.UI_UPDATE_COSTS, { event: GameplayBusinessEvents.BUSINESS_ADD_CUSTOMER }));

    Button(this, gameWidth / 2, 390, 'Remove Customer', this.settings, () => eventsCenter.emit(UIEvents.UI_UPDATE_COSTS, { event: GameplayBusinessEvents.BUSINESS_REMOVE_CUSTOMER }));
  }

}
