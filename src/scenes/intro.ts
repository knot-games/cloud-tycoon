import { getGameWidth } from '../helpers';
import { button } from '../ui/button/button';

import { BaseScene } from './baseScene';

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
	active: false,
	visible: false,
	key: 'Intro',
};

export class IntroScene extends BaseScene {
	private nameInput: Phaser.GameObjects.DOMElement;
	private returnKey: Phaser.Input.Keyboard.Key;

	constructor() {
		super(sceneConfig);
	}

	public init(): void {
		console.log('Intro Init');
		this.GameState.updateGameState();
	}

	public create(): void {
		this.add.image(getGameWidth(this) / 2, 165, 'logo');
		this.add.text(getGameWidth(this) / 2, 350, 'Input Company Name').setOrigin(0.5, 0.5);

		this.nameInput = this.add
			.dom(getGameWidth(this) / 2 + 100, 500)
			.createFromCache('nameForm')
			.setOrigin(0.5, 0.5);

		this.returnKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

		this.returnKey.on('down', (event) => {
			const name: HTMLInputElement = <HTMLInputElement>this.nameInput.getChildByName('name');
			this.saveName(name.value);
		});
	}
	private saveName(name: string): void {
		this.GameState.Game.setBusinessName(name);
		this.GameState.updateGameState();
		this.scene.start('LevelOne');
	}
}
