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
        game.addCustomers(customersGained, Number(id), levelState);
    }

    // Gain money and save game
    game.updateCash(levelState);

    // Check level progression
    const profit = game.getProfit();
    if (profit >= levelState.goal) {
        progressLevel();
    }
    return game;
}

const progressLevel = () => {
    // Do something here to progress to the next level
    console.log("Next Level!!!")
}

const getRandomCustomerNumber = (customerJoinRate: number): number => {
    return Math.floor(Math.random() * customerJoinRate);
}