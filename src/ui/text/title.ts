import { colorPalette } from "../../../assets/colorPalette";
import { getGameWidth } from "../../helpers";

export const title = (scene: Phaser.Scene, text: string) => {
    return scene.make.text({
        x: getGameWidth(scene) / 2,
        y: 82,
        text: text,
        style: {
            font: 'bold 32px Arial',
            color: colorPalette.white,
            align: 'center'
        }
      }).setOrigin(0.5, 0.5);
}