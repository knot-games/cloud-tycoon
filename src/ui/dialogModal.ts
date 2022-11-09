import * as Phaser from 'phaser';
import { colorPalette } from '../../assets/colorPalette';
import { getGameHeight } from '../helpers';
import { modal } from './modal';

const backgroundColor = colorPalette.darkestGreen;
const accentColor = colorPalette.lightGreen;
const padding = 32;
const windowHeight = 150;

export const dialogModal = function (scene: Phaser.Scene, text: string[], onClose: () => void) {
  const closeEvent = () => {
    onClose();
    dialogText.destroy();
  }

  // Add modal background
  modal(scene, backgroundColor, accentColor, closeEvent, false);

  const dialogText = scene.make.text({
    x: padding + 8,
    y: getGameHeight(scene) - windowHeight - padding + 8,
    text: ">" + text[0],
    style: {
        font: 'bold 16px Arial',
        color: colorPalette.white,
        align: 'left'
    }
    });


}