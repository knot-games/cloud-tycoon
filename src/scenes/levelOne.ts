import { BaseScene } from './baseScene';
import { LevelOne } from '../config/levelOne';
import { levelIntro } from '../logic/levelIntro';
import { Server } from '../objects/server';

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
	active: false,
	visible: false,
	key: 'LevelOne',
};

export class GameScene extends BaseScene {
	controls?: Phaser.Cameras.Controls.FixedKeyControl;
	levelState?: Level;
	zone?: Phaser.GameObjects.Zone;
	floorLayer?: Phaser.Tilemaps.TilemapLayer;
	spriteContainer?: Phaser.GameObjects.Container;
	servers: Server[] = [];

	constructor() {
		super(sceneConfig);
		this.controls = null;
	}

	public init(): void {
		// Launch HUD Scene and pass the gameState
		this.scene.launch('HUDScene');
		this.levelState = LevelOne;
		const { width, height } = this.sys.canvas;
		this.zone = this.add.zone(width / 2, height / 2, width, height);
	}

	public create(): void {
		this.initFloor();
		this.initSprites();
		this.initServers();
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
		this.floorLayer = map.createLayer(0, tiles, 0, 0).setOrigin(0, 0);
		Phaser.Display.Align.In.Center(this.floorLayer, this.zone);
	}

	private initSprites() {
		this.spriteContainer = this.add.container();
		const sprites = [
			// tbh these could've been exported together as a bg, but idk what would be interactive
			{ key: 'poster-a', x: 67, y: 27 },
			{ key: 'poster-b', x: 137, y: 23 },
			{ key: 'garage', x: 283, y: 13 },
			{ key: 'desk', x: 46, y: 77 },
			{ key: 'desk-computers', x: 52, y: 50 },
			{ key: 'desk-chair', x: 108, y: 110 },
			{ key: 'plant', x: 180, y: 41 },
			{ key: 'extinguisher', x: 29, y: 147 },
			{ key: 'laundry-storage', x: 52, y: 309 },
			{ key: 'cardboard-boxes', x: 320, y: 298 },
			{ key: 'ping-pong', x: 320, y: 125 },
		];

		sprites.forEach((spriteConfig) => {
			const sprite = this.make.sprite({ origin: { x: 0, y: 0 }, ...spriteConfig });
			this.spriteContainer.add(sprite);
		});

		Phaser.Display.Align.To.TopLeft(this.spriteContainer, this.floorLayer);
	}

	private initServers() {
		// adding for demo, these would be add/removed based on user actions
		this.servers = [new Server('foo', true), new Server('bar', false), new Server('baz', true)];
		this.servers.forEach((server, i) => {
			const serverSprite = this.make.sprite({
				origin: { x: 0, y: 0 },
				key: server.toTexture(),
				x: 47 + i * 47, // 47 is the width of a server
				y: 204,
			});
			this.spriteContainer.add(serverSprite);
		});
	}
}
