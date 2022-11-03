export const LevelOne: Level = {
    title: "Just Getting Started",
    goal: 5000,
    servers: {
        1: {
            name: "Econoblock 1000",
            description: "The economy class server of the day",
            cost: 1500,
            monthlyCost: 30,
            capacity: 50,
            reliability: 0.85
        }
    },
    customers: [
        {
            name: "Small Business",
            maximumApps: 50,
            loyalty: 0.99,
            joinRate: 5
        }
    ],
    events: {
        1: {
            name: "Power Outage!",
            description: "Oh no! A power outage occurred causing and outage for your customers. Some of your customers left to competitors after the loss of confidence in your service.",
            consequence: {
                amount: 0.05,
                target: 1
            }
        }
    },
    developers: 0,
    sysadmins: 0,
    facilities: {
        1: {
            name: "Your Garage",
            cost: 1500,
            capacity: 10
        }
    },
    store: {
        1: {
            name: "Uninterruptible Power Supply (UPS)",
            description: "You can use a UPS to improve the reliability of your servers when a power outage occurs, making your less vulnerable to short power outages.",
            events: [1],
            consequence: -0.03,
            cost: 150
        }
    },
    research: {},
    products: {
        1: {
            name: "App Hosting",
            description: "A hosting service for customer apps",
            average: 50,
            stdDev: 15,
            researchId: null
        }
    }
}