import * as Phaser from 'phaser';
import { colorPalette, hex } from '../../../assets/colorPalette';
import { modal } from './modal';
import { title } from '../text/title';
import { Game } from '../../objects/game';
import { getGameWidth } from '../../helpers';

const backgroundColor = colorPalette.darkerSalmon;
const accentColor = colorPalette.salmon;

const priceState: PriceSetState = {}

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
    const maxPrice = average + (stdDev * 4);
    const minPrice = average - (stdDev * 4) > 0 ? average - (stdDev * 4) : 0;
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

	const plus = plusButton(scene, getGameWidth(scene) - 75 - 40, y + 20, () => {
		if (currentNumber < maxPrice) {
			currentNumber++;
			currentPriceLabel.setText(currentNumber.toString());
            if (priceState[id]) {
                priceState[id] = currentNumber + 1;
            } else {
                priceState[id] = currentNumber + 1;
            }
		}
	});
    container.add(plus);

	const minus = minusButton(scene, getGameWidth(scene) - 75 - 88, y + 20, () => {
		if (currentNumber > minPrice) {
			currentNumber--;
			currentPriceLabel.setText(currentNumber.toString());
			if (priceState[id]) {
                priceState[id] = currentNumber - 1;
            } else {
                priceState[id] = currentNumber - 1;
            }
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

    // switch statement comparing price to average and stddev
    // switch(currentNumber) { 
    //     case (average + stdDev > currentNumber): { 
    //        //statements; 
    //        break; 
    //     } 
    //     case constant_expression2: { 
    //        //statements; 
    //        break; 
    //     } 
    //     default: { 
    //        //statements; 
    //        break; 
    //     } 
    //  }

	const itemCostDetails = scene.add.text(
		x + 88,
		y + 64,
		'This cost is MUCH higher compared to the market average',
		{ fontFamily: 'Arial', fontSize: '16px', color: colorPalette.white },
	);
    container.add(itemCostDetails);
};


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