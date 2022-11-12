
import { colorPalette } from "../../../assets/colorPalette";
import { hoverModal } from "./hoverModal";

const width = 350;
let height = 150;

export const costHoverModal = (scene: Phaser.Scene, servers: ServerState, facility: number, levelState: Level, x: number, y: number) => {
    const costHoverModalItems = [];
    const serverOptions = Object.entries(levelState.servers).length;
    height = height + (serverOptions * 24);
    const modal = hoverModal(scene, x, y, width, height, colorPalette.darkerSalmon, colorPalette.salmon);
    height = 150;
    costHoverModalItems.push(modal);
    let yValue = y + 20;

    // Facilities
    const facilityTitle = scene.add.text((width / 2) + x, yValue, "Facility", { fontFamily: "Arial", fontSize: "20px", color: colorPalette.white }).setOrigin(0.5, 0.5);
    costHoverModalItems.push(facilityTitle);
    yValue += 24;

    const currentFacility = levelState.facilities[facility]
    const facilityEntry = scene.add.text(x + 20, yValue, currentFacility.name + ": $" + currentFacility.cost + "/month", { fontFamily: "Arial", fontSize: "16px", color: colorPalette.white }).setOrigin(0, 0.5);
    costHoverModalItems.push(facilityEntry);
    yValue += 30;

    // Servers
    const serverTitle = scene.add.text((width / 2) + x, yValue, "Server Costs", { fontFamily: "Arial", fontSize: "20px", color: colorPalette.white }).setOrigin(0.5, 0.5);
    costHoverModalItems.push(serverTitle);
    yValue += 24;

    for (const [key, value] of Object.entries(levelState.servers)) {
        const serverEntry = scene.add.text(x + 20, yValue, value.name + ": $" + Math.floor(servers[Number(key)] * value.monthlyCost) + "/month", { fontFamily: "Arial", fontSize: "16px", color: colorPalette.white }).setOrigin(0, 0.5);
        costHoverModalItems.push(serverEntry);
        yValue += 24;
    }

    return costHoverModalItems;
}