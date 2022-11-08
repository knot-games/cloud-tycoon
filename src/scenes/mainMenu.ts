import { newGameState } from '../config/newGame';
import { button } from '../ui/button';
import { isMusicOn } from '../utilities/localStorage';
import { getGameWidth, getGameHeight } from '../helpers';
import { levels } from '../config/levels';
import { Business } from '../objects/business';
import { Game } from '../objects/game';
import { BaseScene } from './baseScene';

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: 'MainMenu',
};

/**
 * The initial scene that starts, shows the splash screens, and loads the necessary assets.
 */
export class MainMenuScene extends BaseScene {
  constructor() {
    super(sceneConfig);
  }

  public create(): void {
    const gameWidth = getGameWidth(this);
    const gameHeight = getGameHeight(this);

    // Set background
    const background = this.add.image(gameWidth / 2, gameHeight / 2, 'mainMenuBackground');
    const backgroundScaleX = gameWidth / background.width;
    const backgroundScaleY = gameHeight / background.height;
    background.setScale(backgroundScaleX, backgroundScaleY).setScrollFactor(0);

    // Set music
    const musicEnabled = isMusicOn();
    if (musicEnabled) {
      this.sound.play('mainMenuMusic', { loop: true });
    }

    // Set logo
    this.add.image(gameWidth / 2, 165, 'logo');


    // Continue game
    if (this.GameState.hasSaveGame()) {
      const currentLevel = this.GameState.currentLevel;
      button(this, gameWidth / 2, 330, 'Continue', 200, () => {
        this.scene.start(levels[currentLevel].levelScene);
      });
    }

    // Start game
    button(this, gameWidth / 2, 380, 'Start Game', 200, () => {
      // TODO: Make a way to set this from an intro level so users can set their own name
      this.GameState.PlayerBusiness.setName("Cloud Co")
      this.scene.start('LevelOne');
    });

    // Settings
    button(this, gameWidth / 2, 430, 'Settings', 200, () => console.log("Settings clicked"));
  }
}
