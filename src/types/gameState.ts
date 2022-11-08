// The current or default state of the game
interface GameState {
    currentLevel: number; // The current level a user is on, ex. 1
    playerBusiness: BusinessState;
    clock: ClockState;
    store: StoreState;
}

interface BusinessState {
    name: string; // The name of the business, ex. "John's Apps"
    money: number; // The current money a user has in the game, ex. 2000
    costs: number; // The current costs a user has, ex. 50
    revenue: number; // The current revenue a user is gaining, ex. 4500
    facility: number; // The id of  current facility a user is in, ex. 1, this may need to change to an array if we expand to multiple facilities in the future
    developers: number; // The current number of developers a user has hired, ex. 10
    sysadmins: number; // The current number of sysadmins a user has hired, ex. 2
    customers: number; // The current number of customers a user has, ex. 100
    servers: ServerState;
    products: ProductState;
    research: ResearchState;
}

interface ClockState {
    year: number; // The current year a user is in, ex. 2019
    month: number; // The current month a user is in, ex. 1
    week: number; // The current week a user is in, ex. 1
    day: number; // The current day a user is in, ex. 1
}

interface ServerState {
    [id: number]: number; // A mapping of the current number of this id of server that a user owns, ex. 1: 4
}

interface CustomerState {
    [id: number]: {
        count: number; // The number of this type of customer a user has, ex. 26
        apps: number; // The total number of apps for this type of customer, ex. 75
    }
}

interface ProductState {
    [id: number]: number; // The price that the user has set this product to, ex. 60, setting it too high will cause customers to leave faster, setting it too low will cause customers to join faster
}

interface ResearchState {
    [id: number]: {
        completed: boolean; // Whether this research item has been completed, ex. true,
        inProgress: boolean; // If this research item is currently in progress, ex. false
        developers: number; // The number of developers assigned to this research item, ex. 10
        remainingMonths: number; // The months remaining on this research item at this number of developers, ex. 8
    }
}

interface StoreState {
    [id: number]: {
        purchased: boolean; // Whether this item has been purchased or not, ex. true
    }
}
