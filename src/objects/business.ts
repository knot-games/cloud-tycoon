export class Business {
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

  constructor(name = '', cash = 2000, revenue = 0, costs = 0, facility = 1, customers = 0) {
    this.name = name;
    this.cash = cash;
    this.costs = costs;
    this.revenue = revenue;
    this.facility = facility;
    this.customers = customers;
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

    this.revenue = this.calculateRevenue();

    this.cash = (this.cash + this.revenue) - this.costs;
  }

  private calculateRevenue(): number {
    const customerRevenue = this.customers * 2;

    return customerRevenue;
  }

  private calculateCost(): number {
    const customerCosts = this.customers * 10;

    return customerCosts;
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

}
