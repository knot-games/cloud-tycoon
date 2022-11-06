interface ISettings {
    getSetting(setting: string): boolean;
    getSettingText(setting: string): string;
    getMusicEnabled(): boolean;
    getSoundEffectsEnabled(): boolean;
    toggleMusic(): void;
    toggleSoundEffects(): void;
}