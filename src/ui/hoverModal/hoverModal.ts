import { hex } from "../../../assets/colorPalette";

export const hoverModal = (
	scene: Phaser.Scene,
	x: number,
	y: number,
	width: number,
	height: number,
	backgroundColor: string,
	borderColor: string,
) => {
	return scene.add
		.graphics()
		.fillStyle(hex(backgroundColor), 0.98)
		.fillRect(x + 1, y + 1, width - 1, height - 1)
		.lineStyle(3, hex(borderColor), 1)
		.strokeRect(x, y, width, height);
};
