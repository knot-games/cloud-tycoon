import * as Phaser from 'phaser';
import { colorPalette, hex } from '../../../assets/colorPalette';
import { modal } from './modal';
import { title } from '../text/title';
import { Game } from '../../objects/game';
import { destroyAll, getGameWidth, getGameHeight } from '../../helpers';

const backgroundColor = colorPalette.brown;
const accentColor = colorPalette.yellow;
let cartState: CartPurchaseState = {
	servers: {},
	storeItems: {},
	totalCost: 0,
};
let totalCost: Phaser.GameObjects.Text;
let errorText: Phaser.GameObjects.Text;

export const storeModal = function (scene: Phaser.Scene, game: Game, levelState: Level, onClose: () => void) {
	const storeItems = [];
	cartState = getEmptyCartState();
	const closeEvent = () => {
		destroyAll(storeItems.flat());
		onClose();
	};

	// Add modal background
	const modalContainer = modal(scene, backgroundColor, accentColor, closeEvent, true);

	const serverOptions = levelState.servers;
	const ownedServers = game.getServers();
	const storeOptions = levelState.store;
	const ownedStoreItems = game.getStore();

	const storeItemX = 75;
	let storeItemY = 120;

	for (const [key, value] of Object.entries(serverOptions)) {
		const item = storeItem(
			scene,
			storeItemX,
			storeItemY,
			key,
			value.name,
			value.description,
			value.maximum,
			ownedServers[Number(key)],
			value.cost,
			value.monthlyCost,
			value.capacity,
			true,
		);
		modalContainer.add(item);
		storeItemY += 120;
	}

	for (const [key, value] of Object.entries(storeOptions)) {
		const totalOwned = ownedStoreItems[Number(key)]?.purchased ? 1 : 0 || 0;
		const item = storeItem(
			scene,
			storeItemX,
			storeItemY,
			key,
			value.name,
			value.description,
			1,
			totalOwned,
			value.cost,
			0,
			0,
			false,
		);
		modalContainer.add(item);
		storeItemY += 120;
	}

	totalCost = cost(scene, getGameWidth(scene) - 250, storeItemY + 20);
	modalContainer.add(totalCost);

	const purchase = purchaseButton(scene, game, levelState, getGameWidth(scene) - 120, storeItemY + 20, modalContainer);
	modalContainer.add(purchase);

	// Title
	const storeTitle = title(scene, 'Store');
	modalContainer.add(storeTitle);
};

const storeItem = function (
	scene: Phaser.Scene,
	x: number,
	y: number,
	id: string,
	title: string,
	description: string,
	maximum: number,
	currentlyOwned: number,
	cost: number,
	monthlyCost: number,
	capacity: number,
	isServer: boolean,
) {
	const width = getGameWidth(scene) - 150;
	const storeItems = [];
	let currentNumber = currentlyOwned;
	const graphics = scene.add
		.graphics()
		.lineStyle(3, hex(accentColor), 1)
		.strokeRect(x, y, width, 100)
		.strokeRect(x + 20, y + 20, 60, 60);
	storeItems.push(graphics);

	const iconImage = scene.add.image(x + 50, y + 50, isServer ? 'monitor' : 'box').setOrigin(0.5, 0.5);
	storeItems.push(iconImage);

	const itemTitle = scene.add.text(x + 88, y + 20, title, {
		fontFamily: 'Arial',
		fontSize: '20px',
		color: colorPalette.white,
		fontStyle: 'bold',
	});
	storeItems.push(itemTitle);

	const quantityLabel = quantity(scene, getGameWidth(scene) - 75 - 54, y + 36, currentNumber);
	storeItems.push(quantityLabel);

	const plus = plusButton(scene, getGameWidth(scene) - 75 - 40, y + 20, () => {
		if (currentNumber < maximum) {
			currentNumber++;
			quantityLabel.setText(currentNumber.toString());
			cartState.totalCost = cartState.totalCost + cost;
			if (isServer) {
				if (cartState.servers[id]) {
					cartState.servers[id] = cartState.servers[id] + 1;
				} else {
					cartState.servers[id] = 1;
				}
			} else {
				if (cartState.storeItems[id]) {
					cartState.storeItems[id] = cartState.storeItems[id] + 1;
				} else {
					cartState.storeItems[id] = 1;
				}
			}

			totalCost.setText(costText(cartState.totalCost));
		}
	});
	storeItems.push(plus);

	const minus = minusButton(scene, getGameWidth(scene) - 75 - 88, y + 20, () => {
		if (currentNumber > currentlyOwned) {
			currentNumber--;
			quantityLabel.setText(currentNumber.toString());
			cartState.totalCost = cartState.totalCost - cost;
			if (isServer) {
				if (cartState.servers[id]) {
					cartState.servers[id] = cartState.servers[id] - 1;
				}
			} else {
				if (cartState.storeItems[id]) {
					cartState.storeItems[id] = cartState.storeItems[id] - 1;
				}
			}
			totalCost.setText(costText(cartState.totalCost));
		}
	});
	storeItems.push(minus);

	const itemDescription = scene.add.text(x + 88, y + 44, description, {
		fontFamily: 'Arial',
		fontSize: '16px',
		color: colorPalette.white,
		wordWrap: {
			width: width - 40 - 88,
		},
	});
	storeItems.push(itemDescription);

	const itemCostDetails = scene.add.text(
		x + 88,
		y + 64,
		`Cost: $${cost} Monthly Cost: $${monthlyCost} ${isServer ? `Capacity: ${capacity}` : ''}`,
		{ fontFamily: 'Arial', fontSize: '16px', color: colorPalette.white },
	);
	storeItems.push(itemCostDetails);

	return storeItems;
};

const plusButton = function (scene: Phaser.Scene, x: number, y: number, onClick: () => void) {
	const button = scene.add
		.text(x, y, '+')
		.setPadding(4)
		.setStyle({ fontSize: '20px', color: colorPalette.black, backgroundColor: accentColor, align: 'center' })
		.setInteractive({ useHandCursor: true })
		.on('pointerdown', onClick)
		.on('pointerover', () => {
			button.setStyle({ backgroundColor: colorPalette.burntOrange, color: colorPalette.white });
		})
		.on('pointerup', () => {
			button.setStyle({ backgroundColor: colorPalette.burntOrange, color: colorPalette.white });
		})
		.on('pointerout', () => {
			button.setStyle({ backgroundColor: accentColor, color: colorPalette.white });
		});
	return button;
};

const minusButton = function (scene: Phaser.Scene, x: number, y: number, onClick: () => void) {
	const button = scene.add
		.text(x, y, '-')
		.setPadding(4)
		.setStyle({ fontSize: '20px', color: colorPalette.black, backgroundColor: accentColor, align: 'center' })
		.setInteractive({ useHandCursor: true })
		.on('pointerdown', onClick)
		.on('pointerover', () => {
			button.setStyle({ backgroundColor: colorPalette.burntOrange, color: colorPalette.white });
		})
		.on('pointerup', () => {
			button.setStyle({ backgroundColor: colorPalette.burntOrange, color: colorPalette.white });
		})
		.on('pointerout', () => {
			button.setStyle({ backgroundColor: accentColor, color: colorPalette.white });
		});
	return button;
};

const quantity = function (scene: Phaser.Scene, x: number, y: number, currentQuantity: number) {
	return scene.add
		.text(x, y, currentQuantity.toString(), { fontFamily: 'Arial', fontSize: '16px', color: colorPalette.white })
		.setOrigin(0.5, 0.5);
};

const costText = (cost: number) => {
	return `Total Cost: $${cost}`;
};

const cost = function (scene: Phaser.Scene, x: number, y: number) {
	return scene.add
		.text(x, y, costText(cartState.totalCost), {
			fontFamily: 'Arial',
			fontSize: '16px',
			color: colorPalette.white,
			fontStyle: 'bold',
		})
		.setOrigin(0.5, 0.5);
};

const setErrorText = function (scene: Phaser.Scene, text: string, container: Phaser.GameObjects.Container) {
	if (container.getByName("errorText")) {
		container.getByName("errorText").destroy();
	}
	errorText = scene.add
		.text(getGameWidth(scene) - 225, getGameHeight(scene) - 75, text, {
			fontFamily: 'Arial',
			fontSize: '16px',
			color: colorPalette.white,
			fontStyle: 'bold',
		})
		.setName("errorText")
		.setOrigin(0.5, 0.5);
	container.add(errorText);
};

const purchaseButton = function (scene: Phaser.Scene, game: Game, level: Level, x: number, y: number, container: Phaser.GameObjects.Container) {
	const button = scene.add
		.text(x, y, 'Purchase')
		.setOrigin(0.5, 0.5)
		.setPadding(8)
		.setStyle({ fontSize: '16px', color: colorPalette.black, backgroundColor: accentColor, align: 'center' })
		.setInteractive({ useHandCursor: true })
		.on('pointerdown', () => {
			if (cartState.totalCost < game.getCash()) {
				game.purchaseItems(cartState, level);
				setErrorText(scene, 'Purchased!', container);
				cartState = getEmptyCartState();
				totalCost.setText(costText(cartState.totalCost));
			} else {
				setErrorText(scene, 'Not enough funds for this purchase!', container);
			}
		})
		.on('pointerover', () => {
			button.setStyle({ backgroundColor: colorPalette.burntOrange, color: colorPalette.white });
		})
		.on('pointerup', () => {
			button.setStyle({ backgroundColor: colorPalette.burntOrange, color: colorPalette.white });
		})
		.on('pointerout', () => {
			button.setStyle({ backgroundColor: accentColor, color: colorPalette.white });
		});
	return button;
};

const getEmptyCartState = () => {
	return {
		servers: {},
		storeItems: {},
		totalCost: 0,
	};
};
