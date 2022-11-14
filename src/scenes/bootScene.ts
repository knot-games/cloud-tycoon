import { getGameWidth, getGameHeight } from '../helpers';
import { getGameState } from '../utilities/localStorage';

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
	active: false,
	visible: false,
	key: 'Boot',
};

/**
 * The initial scene that loads all necessary assets to the game and displays a loading bar.
 */
export class BootScene extends Phaser.Scene {
	constructor() {
		super(sceneConfig);
	}

	public preload(): void {
		const halfWidth = getGameWidth(this) * 0.5;
		const halfHeight = getGameHeight(this) * 0.5;

		const progressBarHeight = 100;
		const progressBarWidth = 400;

		const progressBarContainer = this.add.rectangle(
			halfWidth,
			halfHeight,
			progressBarWidth,
			progressBarHeight,
			0x000000,
		);
		const progressBar = this.add.rectangle(
			halfWidth + 20 - progressBarContainer.width * 0.5,
			halfHeight,
			10,
			progressBarHeight - 20,
			0x888888,
		);

		const loadingText = this.add.text(halfWidth - 75, halfHeight - 100, 'Loading...').setFontSize(24);
		const percentText = this.add.text(halfWidth - 25, halfHeight, '0%').setFontSize(24);
		const assetText = this.add.text(halfWidth - 25, halfHeight + 100, '').setFontSize(24);

		this.load.on('progress', (value) => {
			progressBar.width = (progressBarWidth - 30) * value;

			const percent = value * 100;
			percentText.setText(`${percent.toFixed(2)}%`);
		});

		this.load.on('fileprogress', (file) => {
			assetText.setText(file.key);
		});

		this.load.on('complete', () => {
			loadingText.destroy();
			percentText.destroy();
			assetText.destroy();
			progressBar.destroy();
			progressBarContainer.destroy();

			this.scene.start('Base');
			this.scene.start('MainMenu');
		});

		this.loadAssets();
	}

	/**
	 * All assets that need to be loaded by the game (sprites, images, animations, tiles, music, etc)
	 * should be added to this method. Once loaded in, the loader will keep track of them, indepedent of which scene
	 * is currently active, so they can be accessed anywhere.
	 */
	private loadAssets() {
		// Images
		this.load.image('mainMenuBackground', 'assets/backgrounds/mainMenu.png');
		this.load.image('logo', 'assets/logo.png');

		// Sounds
		this.load.audio('mainMenuMusic', 'assets/sounds/mainMenuMusic.mp3');
		this.load.audio('click', 'assets/sounds/click.mp3');
		this.load.audio('cash', 'assets/sounds/cash.mp3');

		// Icons
		[
			'bag',
			'bell',
			'bag',
			'bolt',
			'box',
			'cloud',
			'coin',
			'exclamation',
			'file',
			'flask',
			'folder',
			'home',
			'monitor',
			'person',
			'speech-question',
			'trophy',
		].forEach((icon) => {
			this.load.image(icon, `assets/icons/${icon}.png`);
		});

		// Sprites
		[
			'cardboard-boxes',
			'desk-chair',
			'desk-computers',
			'desk',
			'extinguisher',
			'garage',
			'laundry-storage',
			'ping-pong',
			'plant',
			'poster-a',
			'poster-b',
			'server-off',
			'server-on',
		].forEach((sprite) => {
			this.load.image(sprite, `assets/sprites/${sprite}.png`);
		});

		// Tilemaps
		this.load.image('level-1-48x48', 'assets/tilemaps/level-1-48x48.png');
		this.load.tilemapCSV('level-1-map', 'assets/tilemaps/level-1.csv');

		// Forms
		this.load.html('nameForm', 'assets/forms/nameForm.html');

		// Fonts
		this.load['rexWebFont']({
			custom: {
				families: ['FontAwesome'],
			}
		})
	}
}
