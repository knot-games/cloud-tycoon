import { colorPalette } from "../../assets/colorPalette";
import { getColorInt } from "../utilities/colors";
import { getSettings, saveSettings } from "../utilities/localStorage";

const backgroundColor = getColorInt(colorPalette.darkPurpleish);
const accentColor = getColorInt(colorPalette.periwinkle);
const closeButtonColor = 'white';
const availableSettings = {
    music: "Play music",
    soundEffects: "Play sound effects"
}
const checkedUnicode = '\uf14a ';
const uncheckedUnicode = '\uf0c8 ';

export const SettingsModalPlugin = function (scene: Phaser.Scene) {
    this.scene = scene;
    this.systems = scene.sys;
    if (!scene.sys.settings.isBooted) {
      scene.sys.events.once('boot', this.boot, this);
    }
};

// Register this plugin with the PluginManager
SettingsModalPlugin.register = function (PluginManager) {
    PluginManager.register('SettingsModalPlugin', SettingsModalPlugin, 'settingsModal');
  };

SettingsModalPlugin.prototype = {
    boot: function () {
        this.systems.events.on('shutdown', this.shutdown, this);
        this.systems.events.on('destroy', this.destroy, this);
    },

    shutdown: function () {
    },

    destroy: function () {
        this.shutdown();
        this.scene = undefined;
    },

    init: function (options) {
        if (!options) {
            options = {};
        }
        this.borderThickness = options.borderThickness || 3;
        this.borderColor = options.borderColor || accentColor;
        this.borderAlpha = options.borderAlpha || 1;
        this.windowAlpha = options.windowAlpha || 0.98;
        this.windowColor = options.windowColor || backgroundColor;
        this.windowHeight = options.windowHeight || 600;
        this.padding = options.padding || 32;
        this.closeBtnColor = options.closeBtnColor || closeButtonColor;

        // if the settings window is shown
        this.visible = true;
        this.graphics;
        this.closeBtn;

        // Get settings
        this.currentSettings = getSettings();
        
        // Create the settings window
        this._createWindow();
    },

    // Gets the width of the game (based on the scene)
    _getGameWidth: function () {
        return this.scene.sys.game.config.width;
    },

    // Gets the height of the game (based on the scene)
    _getGameHeight: function () {
        return this.scene.sys.game.config.height;
    },

    // Calculates where to place the settings window based on the game size
    _calculateWindowDimensions: function (width, height) {
        var x = this.padding;
        var y = this.padding;
        var rectWidth = width - (this.padding * 2);
        var rectHeight = height - (this.padding * 2);
        return {
        x,
        y,
        rectWidth,
        rectHeight
        };
    },

    // Creates the inner settings window (where the text is displayed)
    _createInnerWindow: function (x, y, rectWidth, rectHeight) {
        this.graphics.fillStyle(this.windowColor, this.windowAlpha);
        this.graphics.fillRect(x + 1, y + 1, rectWidth - 1, rectHeight - 1);
    },

    // Creates the border rectangle of the settings window
    _createOuterWindow: function (x, y, rectWidth, rectHeight) {
        this.graphics.lineStyle(this.borderThickness, this.borderColor, this.borderAlpha);
        this.graphics.strokeRect(x, y, rectWidth, rectHeight);
    },

     // Creates the close settings window button
     _createCloseModalButton: function () {
        var self = this;
        this.closeBtn = this.scene.make.text({
        x: this._getGameWidth() - this.padding - 14,
        y: this.padding + 3,
        z: 1,
        text: 'X',
        style: {
            font: 'bold 12px Arial',
            fill: this.closeBtnColor
        }
        });
        this.closeBtn.setInteractive({ useHandCursor: true });
        this.closeBtn.on('pointerover', function () {
            this.setTint(accentColor);
        });
        this.closeBtn.on('pointerout', function () {
            this.clearTint();
        });
        this.closeBtn.on('pointerdown', function () {
            self.toggleWindow();
        });
    },

    // Creates the close settings button border
    _createCloseModalButtonBorder: function () {
        var x = this._getGameWidth() - this.padding - 20;
        var y = this.padding;
        this.graphics.strokeRect(x, y, 20, 20);
    },

    // Hide/Show the settings window
    toggleWindow: function () {
        this.visible = !this.visible;
        if (this.text) this.text.visible = this.visible;
        if (this.graphics) this.graphics.visible = this.visible;
        if (this.closeBtn) this.closeBtn.visible = this.visible;
    },

    _addTitle: function () {
        const x = this._getGameWidth() / 2;
        const y = this.padding + 50;
        this.scene.make.text({
            x,
            y,
            text: 'Settings',
            style: {
                font: 'bold 36px Arial',
                fill: this.closeBtnColor,
                align: 'center',
            }
        }).setOrigin(0.5, 0.5);
    },

    _setSettings: function () {
        const x = (this._getGameWidth() - (this.padding * 2)) / 2;
        let y = this.padding + 120;

        const saveSetting = (key, newValue) => {
            this.currentSettings[key] = newValue;
            saveSettings(this.currentSettings);
        }

        for (const [key, value] of Object.entries(availableSettings)) {
            let currentSetting = this.currentSettings[key];
            const checkbox = this.scene.make.text({
                x: x - 32,
                y,
                text: currentSetting ? checkedUnicode : uncheckedUnicode,
                style: {
                    font: 'bold 16px FontAwesome',
                    fill: this.closeBtnColor,
                    align: 'center',
                }
            }).setInteractive({ useHandCursor: true });
            checkbox.on('pointerover', function () {
                this.setTint(accentColor);
            });
            checkbox.on('pointerout', function () {
                this.clearTint();
            });
            checkbox.on('pointerdown', function () {
                saveSetting(key, !currentSetting);
                currentSetting = !currentSetting;
            });
            this.scene.make.text({
                x,
                y,
                text: value,
                style: {
                    font: 'bold 16px Arial',
                    fill: this.closeBtnColor,
                }
            });
            y += 30;
        }
    },

    // Creates the settings window
    _createWindow: function () {
        var gameHeight = this._getGameHeight();
        var gameWidth = this._getGameWidth();
        var dimensions = this._calculateWindowDimensions(gameWidth, gameHeight);
        this.graphics = this.scene.add.graphics();
        this._createOuterWindow(dimensions.x, dimensions.y, dimensions.rectWidth, dimensions.rectHeight);
        this._createInnerWindow(dimensions.x, dimensions.y, dimensions.rectWidth, dimensions.rectHeight);
        this._createCloseModalButton();
        this._createCloseModalButtonBorder();
        this._addTitle();
        this._setSettings();
    },
};