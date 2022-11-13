import * as Phaser from 'phaser';
import { colorPalette } from '../../../assets/colorPalette';
import eventCenter, { ClockEvents } from '../../events/eventCenter';
import { getGameHeight, getGameWidth } from '../../helpers';
import { modal } from './modal';

const backgroundColor = colorPalette.darkestGreen;
const accentColor = colorPalette.lightGreen;
const padding = 32;
const windowHeight = 150;
const dialogSpeed = 4;
let finishText = false;
let textInProgress = true;
let modalOpen = true;

export const dialogModal = function (scene: Phaser.Scene, text: string[], onClose: () => void) {
	eventCenter.emit(ClockEvents.CLOCK_PAUSE);
	let dialogText;
	let textIndex = 0;
	const closeEvent = () => {
		onClose();
		if (dialogText) {
			dialogText.destroy();
		}
		textInProgress = true;
		textIndex = 0;
		finishText = false;
		modalOpen = false;
	};

	const clickEvent = () => {
		if (modalOpen) {
			if (textInProgress && !finishText) {
				// Finish text early
				finishText = true;
			} else if (textIndex < text.length - 1) {
				textIndex++;
				dialogText.destroy();
				dialogText = addText(scene, text[textIndex], true);
			} else {
				dialogText.destroy();
				dialogText = addText(scene, 'Close this window to continue', false);
			}
		} else {
			if (dialogText) {
				dialogText.destroy();
			}
		}
	};

	// Add modal background
	modal(scene, backgroundColor, accentColor, closeEvent, false, clickEvent);

	dialogText = addText(scene, text[textIndex], true);
};

const addText = (scene: Phaser.Scene, text: string, animate: boolean) => {
	let timedEvent;
	let screenText;
	let eventCounter = 0;
	const dialog = text.split('');
	textInProgress = true;
	modalOpen = true;

	const setText = (currentText: string) => {
		if (screenText) screenText.destroy();

		screenText = scene.make.text({
			x: padding + 10,
			y: getGameHeight(scene) - windowHeight - padding + 10 - 36,
			text: currentText,
			style: {
				font: 'bold 16px Arial',
				color: colorPalette.white,
				align: 'left',
				wordWrap: {
					width: getGameWidth(scene) - padding * 2 - 33,
				},
			},
		});
	};

	let tempText = animate ? '' : text;

	const animateText = () => {
		if (finishText) {
			screenText.setText(text);
			timedEvent.remove();
			addFinalText();
			finishText = false;
			textInProgress = false;
		} else {
			textInProgress = true;
			eventCounter++;
			tempText = tempText + dialog[eventCounter - 1];
			screenText.setText(tempText);
			if (eventCounter === dialog.length) {
				timedEvent.remove();
				addFinalText();
			}
		}
	};

	const addFinalText = () => {
		screenText.setText(screenText.text + ' Click to continue...');
	};

	if (timedEvent) {
		timedEvent.remove();
	}

	setText(tempText);
	if (animate) {
		timedEvent = scene.time.addEvent({
			delay: 150 - dialogSpeed * 30,
			callback: () => animateText(),
			loop: true,
		});
	}

	return screenText;
};
