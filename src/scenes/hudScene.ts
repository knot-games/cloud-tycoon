import { Business } from "../objects/business";
import { Clock } from "../objects/clock";
import eventCenter, { GameplayBusinessEvents, UIEvents } from "../events/eventCenter";

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
    active: false,
    key: 'HUDScene',
};

export class HUDScene extends Phaser.Scene {

    constructor() {
        super(sceneConfig);
    }

    private gameState: GameState;
    private playerBusiness: Business;
    private clock: Clock

    private dateText: Phaser.GameObjects.Text;
    private cashText: Phaser.GameObjects.Text;
    private costText: Phaser.GameObjects.Text;
    private customerText: Phaser.GameObjects.Text;

    public init(gameState: GameState): void {
        this.gameState = gameState;

        this.playerBusiness = new Business(gameState.playerBusiness);
        this.clock = new Clock();
    }

    public create(): void {
        this.add.text(50, 100, 'HUD Scene');

        // Create a text object to display the day
        this.dateText = this.add.text(50, 120, this.clock.getDateString());

        // Create a text object to display the money
        this.cashText = this.add.text(50, 140, "Cash " + this.playerBusiness.getCash());
        this.costText = this.add.text(50, 160, "Cost " + this.playerBusiness.getCosts());

        // Create a text object to display the customer count
        this.customerText = this.add.text(50, 180, "Customers " + this.playerBusiness.getCustomers());

        // Evey 5 seconds update the time
        this.time.addEvent({
            delay: 5000,
            callback: this.updateDate,
            callbackScope: this,
            loop: true
        });


        eventCenter.on(GameplayBusinessEvents.BUSINESS_UPDATE_CASH, this.updateCash, this);
        eventCenter.on(GameplayBusinessEvents.BUSINESS_UPDATE_COSTS, this.updateCosts, this);

        eventCenter.on(UIEvents.UI_UPDATE_COSTS, (data) => {
            console.log('UI_UPDATE_COSTS', data)
            this.updateCosts(data.event)
        }, this);

    }

    // Update the cash on the end of the month
    private updateCash(): void {
        console.log('updateCash');

        this.playerBusiness.updateCash();

        this.cashText.setText("Cash " + this.playerBusiness.getCash);
    }

    // Update the cost of the business on customer or server change
    private updateCosts(event: GameplayBusinessEvents): void {

        console.log('updateCosts', event);

        switch (event) {
            case GameplayBusinessEvents.BUSINESS_ADD_CUSTOMER:
                this.playerBusiness.setCustomers(1);
                this.customerText.setText("Customers " + this.playerBusiness.getCustomers());
                break;
            case GameplayBusinessEvents.BUSINESS_REMOVE_CUSTOMER:
                this.playerBusiness.deleteCustomers(1);
                this.customerText.setText("Customers " + this.playerBusiness.getCustomers());
                break;
            case GameplayBusinessEvents.BUSINESS_ADD_SERVER:
                // TODO add server
                break;
            case GameplayBusinessEvents.BUSINESS_REMOVE_SERVER:
                // TODO remove server
                break;
        }

        this.playerBusiness.updateCosts();

        this.costText.setText("Cost " + this.playerBusiness.getCosts());
    }

    private updateDate(): void {
        console.log('updateDate')

        this.clock.updateDate();

        this.dateText.setText(this.clock.getDateString());
    }


}