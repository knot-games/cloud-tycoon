import { colorPalette } from '../../../assets/colorPalette';
import { hoverModal } from './hoverModal';

const width = 350;
const height = 150;

export const profitHoverModal = (
	scene: Phaser.Scene,
	revenue: number,
	costs: number,
	levelState: Level,
	x: number,
	y: number,
) => {
	const profitHoverModalItems = [];
	const modal = hoverModal(scene, x, y, width, height, colorPalette.darkerPurple, colorPalette.lightPink);
	profitHoverModalItems.push(modal);
	let yValue = y + 20;

	// Title
	const title = scene.add
		.text(width / 2 + x, yValue, 'Monthly Profit', {
			fontFamily: 'Arial',
			fontSize: '20px',
			color: colorPalette.white,
		})
		.setOrigin(0.5, 0.5);
	profitHoverModalItems.push(title);
	yValue += 30;

	// Revenue
	const revenueEntry = scene.add
		.text(x + 20, yValue, 'Revenue: $' + revenue + '/month', {
			fontFamily: 'Arial',
			fontSize: '16px',
			color: colorPalette.white,
		})
		.setOrigin(0, 0.5);
	profitHoverModalItems.push(revenueEntry);
	yValue += 24;

	// Costs
	const costEntry = scene.add
		.text(x + 20, yValue, 'Costs: $' + costs + '/month', {
			fontFamily: 'Arial',
			fontSize: '16px',
			color: colorPalette.white,
		})
		.setOrigin(0, 0.5);
	profitHoverModalItems.push(costEntry);
	yValue += 24;

	// Profit Goal
	const profitGoalEntry = scene.add
		.text(x + 20, yValue, 'Profit Goal: $' + levelState.goal + '/month', {
			fontFamily: 'Arial',
			fontSize: '16px',
			color: colorPalette.white,
		})
		.setOrigin(0, 0.5);
	profitHoverModalItems.push(profitGoalEntry);
	yValue += 24;

	return profitHoverModalItems;
};
