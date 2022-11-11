import * as Phaser from 'phaser';

export const getGameWidth = (scene: Phaser.Scene): number => {
  return scene.game.scale.width;
};

export const getGameHeight = (scene: Phaser.Scene): number => {
  return scene.game.scale.height;
};

export const getColorInt = (color: string) => {
  return parseInt(color.replace('#', ''), 16);
}

export const destroyAll = (scene: Phaser.Scene, objects: Phaser.GameObjects.GameObject[]) => {
  objects.forEach(object => {
    object.destroy();
  });
}
