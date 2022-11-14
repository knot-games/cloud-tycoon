import * as Phaser from 'phaser';
import { colorPalette } from '../../../assets/colorPalette';
import { modal } from './modal';
import { title } from '../text/title';
import { Game } from '../../objects/game';
import { getGameWidth } from '../../helpers';

const backgroundColor = colorPalette.darkerPurple;
const accentColor = colorPalette.lightPink;

export const researchModal = function (scene: Phaser.Scene, game: Game, levelState: Level, onClose: () => void) {
	const closeEvent = () => {
		onClose();
	};

	// Add modal background
	const modalContainer = modal(scene, backgroundColor, accentColor, closeEvent, true);

	// Title
	const modalTitle = title(scene, 'Research');
	modalContainer.add(modalTitle);

    // If research on levelState is empty object
    if (Object.keys(levelState.research).length === 0) {
        const noEmployeesText = scene.add.text(0, 0, 'You have no research options yet! Build your empire further to get research options.', {
            fontFamily: 'Arial',
            fontSize: '20px',
            color: colorPalette.white,
            wordWrap: { width: getGameWidth(scene) - 200 },
        });
        noEmployeesText.setOrigin(0.5, 0.5);
        noEmployeesText.setPosition(getGameWidth(scene) / 2, 150);
        modalContainer.add(noEmployeesText);
    }
};