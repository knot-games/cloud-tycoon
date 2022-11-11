import { Game } from "../objects/game";

// Month progression marks a significant change in the game state, as well as a 
// game save point. This function is called at the end of each month.
export const progressMonth = (game: Game, levelState: Level): Game => {
    // Customer attrition and acquisition can be impacted by the cost of products
    let customerAcquisitionMultiplier = 1;
    let customerAttritionMultiplier = 1;

    // Lose customers
    for (const [id, customer] of Object.entries(levelState.customers)) {
        const customersLost = Math.floor(1 - Math.pow(customer.loyalty, customerAttritionMultiplier));
        console.log(customersLost);
        game.deleteCustomers(customersLost, Number(id));
    }

    // Gain customers
    for (const [id, customer] of Object.entries(levelState.customers)) {
        const customersGained = Math.floor(getRandomCustomerNumber(customer.joinRate) * customerAcquisitionMultiplier);
        console.log(customersGained);
        game.addCustomers(customersGained, Number(id));
    }

    // Gain money and save game
    game.updateCash(levelState);
    return game;
}

const getRandomCustomerNumber = (customerJoinRate: number): number => {
    return Math.floor(Math.random() * customerJoinRate);
}