interface IBusiness {
    getName(): string;
    getCash(): number;
    getRevenue(): number;
    getCosts(): number;
    getFacility(): number;
    getCustomers(): number;
    getServers(): ServerState;
    setName(name: string): void;
    setFacility(facility: number): void;
    setServers(servers: ServerState): void;
    setCustomers(amount: number): void;
    deleteCustomers(amount: number): void;
}