import { Request, Response } from "express";
import InvestorBussines from "../bussines/InvestorBussines";
import { InvestorDTO, InvestorLoginDTO } from "../model/Investor";
import Authenticator from "../services/Authenticator";
import HashManager from "../services/HashManager";
import IdGenerator from "../services/IdGenerator";

class InvestorController {

    async createInvestor(req: Request, res: Response) {
        try {
            const { name, password ,email} = req.body

            const inputInvestor: InvestorDTO = {
                name,
                password,
                email
            }

            const token = await new InvestorBussines(
                new IdGenerator,
                new HashManager,
                new Authenticator
            ).createInvestor(inputInvestor)

            res.status(201).send({ token })
        } catch (error: any) {
            res.status(error.statusCode || 400).send({ message: error.message })
        }
    }

   async login(req: Request, res: Response){
    try {
        const { email,password} = req.body

        const inputInvestorLogin: InvestorLoginDTO = {
            password,
            email
        }

        const token = await new InvestorBussines(
            new IdGenerator,
            new HashManager,
            new Authenticator
        ).loginInvestor(inputInvestorLogin)

        res.status(201).send({ token })
    } catch (error: any) {
        res.status(error.statusCode || 400).send({ message: error.message })
    }
   }
}

export default InvestorController