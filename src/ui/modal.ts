import { getGameHeight, getGameWidth } from "../helpers";
import { getColorInt } from "../utilities/colors";
import { MenuButton } from "./menuButton";

interface ModalConfig {
    isOpen: boolean;
    color: string;
}

const padding = 50;

export const Modal = (scene: Phaser.Scene, config: ModalConfig) => {
    // modal state
    let isVisible = config.isOpen;
    const gameWidth = getGameWidth(scene);
    const gameHeight = getGameHeight(scene);
    const width = gameWidth - (padding * 2);
    const height = gameHeight - (padding * 2);

    // modal settings
    const modal = scene.add.rectangle(padding, padding, width, height, getColorInt(config.color), 1);
    modal.setOrigin(0, 0);
    modal.setInteractive();
    modal.setScrollFactor(0);
    modal.setVisible(isVisible)
    modal.setDepth(1)

    const toggleVisible = () => {
        isVisible = !isVisible;
        modal.setVisible(isVisible);
        close.setVisible(isVisible)
    }

    // close button
    const close = new MenuButton(scene, gameWidth - padding - 50, padding + 20, 32, 32, 'X', toggleVisible, isVisible);
    close.setInteractive();
    close.setVisible(config.isOpen)
    close.setDepth(2)

    return {modal, toggleVisible};
}


