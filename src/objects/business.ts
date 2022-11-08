export class Business implements IBusiness {

    private name: string | null;
    private cash: number;
    private costs: number;
    private revenue: number;
    private facility: number;
    private servers: ServerState;
    private customers: number;
    private developers: number;
    private sysadmins: number;
    private products: ProductState;
    private research: ResearchState;

    constructor(businessState: BusinessState) {
        this.name = businessState.name;
        this.cash = businessState.money;
        this.costs = businessState.costs;
        this.revenue = businessState.revenue;
        this.facility = businessState.facility;
        this.servers = businessState.servers;
        this.customers = businessState.customers;
        this.developers = businessState.developers;
        this.sysadmins = businessState.sysadmins;
        this.products = businessState.products;
        this.research = businessState.research;
    }

    public getName(): string | null {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public getCash(): number {
        return this.cash;
    }

    public setCash(money: number): void {
        this.cash = money;
    }

    public getRevenue(): number {
        return this.revenue;
    }

    public setRevenue(): void {
        this.revenue = 0;
    }

    public getCosts(): number {
        return this.costs;
    }

    public setCost(cost: number): void {
        this.costs = cost;
    }

    public getFacility(): number {
        return this.facility;
    }

    public setFacility(facility: number): void {
        this.facility = facility;
    }

    public getServers(): ServerState {
        return this.servers;
    }

    public setServers(servers: ServerState): void {
        this.servers = servers;
    }

    public getCustomers(): number {
        return this.customers;
    }

    public getPlayerBusinessState(): BusinessState {
        const businessState: BusinessState = {
            name: this.name,
            money: this.cash,
            revenue: this.revenue,
            costs: this.costs,
            facility: this.facility,
            servers: this.servers,
            customers: this.customers,
            developers: this.developers,
            sysadmins: this.sysadmins,
            products: this.products,
            research: this.research,
        };
        return businessState;
    }

    public setCustomers(amount: number): void {
        this.customers += amount;
    }

    public deleteCustomers(amount: number): void {
        this.customers -= amount;
    }

    public updateCosts(): void {
        this.costs = this.calculateCost();
    }

    public updateCash(): void {
        // we should take the current cash and subtract the cost of business
        this.cash = this.cash - this.costs;
    }

    private calculateCost(): number {
        // Don't recalculate every time, just when a customer is added or removed
        var customerCosts = this.customers * 10;

        var serverCosts = this.servers[1];

        return customerCosts;
    }

}
