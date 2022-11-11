// All levels together in a single state object
interface Levels {
    [id: number]: Level
}

// The configuration for default state for each level
interface Level {
    title: string; // Title of the level, use something from the cliche list: https://github.com/leereilly/list-of-english-cliches/blob/da24758a32b0c7fd5a08f15136cbf5db6f3b6e14/cliches.txt#L1190
    levelScene: string; // The name of the scene for this level, ex. "LevelOne"
    goal: number; // Monthly profit goal to progress to the next level
    number: number;
    story: string[];
    servers: {
        [id: number]: Server
    }
    customers: {
        [id: number]: Customer
    }
    events: {
        [id: number]: EventItem
    }
    developers: number; // The maximum number of developers available at this level
    facilities: {
        [id: number]: Facility
    }
    store: {
        [id: number]: StoreItem
    }
    research: {
        [id: number]: ResearchItem
    }
    products: {
        [id: number]: ProductItem
    }
}

// Server options available at this level
interface Server {
    name: string; // Name of the server, ex. "EconoBlock 1000"
    description: string; // Description of the server that will show up on the UI, ex. "The economy class server of the day"
    cost: number; // How much the server costs, ex. 1500
    monthlyCost: number; // Monthly maintenance cost, ex. 10
    capacity: number; // How many apps this server can run, ex. 50
    reliability: number; // Decimal multiplier to determine how often a server may go down and need maintenace, ex. 0.85
}

// Customers available at this level
interface Customer {
    name: string; // Name of the customer type, ex. "Small Business"
    maximum: number; // Maximum number of this customer type, ex. 5
    loyalty: number; // A decimal multipler to determine churn of this customer type, ex. 0.99
    joinRate: number; // Maximum number of customers of this type that will join each month, ex. 15
}

// Random events that may occur at this level
interface EventItem {
    name: string; // The title of the event that will show in the UI, ex. "Power Outage!"
    description: string; // Description text that will describe the event, ex. "Oh no! A power outage occurred causing and outage for your customers. Some of your customers left to competitors after the loss of confidence in your service."
    consequence: EventConsequence;
    likelihood: number; // The likelihood of this event occurring, ex. 0.05
}

// Which game item is targeted for an event
enum EventConsequenceTarget {
    customer = 1,
    server = 2,
    cash = 3
}

// The consequence result of the event
interface EventConsequence {
    amount: number; // The multiplier of impact on the event target, ex. 0.05 (customers that left)
    target: EventConsequenceTarget
}

// The facilities available at this level
interface Facility {
    name: string; // The title of this facility that shows up in the UI, ex. "Your garage"
    cost: number; // The monthly cost of this facility, ex. 1500
    capacity: number; // The maximum number of servers that can be stored at this facility, ex. 10
}

// Items that are purchasable at this level
interface StoreItem {
    name: string; // The title of the purchasable item that will appear in the store UI, ex. "Uninterruptible Power Supply (UPS)"
    description: string; // The description of the purchasable item that will appear in the store UI, ex. "You can use a UPS to improve the reliability of your servers when a power outage occurs, making your less vulnerable to short power outages."
    events: number[] // The ids of events that this will impact, ex. "[1]"
    consequence: number; // The number decrease in the likelihood that the event will occur once this item is purchased, ex. "-0.04"
    cost: number; // The cost of this item, could be total or per server, ex. 150
}

// Research options that are available at this level
interface ResearchItem {
    name: string; // The name of the research item that will appear in the UI, ex. "Auto-scaling Servers"
    description: string; // The description of the research item that will appear in the UI, ex. "Auto-scaling can be applied to your server-hosted products, allowing customers to automatically scale their service to accommodate demand and allowing you to charge more for your server hosted products."
    researchCostOptions: ResearchCost[]; // Different cost options to unlock this research item
    parent: number[] | null; // Parent research item that must be unlocked before this item is available, ex. [1, 5], null indicates the research is available without any other research being unlocked
}

// The different research cost options to complete research
interface ResearchCost {
    developers: number; // The number of developers that this research cost will take, ex. 5
    months: number; // The number of months it will take this number of developers to complete the research, ex. 10
}

// The products available to sell at this level
interface ProductItem {
    name: string; // The name of the product that will appear in the UI, ex. "Hosting"
    description: string; // The description of the product that will appear in the UI, ex. "A hosting service for customer apps"
    average: number; // The market average monthly cost of this item, used to calculate how much more or how little a user sets their product cost, ex. 50
    stdDev: number; // The standard deviation cost of this item, used to calculate how far away from the average a user sets their product cost from and as a multiplier to determine how many more or fewer users join based on the set cost, ex. 15
    researchId: number | null; // The research id number that must be unlocked for this product to be available to sell, null if the product is available without a research id, ex. 1
}
