export class Pokemon {
    constructor(
        private id: string,
        private name: string,
        private image: string,
        private price :number
    ) { }

    public getId(): string {
        return this.id
    }

    public getName(): string {
        return this.name
    }

    public getImage(): string {
        return this.image
    }
    public getPrice():number{
        return this.price
    }
}

export interface purchaseDTO {
    totalPurchase: number,
    name: string
}

export interface pokemonInfo {
    name: string,
    imagePokemon: string
}