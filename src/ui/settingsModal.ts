import * as Phaser from 'phaser';
import { colorPalette } from '../../assets/colorPalette';
import eventCenter, { SettingsEvents, UIEvents } from '../events/eventCenter';
import { getColorInt, getGameWidth } from '../helpers';
import { modal } from './modal';

const backgroundColor = colorPalette.darkPurpleish;
const accentColor = colorPalette.periwinkle;
const checkedUnicode = '\uf14a ';
const uncheckedUnicode = '\uf0c8 ';

export const settingsModal = function (scene: Phaser.Scene, settings: GameSettings, onClose: () => void) {
  let musicEnabled = settings.music;
  let soundEffectsEnabled = settings.soundEffects;

  const toggleSetting = (setting: string): void => {
    switch (setting) {
      case 'music':
        musicEnabled = !musicEnabled;
        eventCenter.emit(UIEvents.UI_UPDATE_SOUND, { event: SettingsEvents.TOGGLE_MUSIC});
        break;
      case 'soundEffects':
        soundEffectsEnabled = !soundEffectsEnabled;
        eventCenter.emit(UIEvents.UI_UPDATE_SOUND, { event: SettingsEvents.TOGGLE_SOUND_EFFECTS});
        break;
    }
    settingsUI.forEach((ui) => ui.destroy());
    settingsUI = makeSettings(scene, musicEnabled, soundEffectsEnabled, toggleSetting);
  }

  const closeEvent = () => {
    title.destroy();
    settingsUI.forEach((ui) => ui.destroy());
    if (soundEffectsEnabled) {
      scene.sound.play('click');
    }
    onClose();
  }

  // Add modal background
  modal(scene, backgroundColor, accentColor, closeEvent);

  // Title
  const title = scene.make.text({
    x: getGameWidth(scene) / 2,
    y: 82,
    text: 'Settings',
    style: {
        font: 'bold 32px Arial',
        color: colorPalette.white,
        align: 'center'
    }
  }).setOrigin(0.5, 0.5);

  let settingsUI = makeSettings(scene, musicEnabled, soundEffectsEnabled, toggleSetting);

  eventCenter.on(UIEvents.UI_UPDATE_SOUND, (data) => {
    toggleSetting(data.event)
  }, this);
}

const makeSettings = (scene: Phaser.Scene, musicEnabled: boolean, soundEffectsEnabled: boolean, toggleSetting: (string) => void) => {
    const settingsX = (getGameWidth(scene) - (32 * 2)) / 2;
    const settingsY = 182;

    const musicCheckbox = scene.make.text({
        x: settingsX - 32,
        y: settingsY,
        text: musicEnabled ? checkedUnicode : uncheckedUnicode,
        style: {
            font: 'bold 16px FontAwesome',
            color: colorPalette.white,
            align: 'center'
        }}
        ).setInteractive({ useHandCursor: true })
        .on('pointerover', function() {
        this.setTint(getColorInt(accentColor));
        })
        .on('pointerout', function() {
        this.clearTint();
        })
        .on('pointerdown', function() {
        toggleSetting('music');
    });

    const musicLabel = scene.make.text({
        x: settingsX,
        y: settingsY,
        text: 'Play music',
        style: {
            font: 'bold 16px Arial',
            color: colorPalette.white,
        }
    });

    const soundEffectsCheckbox = scene.make.text({
        x: settingsX - 32,
        y: settingsY + 30,
        text: soundEffectsEnabled ? checkedUnicode : uncheckedUnicode,
        style: {
            font: 'bold 16px FontAwesome',
            color: colorPalette.white,
            align: 'center'
        }}
        ).setInteractive({ useHandCursor: true })
        .on('pointerover', function() {
        this.setTint(getColorInt(accentColor));
        })
        .on('pointerout', function() {
        this.clearTint();
        })
        .on('pointerdown', function() {
        toggleSetting('soundEffects');
    });

    const soundEffectsLabel = scene.make.text({
        x: settingsX,
        y: settingsY + 30,
        text: 'Play sound effects',
        style: {
            font: 'bold 16px Arial',
            color: colorPalette.white,
        }
    });

    return [musicCheckbox, musicLabel, soundEffectsCheckbox, soundEffectsLabel];
}