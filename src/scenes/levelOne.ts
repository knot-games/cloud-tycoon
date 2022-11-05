
const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: 'LevelOne',
};

export class GameScene extends Phaser.Scene {

  private dateText: Phaser.GameObjects.Text;
  private moneyText: Phaser.GameObjects.Text;
  private gameState: GameState;

  constructor() {
    super(sceneConfig);
  }

  public init(gameState: GameState): void {
    this.gameState = gameState;
  }

  public create(): void {
    this.dateText = this.add.text(100, 200, 'Month ' + this.gameState.currentMonth);
    this.moneyText = this.add.text(100, 250, 'Money ' + this.gameState.money);

    // Evey 5 seconds update the time
    this.time.addEvent({
      delay: 5000,
      callback: this.updateState,
      callbackScope: this,
      loop: true
    });

  }

  public update(): void { }

  private updateState(): void {

    this.gameState.currentMonth++;
    this.gameState.money += 1000;

    this.dateText.setText('Month ' + this.gameState.currentMonth);
    this.moneyText.setText('Money ' + this.gameState.money);

  }

}
