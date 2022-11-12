import { getGameWidth } from '../helpers';
import { button } from '../ui/button/button';

import eventsCenter, { GameplayBusinessEvents, UIEvents } from '../events/eventCenter';
import { BaseScene } from './baseScene';
import { LevelOne } from '../config/levelOne';
import { levelIntro } from '../logic/levelIntro';

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
	active: false,
	visible: false,
	key: 'LevelOne',
};

export class GameScene extends BaseScene {
	controls?: Phaser.Cameras.Controls.FixedKeyControl;
	levelState?: Level;

	constructor() {
		super(sceneConfig);
		this.controls = null;
	}

	public init(): void {
		// Launch HUD Scene and pass the gameState
		this.scene.launch('HUDScene');
		this.levelState = LevelOne;
		console.log("Level one state: ", this.GameState.Game)
		console.log("Level One Init")
	}

	public create(): void {
		this.add.text(200, 75, 'Use arrow keys to move around');

		this.initControls();
		this.initFloor();
		// this.initButtons();
		if (!this.GameState.Game.hasPlayerViewedLevelIntro(this.levelState.number)) {
			this.GameState.Game.pauseClock();
			this.GameState.updateGameState();
			levelIntro(this, this.levelState.story, this.levelState.number);
		}
	}

	public update(time: number, delta: number): void {
		if (this.controls) {
			this.controls.update(delta);
		}
	}

	private initFloor(): void {
		const map = this.make.tilemap({ key: 'level-1-map', tileWidth: 48, tileHeight: 48 });
		const tiles = map.addTilesetImage('level-1-48x48', null, 48, 48, 0, 0);
		map.createLayer(0, tiles, 200, 100);
	}

	private initControls(): void {
		const cursors = this.input.keyboard.createCursorKeys();
		const controlConfig = {
			camera: this.cameras.main,
			left: cursors.left,
			right: cursors.right,
			up: cursors.up,
			down: cursors.down,
			speed: 0.5,
		};
		this.controls = new Phaser.Cameras.Controls.FixedKeyControl(controlConfig);
	}

	private initButtons(): void {
		const gameWidth = getGameWidth(this);

		// Create menu to buy server
		button(this, gameWidth / 2, 270, 'Buy Server', 200, this.GameState.Game.getSoundEffectsEnabled(), () =>
			eventsCenter.emit(UIEvents.UI_UPDATE_COSTS, { event: GameplayBusinessEvents.BUSINESS_ADD_SERVER }),
		);

		button(this, gameWidth / 2, 310, 'Sell Server', 200, this.GameState.Game.getSoundEffectsEnabled(), () =>
			eventsCenter.emit(UIEvents.UI_UPDATE_COSTS, { event: GameplayBusinessEvents.BUSINESS_REMOVE_SERVER }),
		);

		button(this, gameWidth / 2, 350, 'Add Customer', 200, this.GameState.Game.getSoundEffectsEnabled(), () =>
			eventsCenter.emit(UIEvents.UI_UPDATE_COSTS, { event: GameplayBusinessEvents.BUSINESS_ADD_CUSTOMER }),
		);

		button(this, gameWidth / 2, 390, 'Remove Customer', 200, this.GameState.Game.getSoundEffectsEnabled(), () =>
			eventsCenter.emit(UIEvents.UI_UPDATE_COSTS, { event: GameplayBusinessEvents.BUSINESS_REMOVE_CUSTOMER }),
		);
	}
}
