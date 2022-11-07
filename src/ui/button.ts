import * as Phaser from 'phaser';
import { colorPalette } from '../../assets/colorPalette';

export const button = function (scene: Phaser.Scene, x: number, y: number, text: string, maxWidth: number, onClick?: () => void) {
  let playSoundEffects = true;

  const clickEvent = () => {
    onClick();
    if (playSoundEffects) {
      scene.sound.play('click');
    }
  }

  const button = scene.add.text(x, y, text)
    .setOrigin(0.5)
    .setPadding(16, 8)
    .setStyle({ fontSize: '18px', color: colorPalette.white, backgroundColor: colorPalette.darkTeal, fixedWidth: maxWidth, align: 'center' })
    .setInteractive({ useHandCursor: true })
    .on('pointerdown', clickEvent)
    .on('pointerover', () => { button.setStyle({ backgroundColor: colorPalette.teal, color: colorPalette.white }) })
    .on('pointerup', () => { button.setStyle({ backgroundColor: colorPalette.teal, color: colorPalette.white }) })
    .on('pointerout', () => { button.setStyle({ backgroundColor: colorPalette.darkTeal, color: colorPalette.white }) });
}