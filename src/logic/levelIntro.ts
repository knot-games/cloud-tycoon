import { colorPalette } from "../../assets/colorPalette";
import eventCenter, { ClockEvents, GameplayEvents } from "../events/eventCenter"
import { Game } from "../objects/game";
import { dialogModal } from "../ui/dialogModal";
import { modal } from "../ui/modal";

export const levelIntro = (scene: Phaser.Scene, introText: string[], levelNumber: number, game: Game) => {
    if (!game.hasPlayerViewedLevelIntro(levelNumber)) {
        // Pause the clock
        eventCenter.emit(ClockEvents.CLOCK_PAUSE);
        // Create a modal to view intro text
        dialogModal(scene, introText, () => {
            // Resume the clock
            eventCenter.emit(ClockEvents.CLOCK_RESUME);
            eventCenter.emit(GameplayEvents.GAMEPLAY_COMPLETE_LEVEL_INTRO, { levelNumber });
        });
    }
}
    