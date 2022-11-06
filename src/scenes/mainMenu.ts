
import { MenuButton } from '../ui/menuButton';
import { getGameWidth, getGameHeight } from '../helpers';
import { levels } from '../config/levels';
import { SettingsModalPlugin } from '../plugins/settingsModal';
import eventCenter, { SettingsEvents, UIEvents } from '../events/eventCenter';
import { Settings } from '../objects/settings';
import { Business } from '../objects/business';
import { Game } from '../objects/game';

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

  private gameState: Game;
  private settings: Settings;
  private playerBusiness: Business;

  public init (gameState: GameState): void {
    this.gameState = new Game(gameState);
    console.log({gameState})

    this.settings = new Settings(gameState.settings)
    this.playerBusiness = new Business(gameState.playerBusiness)
  }

  public create(): void {
    const gameWidth = getGameWidth(this);
    const gameHeight = getGameHeight(this);

    // Set background
    const background = this.add.image(gameWidth / 2, gameHeight / 2, 'mainMenuBackground')
    const backgroundScaleX = gameWidth / background.width;
    const backgroundScaleY = gameHeight / background.height;
    background.setScale(backgroundScaleX, backgroundScaleY).setScrollFactor(0);

    eventCenter.on(UIEvents.UI_UPDATE_SOUND, (data) => {
      console.log('UI_UPDATE_SOUND', data)
      this.toggleSetting(data.event)
    }, this);


    // Set music
    if (this.settings.getMusicEnabled()) {
      this.sound.play('mainMenuMusic', { loop: true });
    }

    // Set logo
    this.add.image(gameWidth / 2, 165, 'logo')
    
    // Continue game
    if (this.gameState.getPlayerBusiness().name !== null) {
      const currentLevel = this.gameState.getCurrentLevel();
      new MenuButton(this, gameWidth / 2 - 100, 330, 200, 32, 'Continue', () => {
        this.scene.start(levels[currentLevel].levelScene, this.gameState);
      });
    }

    // Start game
    new MenuButton(this, gameWidth / 2 - 100, 370, 200, 32, 'Start New Game', () => {
      // TODO: Make a way to set this from an intro level so users can set their own name
      this.playerBusiness.setName("Cloud Co")
      this.gameState = new Game(this.gameState.savePlayerBusiness(this.playerBusiness));
      console.log({gameState: this.gameState})
      this.scene.start('LevelOne', this.gameState);
    });

    // Settings
    this.sys.plugins.installScenePlugin('SettingsModalPlugin', SettingsModalPlugin, 'SettingsModalPlugin', this);
    new MenuButton(this, gameWidth / 2 - 100, 410, 200, 32, 'Settings', () => this.sys['SettingsModalPlugin'].init(this.settings));
  }

  private toggleSetting(event: SettingsEvents): void {

        console.log('toggleSetting', event);

        switch (event) {
            case SettingsEvents.TOGGLE_MUSIC:
              this.settings.toggleMusic();
              const isMusicPlaying = this.settings.getMusicEnabled();
              if (!isMusicPlaying) {
                this.sound.get('mainMenuMusic').stop();
              } else {
                this.sound.play('mainMenuMusic', { loop: true });
              }
              console.log({isMusicPlaying});
              break;
              case SettingsEvents.TOGGLE_SOUND_EFFECTS:
                this.settings.toggleSoundEffects();
                const areSoundEffectsEnabled = this.settings.getSoundEffectsEnabled();
                console.log({areSoundEffectsEnabled});
                break;
        }
    }
}

