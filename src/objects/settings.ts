export class Settings implements ISettings {

    private music: boolean;
    private soundEffects: boolean;

    constructor(settingsState: PlayerSettingsState) {
        this.music = settingsState.music;
        this.soundEffects = settingsState.soundEffects;
    }

    public getSetting(setting: string): boolean {
        switch (setting) {
            case "music":
                return this.music;
            case "soundEffects":
                return this.soundEffects;
            default:
                return false;
        }
    }

    public getSettingText(setting: string): string {
        switch (setting) {
            case "music":
                return "Play music";
            case "soundEffects":
                return "Play sound effects";
            default:
                return "";
        }
    }
    
    public getMusicEnabled(): boolean {
        return this.music;
    }

    public getSoundEffectsEnabled(): boolean {
        return this.soundEffects
    }

    public toggleMusic() {
        this.music = !this.music;
    }

    public toggleSoundEffects(): void {
        this.soundEffects = !this.soundEffects;
    }
}
