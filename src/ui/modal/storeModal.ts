import * as Phaser from 'phaser';
import { colorPalette } from '../../../assets/colorPalette';
import { modal } from './modal';
import { title } from '../text/title';

const backgroundColor = colorPalette.lightBrown;
const accentColor = colorPalette.yellow;

export const storeModal = function (scene: Phaser.Scene, onClose: () => void) {
  const closeEvent = () => {
    storeTitle.destroy();
    onClose();
  }

  // Add modal background
  modal(scene, backgroundColor, accentColor, closeEvent, true);

  // Title
  const storeTitle = title(scene, 'Store');
}