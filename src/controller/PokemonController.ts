import { Request, Response } from "express";
import PokemonBussines from "../bussines/PokemonBussines";
import { purchaseDTO } from "../model/Pokemon";
import Authenticator from "../services/Authenticator";
import IdGenerator from "../services/IdGenerator";

class PokemonController {

    async createPurchase(req: Request, res: Response) {
        try {
            const { totalPurchase } = req.body
            const name = req.params.name
            const token = req.headers.authorization!

            const purchaseDTO: purchaseDTO = {
                totalPurchase,
                name
            }

            const registerPurchase = await new PokemonBussines(new IdGenerator, new Authenticator).register(purchaseDTO, token)

            res.status(201).send({ message: registerPurchase })
        } catch (error: any) {
            res.status(error.statusCode || 400).send({ message: error.message })
        }
    }

    async getHistory(req:Request,res:Response){
        try {
            const token = req.headers.authorization!

            const history = await new PokemonBussines(new IdGenerator, new Authenticator).history(token)

            res.status(201).send(history)
        } catch (error: any) {
            res.status(error.statusCode || 400).send({ message: error.message })
        }
    }
}

export default PokemonController