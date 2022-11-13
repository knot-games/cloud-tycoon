import { colorPalette } from '../../../assets/colorPalette';
import { getColorInt, getGameHeight } from '../../helpers';
import { Game } from '../../objects/game';
import { storeModal } from '../modal/storeModal';

const menuWidth = 200;
const menuItemHeight = 40;
const numberOfMenuItems = 5;

export const hudMenu = (scene: Phaser.Scene, game: Game, levelState: Level) => {
	const menuItems = [];

	const menuBackground = scene.add
		.rectangle(
			0,
			getGameHeight(scene) - numberOfMenuItems * menuItemHeight - 40,
			menuWidth,
			numberOfMenuItems * menuItemHeight,
			getColorInt(colorPalette.menuBar),
		)
		.setOrigin(0, 0)
		.setInteractive({ useHandCursor: true })
		.on('pointerdown', () => {
			console.log('Something in menu clicked!');
		});
	menuItems.push(menuBackground);

	// Main Menu
	const mainMenuItem = menuItem(
		scene,
		0,
		getGameHeight(scene) - 1 * menuItemHeight - 40,
		menuWidth,
		menuItemHeight,
		'Main Menu',
		'home',
		() => {
			console.log('Main Menu Clicked!');
		},
	);
	menuItems.push(mainMenuItem);

	// Research
	const researchItem = menuItem(
		scene,
		0,
		getGameHeight(scene) - 2 * menuItemHeight - 40,
		menuWidth,
		menuItemHeight,
		'Research',
		'flask',
		() => {
			console.log('Research clicked!');
		},
	);
	menuItems.push(researchItem);

	// Employees
	const employeesItem = menuItem(
		scene,
		0,
		getGameHeight(scene) - 3 * menuItemHeight - 40,
		menuWidth,
		menuItemHeight,
		'Employees',
		'person',
		() => {
			console.log('Employees clicked!');
		},
	);
	menuItems.push(employeesItem);

	// Products
	const productsItems = menuItem(
		scene,
		0,
		getGameHeight(scene) - 4 * menuItemHeight - 40,
		menuWidth,
		menuItemHeight,
		'Products',
		'coin',
		() => {
			console.log('Products clicked!');
		},
	);
	menuItems.push(productsItems);

	// Store
	const storeItem = menuItem(
		scene,
		0,
		getGameHeight(scene) - 5 * menuItemHeight - 40,
		menuWidth,
		menuItemHeight,
		'Store',
		'bag',
		() => {
			storeModal(scene, game, levelState, () => {
				console.log('Closing store');
			});
		},
	);
	menuItems.push(storeItem);

	return menuItems.flat();
};

const menuItem = (
	scene: Phaser.Scene,
	x: number,
	y: number,
	width: number,
	height: number,
	text: string,
	icon: string,
	onClick: () => void,
) => {
	// Add background
	const menuItem = scene.add
		.rectangle(x, y, width, height, getColorInt(colorPalette.menuBar))
		.setOrigin(0, 0)
		.setInteractive({ useHandCursor: true })
		.on('pointerdown', () => {
			onClick();
		});
	const graphics = scene.add.graphics();
	graphics.lineStyle(3, getColorInt(colorPalette.blue), 1).strokeRect(x, y, width - 1, height - 1);

	// Add icon
	const iconImage = scene.add
		.image(x + 24, y + 20, icon)
		.setScale(0.75)
		.setTint(0x000000);

	const textItem = scene.add.text(x + 48, y + 12, text, {
		color: colorPalette.black,
		align: 'left',
	});

	// Add text
	return [menuItem, graphics, iconImage, textItem];
};
