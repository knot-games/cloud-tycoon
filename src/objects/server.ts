export class Server {
	name: string;
	powered: boolean;

	constructor(name: string, powered: boolean) {
		this.name = name;
		this.powered = powered;
	}

	public toTexture(): string {
		return this.powered ? 'server-on' : 'server-off';
	}
}
