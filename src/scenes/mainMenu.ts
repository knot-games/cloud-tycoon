import { newGameState } from '../config/newGame';
import { MenuButton } from '../ui/menuButton';
import { getGameState, isMusicOn, saveGameState } from '../utilities/localStorage';
import { getGameWidth, getGameHeight } from '../helpers';
import { levels } from '../config/levels';
import { Modal } from '../ui/modal';
import { colorPalette } from '../../assets/colorPalette';

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
    const musicEnabled = isMusicOn();
    if (musicEnabled) {
      this.sound.play('mainMenuMusic', { loop: true });
    }

    // Set logo
    this.add.image(gameWidth / 2, 165, 'logo')
    
    // Continue game
    const existingGameState = getGameState();
    if (existingGameState) {
      const currentLevel = existingGameState.currentLevel;
      new MenuButton(this, gameWidth / 2 - 100, 330, 200, 32, 'Continue', () => {
        this.scene.start(levels[currentLevel].levelScene, existingGameState);
      });
    }

    // Start game
    new MenuButton(this, gameWidth / 2 - 100, 370, 200, 32, 'Start New Game', () => {
      const gameState = newGameState();
      saveGameState(gameState);
      this.scene.start('LevelOne', gameState);
    });

    // Settings
    const { modal, toggleVisible } = Modal(this, { isOpen: false, color: colorPalette.darkPeriwinkle });
    
    
    new MenuButton(this, gameWidth / 2 - 100, 410, 200, 32, 'Settings', () => toggleVisible());

    // Help button if we decide to use it
    // new MenuButton(this, gameWidth / 2 - 100, 450, 'Help', () => console.log('help button clicked'));
    
    this.add.existing(modal);
  }
}

