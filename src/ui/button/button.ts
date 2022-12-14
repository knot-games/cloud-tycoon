import * as Phaser from 'phaser';
import { colorPalette } from '../../../assets/colorPalette';
import eventCenter, { SettingsEvents, UIEvents } from '../../events/eventCenter';

export const button = function (
	scene: Phaser.Scene,
	x: number,
	y: number,
	text: string,
	maxWidth: number,
	soundEffectsEnabled: boolean,
	onClick?: () => void,
) {
	let playSoundEffects = soundEffectsEnabled;

	const toggleSetting = (event: SettingsEvents): void => {
		switch (event) {
			case SettingsEvents.TOGGLE_SOUND_EFFECTS:
				playSoundEffects = !playSoundEffects;
				break;
		}
	};

	const clickEvent = () => {
		onClick();
		if (playSoundEffects) {
			scene.sound.play('click');
		}
	};

	eventCenter.on(
		UIEvents.UI_UPDATE_SOUND,
		(data) => {
			toggleSetting(data.event);
		},
		this,
	);

	const button = scene.add
		.text(x, y, text, { fontFamily: 'PixeloidMono', fontSize: '16px' })
		.setOrigin(0.5)
		.setPadding(16, 8)
		.setStyle({
			fontSize: '18px',
			color: colorPalette.white,
			backgroundColor: colorPalette.darkTeal,
			fixedWidth: maxWidth,
			align: 'center',
		})
		.setInteractive({ useHandCursor: true })
		.on('pointerdown', clickEvent)
		.on('pointerover', () => {
			button.setStyle({ backgroundColor: colorPalette.teal, color: colorPalette.white });
		})
		.on('pointerup', () => {
			button.setStyle({ backgroundColor: colorPalette.teal, color: colorPalette.white });
		})
		.on('pointerout', () => {
			button.setStyle({ backgroundColor: colorPalette.darkTeal, color: colorPalette.white });
		});
};
