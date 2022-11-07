import * as Phaser from 'phaser';
import { colorPalette } from '../../assets/colorPalette';
import eventCenter, { SettingsEvents, UIEvents } from '../events/eventCenter';
import { Settings } from '../objects/settings';

export const Button = function (scene: Phaser.Scene, x: number, y: number, text: string, settings: Settings, onClick?: () => void) {
  let playSoundEffects = settings.getSoundEffectsEnabled();

  const toggleSetting = (event: SettingsEvents): void => {
    switch (event) {
        case SettingsEvents.TOGGLE_SOUND_EFFECTS:
          playSoundEffects = !playSoundEffects;
          break;
    }
  }

  const clickEvent = () => {
    onClick();
    if (playSoundEffects) {
      scene.sound.play('click');
    }
  }

  eventCenter.on(UIEvents.UI_UPDATE_SOUND, (data) => {
    toggleSetting(data.event)
  }, this);

  const button = scene.add.text(x, y, text)
    .setOrigin(0.5)
    .setPadding(16, 8)
    .setStyle({ fontSize: '18px', color: 'white', backgroundColor: colorPalette.darkTeal, fixedWidth: 200, align: 'center' })
    .setInteractive({ useHandCursor: true })
    .on('pointerdown', clickEvent)
    .on('pointerover', () => { button.setStyle({backgroundColor: colorPalette.teal, color: 'white'}) })
    .on('pointerup', () => { button.setStyle({backgroundColor: colorPalette.teal, color: 'white'}) })
    .on('pointerout', () => { button.setStyle({backgroundColor: colorPalette.darkTeal, color: 'white'}) });
}
