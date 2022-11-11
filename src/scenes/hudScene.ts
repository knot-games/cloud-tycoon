import eventCenter, { ClockEvents, GameplayBusinessEvents, GameplayEvents, UIEvents } from '../events/eventCenter';
import { BaseScene } from './baseScene';

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  key: 'HUDScene',
};

export class HUDScene extends BaseScene {
  constructor() {
    super(sceneConfig);
  }

  private dateText: Phaser.GameObjects.Text;
  private cashText: Phaser.GameObjects.Text;
  private costText: Phaser.GameObjects.Text;

  private customerText: Phaser.GameObjects.Text;

  public init(): void {
    console.log('HUDScene init');
  }

  public create(): void {
    this.add.text(50, 100, 'HUD Scene');

    // Create a text object to display the day
    this.dateText = this.add.text(50, 120, this.GameState.Game.getDateString());

    // Create a text object to display the money
    this.cashText = this.add.text(50, 140, 'Cash ' + this.GameState.Game.getCash());
    this.costText = this.add.text(50, 160, 'Cost ' + this.GameState.Game.getCosts());

    // Create a text object to display the customer count
    this.customerText = this.add.text(50, 180, 'Customers ' + this.GameState.Game.getCustomers());

    // Evey 5 seconds update the time
    this.time.addEvent({
      delay: 5000,
      callback: this.updateDate,
      callbackScope: this,
      loop: true,
    });

    eventCenter.on(ClockEvents.CLOCK_WEEK_END, this.updateCash, this);
  
    eventCenter.on(ClockEvents.CLOCK_RESUME, () => this.GameState.Game.unPauseClock(), this);
    
    eventCenter.on(GameplayEvents.GAMEPLAY_COMPLETE_LEVEL_INTRO, ({ levelNumber }) => { this.GameState.Game.completeLevelIntro(levelNumber); }, this);

    eventCenter.on(GameplayEvents.GAMEPLAY_GAME_UPDATED, () => {
      this.GameState.updateGameState();
    })

    eventCenter.on(UIEvents.UI_UPDATE_COSTS,
      (data) => {
        console.log('UI_UPDATE_COSTS', data);
        this.updateCosts(data.event);
      },
      this,
    );
  }

  // Update the cash on the end of the month
  private updateCash(): void {
    console.log('updateCash');

    this.GameState.Game.updateCash();

    this.cashText.setText('Cash ' + this.GameState.Game.getCash());
  }

  // Update the cost of the business on customer or server change
  private updateCosts(event: GameplayBusinessEvents): void {
    console.log('updateCosts', event);
    switch (event) {
      case GameplayBusinessEvents.BUSINESS_ADD_CUSTOMER:
        this.GameState.Game.setCustomers(1);
        this.customerText.setText('Customers ' + this.GameState.Game.getCustomers());
        break;
      case GameplayBusinessEvents.BUSINESS_REMOVE_CUSTOMER:
        this.GameState.Game.deleteCustomers(1);
        this.customerText.setText('Customers ' + this.GameState.Game.getCustomers());
        break;
    }

    this.GameState.Game.updateCosts();
    this.costText.setText('Cost ' + this.GameState.Game.getCosts());
  }

  private updateDate(): void {
    console.log('updateDate');

    this.GameState.Game.updateDate();

    this.dateText.setText(this.GameState.Game.getDateString());

    console.log({clock: this.GameState.Game.getClock()});
  }
}
