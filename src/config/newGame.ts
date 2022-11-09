export const newGameState = () => {
  const gameState: GameState = {
    currentLevel: 1,
    playerBusiness: {
      name: null,
      money: 2000,
      revenue: 50,
      costs: 30,
      facility: 1,
      developers: 0,
      servers: {
        1: 1
      },
      customers: 1,
      products: {
        1: 50
      },
      research: {},
    },
    playerLevelState: {
      1: {
        hasWatchedIntro: false,
        hasCompletedLevel: false,
        monthsToCompleteLevel: null,
      }
    },
    store: {
      1: {
        purchased: false
      }
    },
    clock: {
      year: 0,
      month: 0,
      week: 0,
      day: 0,
    },
    settings: {
      music: true,
      soundEffects: true,
    }
  }
  return gameState;
}
