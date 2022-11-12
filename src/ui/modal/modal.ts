import { getColorInt, getGameHeight, getGameWidth } from "../../helpers";

const modalPadding = 32;
const windowHeight = 150;
const bottomBar = 40;

export const modal = (scene: Phaser.Scene, backgroundColor: string, accentColor: string, onClose: () => void, fullScreen: boolean, onClick?: () => void) => {
    const width = getGameWidth(scene) - (modalPadding * 2);
    const height = fullScreen ? getGameHeight(scene) - (modalPadding * 2) - 20 : windowHeight;
    const modalButtonBorderX = getGameWidth(scene) - modalPadding - 20;
    const modalButtonBorderY = fullScreen ? modalPadding : getGameHeight(scene) - windowHeight - modalPadding - bottomBar;
    const modalY = fullScreen ? modalPadding : getGameHeight(scene) - windowHeight - modalPadding - bottomBar;

    const close = () => {
        onClose();
        modal.destroy();
        closeButton.destroy();
        scene.input.off("pointerdown", onClick);
    }

    const modal = scene.add.graphics()
        .fillStyle(getColorInt(backgroundColor), 0.98)
        .fillRect(modalPadding + 1, modalY + 1, width - 1, height - 1)
        .lineStyle(3, getColorInt(accentColor), 1)
        .strokeRect(modalPadding, modalY, width, height)
        .strokeRect(modalButtonBorderX, modalButtonBorderY, 20, 20);
    
    if (onClick) {
        scene.input.on('pointerdown', onClick);
    }

    const closeButton = scene.make.text({
        x: getGameWidth(scene) - modalPadding - 14,
        y: modalY + 3,
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