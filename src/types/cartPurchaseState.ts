// The purchase state of a cart purchase
interface CartPurchaseState {
    servers: {
        [id: number]: number; // The number of servers of this id that the user is purchasing, ex. 1: 4
    },
    storeItems: {
        [id: number]: number; // The number of store items of this id that the user is purchasing, ex. 2: 1
    },
    totalCost: number; // The total price of the cart purchase
}