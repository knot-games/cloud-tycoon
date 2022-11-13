import * as Phaser from 'phaser';
import { colorPalette } from '../../../assets/colorPalette';
import eventCenter, { SettingsEvents, UIEvents } from '../../events/eventCenter';
import { destroyAll, getColorInt, getGameWidth } from '../../helpers';
import { modal } from './modal';
import { title } from '../text/title';

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
				eventCenter.emit(UIEvents.UI_UPDATE_SOUND, { event: SettingsEvents.TOGGLE_MUSIC });
				break;
			case 'soundEffects':
				soundEffectsEnabled = !soundEffectsEnabled;
				eventCenter.emit(UIEvents.UI_UPDATE_SOUND, { event: SettingsEvents.TOGGLE_SOUND_EFFECTS });
				break;
		}
		destroyAll(scene, settingsUI);
		settingsUI = makeSettings(scene, musicEnabled, soundEffectsEnabled, toggleSetting);
	};

	const closeEvent = () => {
		settingsTitle.destroy();
		destroyAll(scene, settingsUI);
		if (soundEffectsEnabled) {
			scene.sound.play('click');
		}
		onClose();
	};

	// Add modal background
	modal(scene, backgroundColor, accentColor, closeEvent, true);

	// Title
	const settingsTitle = title(scene, 'Settings');

	let settingsUI = makeSettings(scene, musicEnabled, soundEffectsEnabled, toggleSetting);

	eventCenter.on(
		UIEvents.UI_UPDATE_SOUND,
		(data) => {
			toggleSetting(data.event);
		},
		this,
	);
};

const makeSettings = (
	scene: Phaser.Scene,
	musicEnabled: boolean,
	soundEffectsEnabled: boolean,
	toggleSetting: (string) => void,
) => {
	const settingsX = (getGameWidth(scene) - 32 * 2) / 2;
	const settingsY = 182;

	const musicCheckbox = scene.make
		.text({
			x: settingsX - 32,
			y: settingsY,
			text: musicEnabled ? checkedUnicode : uncheckedUnicode,
			style: {
				font: 'bold 16px FontAwesome',
				color: colorPalette.white,
				align: 'center',
			},
		})
		.setInteractive({ useHandCursor: true })
		.on('pointerover', function () {
			this.setTint(getColorInt(accentColor));
		})
		.on('pointerout', function () {
			this.clearTint();
		})
		.on('pointerdown', function () {
			toggleSetting('music');
		});

	const musicLabel = scene.make.text({
		x: settingsX,
		y: settingsY,
		text: 'Play music',
		style: {
			font: 'bold 16px Arial',
			color: colorPalette.white,
		},
	});

	const soundEffectsCheckbox = scene.make
		.text({
			x: settingsX - 32,
			y: settingsY + 30,
			text: soundEffectsEnabled ? checkedUnicode : uncheckedUnicode,
			style: {
				font: 'bold 16px FontAwesome',
				color: colorPalette.white,
				align: 'center',
			},
		})
		.setInteractive({ useHandCursor: true })
		.on('pointerover', function () {
			this.setTint(getColorInt(accentColor));
		})
		.on('pointerout', function () {
			this.clearTint();
		})
		.on('pointerdown', function () {
			toggleSetting('soundEffects');
		});

	const soundEffectsLabel = scene.make.text({
		x: settingsX,
		y: settingsY + 30,
		text: 'Play sound effects',
		style: {
			font: 'bold 16px Arial',
			color: colorPalette.white,
		},
	});

	return [musicCheckbox, musicLabel, soundEffectsCheckbox, soundEffectsLabel];
};
