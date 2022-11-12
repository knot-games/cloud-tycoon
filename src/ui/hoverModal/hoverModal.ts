import { getColorInt } from "../../helpers";

export const hoverModal = (scene: Phaser.Scene, x: number, y: number, width: number, height: number, backgroundColor: string, borderColor: string) => {
    return scene.add.graphics()
        .fillStyle(getColorInt(backgroundColor), 0.98)
        .fillRect(x + 1, y + 1, width - 1, height - 1)
        .lineStyle(3, getColorInt(borderColor), 1)
        .strokeRect(x, y, width, height);
}