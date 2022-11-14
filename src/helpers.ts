import * as Phaser from 'phaser';
import { levels } from './config/levels';

export const getGameWidth = (scene: Phaser.Scene): number => {
	return scene.game.scale.width;
};

export const getGameHeight = (scene: Phaser.Scene): number => {
	return scene.game.scale.height;
};

export const destroyAll = (objects: Phaser.GameObjects.GameObject[]) => {
	objects.forEach((object) => {
		object.destroy();
	});
};

export const endScenes = (scene: Phaser.Scene) => {
	if (scene.scene.isActive('HUDScene')) {
		scene.scene.stop('HUDScene');
	}
	for (const [key, value] of Object.entries(levels)) {
		if (scene.scene.isActive(value.levelScene)) {
			console.log(scene.scene.get(value.levelScene));
			scene.scene.get(value.levelScene).scene.stop();
		}
	}
}
