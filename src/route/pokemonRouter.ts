import express from "express"
import PokemonController from "../controller/PokemonController"

export const pokemonRouter = express.Router()

const pokemonController = new PokemonController()

pokemonRouter.post("/purchase/:name",pokemonController.createPurchase)
pokemonRouter.get("/history",pokemonController.getHistory)