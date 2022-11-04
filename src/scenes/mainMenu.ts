import { newGameState } from '../config/newGame';
import { MenuButton } from '../ui/menuButton';
import { getGameState, getSettings, saveGameState, saveSettings } from '../utilities/localStorage';
import { getGameWidth, getGameHeight } from '../helpers';
import { baseSettings } from '../config/baseSettings';

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: 'MainMenu',
};

/**
 * The initial scene that starts, shows the splash screens, and loads the necessary assets.
 */
export class MainMenuScene extends Phaser.Scene {
  constructor() {
    super(sceneConfig);
  }

  public create(): void {
    const gameWidth = getGameWidth(this);
    const gameHeight = getGameHeight(this);

    // Set background
    const background = this.add.image(gameWidth / 2, gameHeight / 2, 'mainMenuBackground')
    const backgroundScaleX = gameWidth / background.width;
    const backgroundScaleY = gameHeight / background.height;
    background.setScale(backgroundScaleX, backgroundScaleY).setScrollFactor(0);

    // Set music
    const settings = getSettings();
    if (!settings) {
      const newSettings = baseSettings();
      saveSettings(newSettings);
      this.sound.play('mainMenuMusic', { loop: true });
    } else if (settings.music) {
      this.sound.play('mainMenuMusic', { loop: true });
    }

    // Set logo
    this.add.image(gameWidth / 2, 165, 'logo')
    
    const existingGameState = getGameState();
    if (existingGameState) {
      new MenuButton(this, gameWidth / 2 - 100, 330, 'Continue', () => {
        this.scene.start('LevelOne', existingGameState);
      });
    }

    new MenuButton(this, gameWidth / 2 - 100, 370, 'Start New Game', () => {
      const gameState = newGameState();
      saveGameState(gameState);
      this.scene.start('LevelOne', gameState);
    });

    new MenuButton(this, gameWidth / 2 - 100, 410, 'Settings', () => console.log('settings button clicked'));

    new MenuButton(this, gameWidth / 2 - 100, 450, 'Help', () => console.log('help button clicked'));
  }
}

