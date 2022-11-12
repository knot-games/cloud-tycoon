
import { colorPalette } from "../../../assets/colorPalette";
import { hoverModal } from "./hoverModal";

const width = 350;
let height = 150;

export const customerHoverModal = (scene: Phaser.Scene, customers: CustomerState, levelState: Level, x: number, y: number) => {
    const customerHoverModalItems = [];
    const customerOptions = Object.entries(levelState.customers).length;
    height = height + (customerOptions * 24);
    const modal = hoverModal(scene, x, y, width, height, colorPalette.darkPurpleish, colorPalette.periwinkle);
    height = 150;
    customerHoverModalItems.push(modal);
    let yValue = y + 20;


    // Title
    const title = scene.add.text((width / 2) + x, yValue, "Customers", { fontFamily: "Arial", fontSize: "20px", color: colorPalette.white }).setOrigin(0.5, 0.5);
    customerHoverModalItems.push(title);

    // Customer details
    yValue += 30;
    for (const [key, value] of Object.entries(levelState.customers)) {
        const serverEntry = scene.add.text(x + 20, yValue, value.name + ": " + customers[Number(key)], { fontFamily: "Arial", fontSize: "16px", color: colorPalette.white }).setOrigin(0, 0.5);
        customerHoverModalItems.push(serverEntry);
        yValue += 24;
    }

    return customerHoverModalItems;
}