import { getColorInt, getGameHeight, getGameWidth } from "../helpers";

const modalPadding = 32;

export const modal = (scene: Phaser.Scene, backgroundColor: string, accentColor: string, onClose: () => void) => {
    const width = getGameWidth(scene) - (modalPadding * 2);
    const height = getGameHeight(scene) - (modalPadding * 2);
    const modalButtonBorderX = getGameWidth(scene) - modalPadding - 20;

    const close = () => {
        onClose();
        modal.destroy();
        closeButton.destroy();
    }

    const modal = scene.add.graphics()
        .fillStyle(getColorInt(backgroundColor), 0.98)
        .fillRect(modalPadding + 1, modalPadding + 1, width - 1, height - 1)
        .lineStyle(3, getColorInt(accentColor), 1)
        .strokeRect(modalPadding, modalPadding, width, height)
        .strokeRect(modalButtonBorderX, modalPadding, 20, 20);

    const closeButton = scene.make.text({
        x: getGameWidth(scene) - modalPadding - 14,
        y: modalPadding + 3,
        text: 'X',
        style: {
            font: 'bold 12px Arial',
            color: 'white',
        }
    })
    .setInteractive({ useHandCursor: true })
    .on('pointerover', function () {
        this.setTint(getColorInt(accentColor));
    })
    .on('pointerout', function () {
        this.clearTint();
    })
    .on('pointerdown', function () {
        close();
    });
}