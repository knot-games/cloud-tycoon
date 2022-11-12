import { levels } from '../config/levels';
import eventCenter, { ClockEvents, GameplayBusinessEvents, GameplayEvents, GameplayRandomEvents, UIEvents } from '../events/eventCenter';
import { progressMonth } from '../logic/progression';
import { getGameWidth, getGameHeight, getColorInt, destroyAll} from '../helpers';
import { BaseScene } from './baseScene';
import { colorPalette } from '../../assets/colorPalette';
import { gameConfig } from '../config/game';
import { dialogModal } from '../ui/dialogModal';
import { hudMenu } from '../ui/hudMenu';

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
  private profitText: Phaser.GameObjects.Text;
  private serverText: Phaser.GameObjects.Text;
  private companyNameText: Phaser.GameObjects.Text;
  private menuOpen: boolean = false;
  private menu: any[];

  private customerText: Phaser.GameObjects.Text;

  public init(): void {
    console.log("HUDScene init");
    this.GameState.updateGameState();
    if (this.GameState.Game.getIsPaused() && !this.GameState.Game.getIsNewGame()) {
      this.GameState.Game.unPauseClock();
    }
  }

  public create(): void {
    // Menu Bar
    this.add.rectangle(0, getGameHeight(this) - 40, getGameWidth(this), 40, getColorInt(colorPalette.menuBar)).setOrigin(0, 0);
    this.dateText = this.add.text(getGameWidth(this) - 216, getGameHeight(this) - 28, this.GameState.Game.getDateString(), {
      color: colorPalette.black,
      align: 'left'
    });
    this.companyNameText = this.add.text(44, getGameHeight(this) - 28, this.GameState.Game.getName(), {
      color: colorPalette.black,
      align: 'left'
    });
    // Menu Bar Button
    this.add.rectangle(0, getGameHeight(this) - 40, 40, 40, getColorInt(colorPalette.blue)).setOrigin(0, 0).setInteractive({ useHandCursor: true }).on('pointerdown', () => {
      this.menuOpen = !this.menuOpen;
      this.toggleMenu();
    });
    this.add.image(20, getGameHeight(this) - 20, 'cloud').setOrigin(0.5, 0.5)

    // Monthly Profit
    this.add.image(36, 36, 'pinkCoin').setScale(2.5);
    this.profitText = this.add.text(60, 20, '$' + this.GameState.Game.getProfit() + '/mo', {
      fontSize: '20px',
      fontStyle: 'bold',
      color: colorPalette.white,
    });
    this.add.text(60, 40, 'Monthly Profit', {
      fontSize: '12px',
      fontStyle: 'bold',
      color: colorPalette.lightPink
    });

    // Cash Available
    this.add.image(36, 84, 'blueBag').setScale(2.5);
    this.cashText = this.add.text(60, 68, '$' + this.GameState.Game.getCash(), {
      fontSize: '20px',
      fontStyle: 'bold',
      color: colorPalette.white,
    });
    this.add.text(60, 88, 'Cash Available', {
      fontSize: '12px',
      fontStyle: 'bold',
      color: colorPalette.blue
    });

    // Monthly Costs
    this.add.image(36, 128, 'bolt').setScale(2.5);
    this.costText = this.add.text(60, 112, '$' + this.GameState.Game.getCosts() + '/mo', {
      fontSize: '20px',
      fontStyle: 'bold',
      color: colorPalette.white,
    });
    this.add.text(60, 132, 'Operating Costs', {
      fontSize: '12px',
      fontStyle: 'bold',
      color: colorPalette.salmon
    });

    // Servers
    this.add.image(36, 172, 'monitor').setScale(2.5);
    this.serverText = this.add.text(60, 156, this.GameState.Game.getServerNumber().toString(), {
      fontSize: '20px',
      fontStyle: 'bold',
      color: colorPalette.white,
    });
    this.add.text(60, 176, 'Server Instances', {
      fontSize: '12px',
      fontStyle: 'bold',
      color: colorPalette.yellow
    });

    // Customers
    this.add.image(36, 216, 'periwinklePerson').setScale(2.5);
    this.customerText = this.add.text(60, 200, this.GameState.Game.getCustomers().toString(), {
      fontSize: '20px',
      fontStyle: 'bold',
      color: colorPalette.white,
    });
    this.add.text(60, 220, 'Customers', {
      fontSize: '12px',
      fontStyle: 'bold',
      color: colorPalette.periwinkle
    });

    // Evey 5 seconds update the time
    this.time.addEvent({
      delay: gameConfig.dayLength,
      callback: this.updateDate,
      callbackScope: this,
      loop: true,
    });
  
    eventCenter.on(ClockEvents.CLOCK_PAUSE, () => this.GameState.Game.pauseClock(), this);
    
    eventCenter.on(ClockEvents.CLOCK_RESUME, () => this.GameState.Game.unPauseClock(), this);
    
    eventCenter.on(GameplayEvents.GAMEPLAY_COMPLETE_LEVEL_INTRO, ({ levelNumber }) => { this.GameState.Game.completeLevelIntro(levelNumber); }, this);

    eventCenter.on(GameplayEvents.GAMEPLAY_GAME_UPDATED, () => {
      this.GameState.updateGameState();
    })

    eventCenter.on(ClockEvents.CLOCK_MONTH_END, () => {
      progressMonth(this.GameState.Game, levels[this.GameState.Game.getCurrentLevel()]);

      this.cashText.setText('$' + this.GameState.Game.getCash());
      this.customerText.setText(this.GameState.Game.getCustomers().toString());
      this.costText.setText('$' + this.GameState.Game.getCosts() + '/mo');
      this.profitText.setText('$' + this.GameState.Game.getProfit() + '/mo');
    })

    eventCenter.on(GameplayRandomEvents.RANDOM_EVENT, (randomEvent: EventItem) => {
      console.log("An event occurred!");
      dialogModal(this, [randomEvent.name, randomEvent.description], () => {
        this.GameState.Game.handleEventConsequence(randomEvent.consequence)
        eventCenter.emit(ClockEvents.CLOCK_RESUME);
        this.cashText.setText('$' + this.GameState.Game.getCash());
        this.customerText.setText(this.GameState.Game.getCustomers().toString());
        this.profitText.setText('$' + this.GameState.Game.getProfit() + '/mo');
      });
    })
  }

  private updateDate(): void {
    this.GameState.Game.updateDate();

    this.dateText.setText(this.GameState.Game.getDateString());
  }

  private toggleMenu(): void {
    if (this.menuOpen) {
      this.menu = hudMenu(this)
      this.GameState.Game.pauseClock();
    } else {
      if (this.menu) {
        destroyAll(this, this.menu);
        this.GameState.Game.unPauseClock();
      }
    }
    
  }
}
