import eventCenter, { GameplayRandomEvents } from "../events/eventCenter";
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
        game.deleteCustomers(customersLost, Number(id));
    }

    // Gain customers
    for (const [id, customer] of Object.entries(levelState.customers)) {
        const customersGained = Math.floor(getRandomCustomerNumber(customer.joinRate) * customerAcquisitionMultiplier);
        game.addCustomers(customersGained, Number(id), levelState);
    }

    // Gain money and save game
    game.updateCash(levelState);

    // Check level progression
    const profit = game.getProfit();
    if (profit >= levelState.goal) {
        progressLevel();
    }

    // Check for random events
    randomEvent(game, levelState);

    return game;
}

const randomEvent = (game: Game, levelState: Level): void => {
    let randomEvent;

    const storeState = game.getStore();
    const purchasedItemsArray = Object.entries(storeState).filter(([key, value]) => value.purchased).map(([key, value]) => key);

    // Roll for each random event
    for (const [id, event] of Object.entries(levelState.events)) {
        // Roll for the event
        const roll = Math.random();

        // Determine event likelihood
        let likelihoodReducer = 0;
        purchasedItemsArray.forEach(itemId => {
            if (levelState.store[itemId].events.includes(Number(id))) {
                likelihoodReducer += levelState.store[itemId].consequence;
            }
        });

        const likelihood = event.likelihood + likelihoodReducer;

        if (roll <= likelihood) {
            randomEvent = event;
        }
    }

    if (randomEvent) {
        // An event occurred! Handle it here
        console.log(randomEvent);
        eventCenter.emit(GameplayRandomEvents.RANDOM_EVENT, randomEvent)
    }
};

const progressLevel = () => {
    // Do something here to progress to the next level
    console.log("Next Level!!!")
}

const getRandomCustomerNumber = (customerJoinRate: number): number => {
    return Math.floor(Math.random() * customerJoinRate);
}