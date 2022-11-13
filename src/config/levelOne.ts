export const LevelOne: Level = {
    title: "Just Getting Started",
    levelScene: "LevelOne",
    goal: 5000,
    number: 1,
    story: ["You have recently started self-hosting your favorite game, SphereCraft, and have some extra space on your rig to spare. You have an idea to offer server space to others to make some extra cash (which would be nice, as you are currently crashing in your parents' basement).", "You have started a site to offer space on your server for folks looking to host basic websites. As you earn money, hire employees, and expand your cloud offerings, you can slowly amass your own cloud empire!"],
    servers: {
        1: {
            name: "Econoblock 1000",
            description: "The economy class server of the day.",
            cost: 1500,
            monthlyCost: 30,
            capacity: 50,
            reliability: 0.95,
            maximum: 10
        }
    },
    customers: {
        1: {
            name: "Small Business",
            maximum: 1000,
            loyalty: 0.99,
            joinRate: 5
        }
    },
    events: {
        1: {
            name: "Absolute power corrupts absolutely",
            description: "Oh no! A power outage occurred causing an outage for your customers. Some of your customers left to competitors after the loss of confidence in your service.",
            consequence: {
                amount: 0.05,
                target: "CUSTOMER"
            },
            likelihood: 0.05
        },
        2: {
            name: "Playing with fire",
            description: "Oh no! Your servers caused a small fire in the garage and your parents are pissed! You have to pay some cash for the deductible to your parents' insurance.",
            consequence: {
                amount: 0.30,
                target: "CASH"
            },
            likelihood: 0.05
        }
    },
    developers: 0,
    facilities: {
        1: {
            name: "Your Parents' Garage",
            cost: 0
        }
    },
    store: {
        1: {
            name: "Uninterruptible Power Supply (UPS)",
            description: "Use to improve the reliability of your servers during power outages.",
            events: [1],
            consequence: -0.03,
            cost: 150
        },
        2: {
            name: "Smoke Detector",
            description: "Use to detect fires and prevent them from spreading.",
            events: [2],
            consequence: -0.05,
            cost: 100
        }
    },
    research: {},
    products: {
        1: {
            name: "Website Hosting",
            description: "A hosting service for simple customer websites.",
            average: 50,
            stdDev: 15,
            researchId: null
        }
    }
}
