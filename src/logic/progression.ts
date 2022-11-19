import eventCenter, { GameplayRandomEvents } from '../events/eventCenter';
import { Game } from '../objects/game';

// Month progression marks a significant change in the game state, as well as a
// game save point. This function is called at the end of each month.
export const progressMonth = (game: Game, levelState: Level): Game => {
	// Customer attrition and acquisition can be impacted by the cost of products
	const customerAcquisitionMultiplier = calculateCustomerAcquisitionMultiplier(game, levelState);
	const customerAttritionMultiplier = calculateCustomerAttritionMultiplier(game, levelState);

	// Lose customers
	for (const [id, customer] of Object.entries(levelState.customers)) {
		const totalCustomers = game.getCustomers();
		const customersLost = Math.floor(totalCustomers * (1 - Math.pow(customer.loyalty, customerAttritionMultiplier)));
		game.deleteCustomers(customersLost, Number(id));
	}

	// Gain customers
	const gameStateServers = game.getServers();
	let capacity = 0;
	for (const [key, value] of Object.entries(levelState.servers)) {
		capacity += gameStateServers[Number(key)] * value.capacity;
	}
	const customerNumber = game.getCustomers();
	for (const [id, customer] of Object.entries(levelState.customers)) {
		if (customerAcquisitionMultiplier > customerAttritionMultiplier) {
			const customersGained = Math.floor(getRandomCustomerNumber(customer.joinRate) * customerAcquisitionMultiplier);
			if (customerNumber + customersGained <= capacity) {
				game.addCustomers(customersGained, Number(id), levelState);
			} else {
				game.addCustomers(capacity - customerNumber, Number(id), levelState);
			}
		}
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
};

const calculateCustomerAcquisitionMultiplier = (game: Game, levelState: Level): number => {
	// More customers will join if prices are cheaper
	let customerAcquisitionMultiplier = 1;
	const products = game.getProducts();
	for (const [key, value] of Object.entries(levelState.products)) {
		if (products[Number(key)]) {
			// If the product is more expensive than the base price
			if (products[Number(key)] < value.average - (value.stdDev * 3)) {
				// Reduce the customer attrition multiplier
				customerAcquisitionMultiplier += 3;
			} else if (products[Number(key)] < value.average + (value.stdDev * 2)) {
				customerAcquisitionMultiplier += 2;
			} else if (products[Number(key)] < value.average + (value.stdDev * 1)) {
				customerAcquisitionMultiplier += 1;
			}
		}
	}
	return customerAcquisitionMultiplier
}

const calculateCustomerAttritionMultiplier = (game: Game, levelState: Level): number => {
	// More customers will leave if prices are more expensive
	// For each product in this level
	let customerAttritionMultiplier = 1;
	const products = game.getProducts();
	for (const [key, value] of Object.entries(levelState.products)) {
		if (products[Number(key)]) {
			// If the product is more expensive than the base price
			if (products[Number(key)] >= value.average + (value.stdDev * 3)) {
				// Reduce the customer attrition multiplier
				customerAttritionMultiplier += 3;
			} else if (products[Number(key)] >= value.average + (value.stdDev * 2)) {
				customerAttritionMultiplier += 2;
			} else if (products[Number(key)] >= value.average + (value.stdDev * 1)) {
				customerAttritionMultiplier += 1;
			}
		}
	}
	return customerAttritionMultiplier
}

const randomEvent = (game: Game, levelState: Level): void => {
	let randomEvent;

	const storeState = game.getStore();
	const purchasedItemsArray = Object.entries(storeState)
		.filter(([key, value]) => value.purchased)
		.map(([key, value]) => key);

	// Roll for each random event
	for (const [id, event] of Object.entries(levelState.events)) {
		// Roll for the event
		const roll = Math.random();

		// Determine event likelihood
		let likelihoodReducer = 0;
		purchasedItemsArray.forEach((itemId) => {
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
		eventCenter.emit(GameplayRandomEvents.RANDOM_EVENT, randomEvent);
	}
};

const progressLevel = () => {
	// Do something here to progress to the next level
	console.log('Next Level!!!');
};

const getRandomCustomerNumber = (customerJoinRate: number): number => {
	return Math.floor(Math.random() * customerJoinRate);
};
