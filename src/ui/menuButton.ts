import * as Phaser from 'phaser';

const padding = 8;

export class MenuButton extends Phaser.GameObjects.Rectangle {
  private label: Phaser.GameObjects.Text;

  constructor(scene: Phaser.Scene, x: number, y: number, xSize: number, ySize: number, text: string, onClick?: () => void, setVisible?: boolean) {
    super(scene, x, y);
    scene.add.existing(this);
    this.setOrigin(0, 0);

    this.label = scene.add
      .text(x + padding, y + padding, text)
      .setFontSize(18)
      .setAlign('center');

    const labelWidth = this.label.width + padding;
    const labelHeight = this.label.height + padding;

    this.width = labelWidth >= xSize ? labelWidth : xSize;
    this.height = labelHeight >= ySize ? labelHeight : ySize;

    this.setInteractive({ useHandCursor: true })
      .on('pointerover', this.enterMenuButtonHoverState)
      .on('pointerout', this.enterMenuButtonRestState)
      .on('pointerdown', this.enterMenuButtonActiveState)
      .on('pointerup', this.enterMenuButtonHoverState);

    if (onClick) {
      this.on('pointerup', onClick);
    }

    if (setVisible) {
      this.setVisible(setVisible);
      this.label.setVisible(setVisible);
    }

    this.enterMenuButtonRestState();
  }

  private enterMenuButtonHoverState() {
    this.label.setColor('#000000');
    this.setFillStyle(0x888888);
  }

  private enterMenuButtonRestState() {
    this.label.setColor('#FFFFFF');
    this.setFillStyle(0x888888);
  }

  private enterMenuButtonActiveState() {
    this.label.setColor('#BBBBBB');
    this.setFillStyle(0x444444);
  }
}
