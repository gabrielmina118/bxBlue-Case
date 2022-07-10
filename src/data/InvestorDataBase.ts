import { Investor } from "../model/Investor";
import { BaseDataBase } from "./BaseDataBase";

export class InvestorDataBase extends BaseDataBase {

    private static TABLE_NAME = "Investor"

    public async createInvestor(investor: Investor): Promise<void> {
        try {
            await this.getConnection().insert({
                id: investor.getId(),
                name: investor.getName(),
                email: investor.getEmail(),
                password: investor.getPassword()
            })
                .into(InvestorDataBase.TABLE_NAME)

        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    public async getInvestor(email: string): Promise<Investor | undefined> {
        try {
            const [result] = await this.getConnection().select("*").from(InvestorDataBase.TABLE_NAME).where({ email })


            if (result) {
                return Investor.InvestorModel(result)
            } else {
                return undefined
            }

        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }
}