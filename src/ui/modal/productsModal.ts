import * as Phaser from 'phaser';
import { colorPalette, hex } from '../../../assets/colorPalette';
import { modal } from './modal';
import { title } from '../text/title';
import { Game } from '../../objects/game';
import { getGameHeight, getGameWidth } from '../../helpers';

const backgroundColor = colorPalette.darkerSalmon;
const accentColor = colorPalette.salmon;

const priceState: PriceSetState = {}
let errorText: Phaser.GameObjects.Text;

export const productsModal = function (scene: Phaser.Scene, game: Game, levelState: Level, onClose: () => void) {
	const closeEvent = () => {
		onClose();
	};

	// Add modal background
	const modalContainer = modal(scene, backgroundColor, accentColor, closeEvent, true);

	// Title
	const modalTitle = title(scene, 'Products');
	modalContainer.add(modalTitle);

    const productItemX = 75;
	let productItemY = 120;

    const currentProducts = game.getProducts();

	for (const [key, value] of Object.entries(levelState.products)) {
		const item = product(
			scene,
			productItemX,
			productItemY,
			key,
			value.name,
			value.description,
            currentProducts[Number(key)] || value.average,
			value.average,
			value.stdDev, 
            modalContainer
		);
		productItemY += 120;
	}

    const save = saveButton(scene, game, getGameWidth(scene) - 120, productItemY + 20, modalContainer);
	modalContainer.add(save);
};

const product = function (
	scene: Phaser.Scene,
	x: number,
	y: number,
	id: string,
	title: string,
	description: string,
	currentPrice: number,
	average: number,
	stdDev: number,
    container: Phaser.GameObjects.Container,
) {
    const maxPrice = average + (stdDev * 3);
    const minPrice = average - (stdDev * 3) > 0 ? average - (stdDev * 3) : 0;
	const width = getGameWidth(scene) - 150;
	let currentNumber = currentPrice;
	const graphics = scene.add
		.graphics()
		.lineStyle(3, hex(accentColor), 1)
		.strokeRect(x, y, width, 100)
		.strokeRect(x + 20, y + 20, 60, 60);
    container.add(graphics);

	const iconImage = scene.add.image(x + 50, y + 50, 'coin').setOrigin(0.5, 0.5);
    container.add(iconImage);

	const itemTitle = scene.add.text(x + 88, y + 20, title, {
		fontFamily: 'Arial',
		fontSize: '20px',
		color: colorPalette.white,
		fontStyle: 'bold',
	});
    container.add(itemTitle);

	const currentPriceLabel = price(scene, getGameWidth(scene) - 75 - 54, y + 36, currentNumber);
    container.add(currentPriceLabel);

    let itemCostDetailsText = getItemCostDetailsText(currentNumber, average, stdDev);
    const itemCostDetails = scene.add.text(
		x + 88,
		y + 64,
		itemCostDetailsText,
		{ fontFamily: 'Arial', fontSize: '16px', color: colorPalette.white },
	);
    container.add(itemCostDetails);

	const plus = plusButton(scene, getGameWidth(scene) - 75 - 40, y + 20, () => {
		if (currentNumber <= maxPrice) {
			currentNumber++;
			currentPriceLabel.setText(currentNumber.toString());
            if (priceState[id]) {
                priceState[id] = currentNumber + 1;
            } else {
                priceState[id] = currentNumber + 1;
            }
            itemCostDetailsText = getItemCostDetailsText(currentNumber, average, stdDev);
            itemCostDetails.setText(itemCostDetailsText);
		}
	});
    container.add(plus);

	const minus = minusButton(scene, getGameWidth(scene) - 75 - 88, y + 20, () => {
		if (currentNumber >= minPrice) {
			currentNumber--;
			currentPriceLabel.setText(currentNumber.toString());
			if (priceState[id]) {
                priceState[id] = currentNumber - 1;
            } else {
                priceState[id] = currentNumber - 1;
            }
            itemCostDetailsText = getItemCostDetailsText(currentNumber, average, stdDev);
            itemCostDetails.setText(itemCostDetailsText);
		}
	});
    container.add(minus);

	const itemDescription = scene.add.text(x + 88, y + 44, description, {
		fontFamily: 'Arial',
		fontSize: '16px',
		color: colorPalette.white,
		wordWrap: {
			width: width - 40 - 88,
		},
	});
    container.add(itemDescription);
};

const getItemCostDetailsText = function (currentPrice: number, average: number, stdDev: number) {
    let itemCostDetailsText = 'This cost is about average compared to the market average'

    if (currentPrice > average + (stdDev * 2)) {
        itemCostDetailsText = 'This cost is MUCH higher compared to the market average'
    } else if (currentPrice > average + stdDev) {
        itemCostDetailsText = 'This cost is higher compared to the market average'
    } else if (currentPrice < average - stdDev) {
        itemCostDetailsText = 'This cost is lower compared to the market average'
    } else if (currentPrice < average - (stdDev * 2)) {
        itemCostDetailsText = 'This cost is MUCH lower compared to the market average'
    }

    return itemCostDetailsText;
}


const plusButton = function (scene: Phaser.Scene, x: number, y: number, onClick: () => void) {
	const button = scene.add
		.text(x, y, '+')
		.setPadding(4)
		.setStyle({ fontSize: '20px', color: colorPalette.black, backgroundColor: accentColor, align: 'center' })
		.setInteractive({ useHandCursor: true })
		.on('pointerdown', onClick)
		.on('pointerover', () => {
			button.setStyle({ backgroundColor: colorPalette.darkSalmon, color: colorPalette.white });
		})
		.on('pointerup', () => {
			button.setStyle({ backgroundColor: colorPalette.darkSalmon, color: colorPalette.white });
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
			button.setStyle({ backgroundColor: colorPalette.darkSalmon, color: colorPalette.white });
		})
		.on('pointerup', () => {
			button.setStyle({ backgroundColor: colorPalette.darkSalmon, color: colorPalette.white });
		})
		.on('pointerout', () => {
			button.setStyle({ backgroundColor: accentColor, color: colorPalette.white });
		});
	return button;
};

const price = function (scene: Phaser.Scene, x: number, y: number, currentPrice: number) {
	return scene.add
		.text(x, y, currentPrice.toString(), { fontFamily: 'Arial', fontSize: '16px', color: colorPalette.white })
		.setOrigin(0.5, 0.5);
};

const saveButton = function (scene: Phaser.Scene, game: Game, x: number, y: number, container: Phaser.GameObjects.Container) {
	const button = scene.add
		.text(x, y, 'Save')
		.setOrigin(0.5, 0.5)
		.setPadding(8)
		.setStyle({ fontSize: '16px', color: colorPalette.black, backgroundColor: accentColor, align: 'center' })
		.setInteractive({ useHandCursor: true })
		.on('pointerdown', () => {
			game.setProductPrices(priceState);
            setErrorText(scene, 'Prices saved!', container);
		})
		.on('pointerover', () => {
			button.setStyle({ backgroundColor: colorPalette.darkSalmon, color: colorPalette.white });
		})
		.on('pointerup', () => {
			button.setStyle({ backgroundColor: colorPalette.darkSalmon, color: colorPalette.white });
		})
		.on('pointerout', () => {
			button.setStyle({ backgroundColor: accentColor, color: colorPalette.white });
		});
	return button;
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