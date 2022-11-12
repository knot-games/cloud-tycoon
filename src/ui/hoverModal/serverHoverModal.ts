
import { colorPalette } from "../../../assets/colorPalette";
import { hoverModal } from "./hoverModal";

const width = 350;
let height = 150;

export const serverHoverModal = (scene: Phaser.Scene, servers: ServerState, totalCustomers: number, levelState: Level, x: number, y: number) => {
    const serverModalItems = [];
    const serverOptions = Object.entries(levelState.servers).length;
    height = height + (serverOptions * 24);
    const modal = hoverModal(scene, x, y, width, height, colorPalette.brown, colorPalette.yellow);
    height = 150;
    serverModalItems.push(modal);
    let yValue = y + 20;


    // Title
    const title = scene.add.text((width / 2) + x, yValue, "Servers", { fontFamily: "Arial", fontSize: "20px", color: colorPalette.white }).setOrigin(0.5, 0.5);
    serverModalItems.push(title);

    // Server details
    let totalCapacity = 0;
    yValue += 30;
    for (const [key, value] of Object.entries(levelState.servers)) {
        totalCapacity += servers[Number(key)] * value.capacity;
        const serverEntry = scene.add.text(x + 20, yValue, value.name + ": " + servers[Number(key)], { fontFamily: "Arial", fontSize: "16px", color: colorPalette.white }).setOrigin(0, 0.5);
        serverModalItems.push(serverEntry);
        yValue += 24;
    }

    // Stats title
    yValue += 12;
    const stats = scene.add.text((width / 2) + x, yValue, "Stats", { fontFamily: "Arial", fontSize: "20px", color: colorPalette.white }).setOrigin(0.5, 0.5);
    serverModalItems.push(stats);

    // Capacity
    yValue += 30;
    const remainingCapacity = Math.floor(100 - (totalCustomers / totalCapacity * 100));
    const capacity = scene.add.text(x + 20, yValue, "Capacity: " + totalCustomers + "/" + totalCapacity + " (" + remainingCapacity + "% remaining)", { fontFamily: "Arial", fontSize: "16px", color: colorPalette.white }).setOrigin(0, 0.5);
    serverModalItems.push(capacity);

    return serverModalItems;
}