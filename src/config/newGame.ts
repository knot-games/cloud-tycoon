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
      sysadmins: 0,
      servers: {
        1: 1
      },
      customers: 10,
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
    }
  }
  return gameState;
}
