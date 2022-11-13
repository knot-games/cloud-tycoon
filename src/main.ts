import * as Phaser from 'phaser';
import { colorPalette } from '../assets/colorPalette';
import { GameStatePlugin } from './plugin/GameStatePlugin';
import Scenes from './scenes';

const gameConfig: Phaser.Types.Core.GameConfig = {
	title: 'Cloud Tycoon',

	type: Phaser.AUTO,

	dom: {
		createContainer: true,
	},

	plugins: {
		global: [
			{
				key: 'GameState',
				plugin: GameStatePlugin,
				start: true,
			},
		],
		scene: [
			{
				key: 'GameState',
				plugin: GameStatePlugin,
				mapping: 'GameState',
			},
		],
	},

	scale: {
		mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH,
		width: 800,
		height: 600,
	},

	scene: Scenes,

	physics: {
		default: 'arcade',
		arcade: {
			debug: true,
		},
	},

	parent: 'cloud',
	backgroundColor: colorPalette.background,
};

export const game = new Phaser.Game(gameConfig);

window.addEventListener('resize', () => {
	game.scale.refresh();
});
