import { button } from '../ui/button';
import { settingsModal } from '../ui/settingsModal';
import { getGameWidth, getGameHeight } from '../helpers';
import { levels } from '../config/levels';
import { BaseScene } from './baseScene';
import eventCenter, { SettingsEvents, UIEvents } from '../events/eventCenter';

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

    eventCenter.on(UIEvents.UI_UPDATE_SOUND, (data) => {
      this.toggleSetting(data.event)
    }, this);

    // Set music
    if (this.GameState.Game.getMusicEnabled()) {
      this.sound.play('mainMenuMusic', { loop: true, volume: 0.2 });
    }

    // Set logo
    this.add.image(gameWidth / 2, 165, 'logo');

    // Continue game
    if (!this.GameState.Game.getIsNewGame()) {
      const currentLevel = this.GameState.Game.getCurrentLevel();
      button(this, gameWidth / 2, 330, 'Continue', 200, this.GameState.Game.getSoundEffectsEnabled(), () => {
        this.scene.start(levels[currentLevel].levelScene);
      });
    }

    // Start game
    button(this, gameWidth / 2, 380, 'Start Game', 200, this.GameState.Game.getSoundEffectsEnabled(), () => {
      // TODO: Make a way to set this from an intro level so users can set their own name
      this.GameState.Game.setBusinessName("Cloud Co")
      this.GameState.updateGameState();
      this.scene.start('LevelOne');
    });

    // Settings
    button(this, gameWidth / 2, 430, 'Settings', 200, this.GameState.Game.getSoundEffectsEnabled(), () => settingsModal(this, this.GameState.Game.getSettings(), () => {}));
  }

  private toggleSetting(event: SettingsEvents): void {

    switch (event) {
        case SettingsEvents.TOGGLE_MUSIC:
          this.GameState.Game.toggleMusic();
          const isMusicPlaying = this.GameState.Game.getMusicEnabled();
          if (!isMusicPlaying) {
            this.sound.get('mainMenuMusic').stop();
          } else {
            this.sound.play('mainMenuMusic', { loop: true, volume: 0.2 });
          }
          break;
        case SettingsEvents.TOGGLE_SOUND_EFFECTS:
          this.GameState.Game.toggleSoundEffects();
          break;
    }
}
}
