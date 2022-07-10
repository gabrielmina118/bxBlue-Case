import express from "express"
import InvestorController from "../controller/InvestorController"

export const investidorRouter = express.Router()

const investorController = new InvestorController()

investidorRouter.post("/create",investorController.createInvestor)
investidorRouter.post("/login",investorController.login)