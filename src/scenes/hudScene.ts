import eventCenter, { ClockEvents, GameplayBusinessEvents, UIEvents } from '../events/eventCenter';
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

    console.log(this.GameState);

    // Create a text object to display the day
    this.dateText = this.add.text(50, 120, this.GameState.Clock.getDateString());

    // Create a text object to display the money
    this.cashText = this.add.text(50, 140, 'Cash ' + this.GameState.PlayerBusiness.getCash());
    this.costText = this.add.text(50, 160, 'Cost ' + this.GameState.PlayerBusiness.getCosts());

    // Create a text object to display the customer count
    this.customerText = this.add.text(50, 180, 'Customers ' + this.GameState.PlayerBusiness.getCustomers());

    // Evey 5 seconds update the time
    this.time.addEvent({
      delay: 5000,
      callback: this.updateDate,
      callbackScope: this,
      loop: true,
    });

    eventCenter.on(ClockEvents.CLOCK_WEEK_END, this.updateCash, this);

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

    this.GameState.PlayerBusiness.updateCash();

    this.cashText.setText('Cash ' + this.GameState.PlayerBusiness.getCash());
  }

  // Update the cost of the business on customer or server change
  private updateCosts(event: GameplayBusinessEvents): void {
    console.log('updateCosts', event);
    switch (event) {
      case GameplayBusinessEvents.BUSINESS_ADD_CUSTOMER:
        this.GameState.PlayerBusiness.setCustomers(1);
        this.customerText.setText('Customers ' + this.GameState.PlayerBusiness.getCustomers());
        break;
      case GameplayBusinessEvents.BUSINESS_REMOVE_CUSTOMER:
        this.GameState.PlayerBusiness.deleteCustomers(1);
        this.customerText.setText('Customers ' + this.GameState.PlayerBusiness.getCustomers());
        break;
    }

    this.GameState.PlayerBusiness.updateCosts();
    this.costText.setText('Cost ' + this.GameState.PlayerBusiness.getCosts());
  }

  private updateDate(): void {
    console.log('updateDate');

    this.GameState.Clock.updateDate();

    this.dateText.setText(this.GameState.Clock.getDateString());

    console.log(this.GameState.Clock);
  }
}
