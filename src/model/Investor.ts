export class Investor {
    constructor(
        private id: string,
        private name: string,
        private password:string,
        private email:string
    ) { }

    public getId():string{
        return this.id
    }

    public getName():string{
        return this.name
    }
    public getPassword():string{
        return this.password
    }

    public getEmail():string{
        return this.email
    }

    static InvestorModel(data:any):Investor{
        return new Investor(data.id,data.name,data.password,data.email)
    }
}

export interface InvestorLoginDTO{
    email:string,
    password:string,
}

export interface InvestorDTO extends InvestorLoginDTO{
    name:string
}