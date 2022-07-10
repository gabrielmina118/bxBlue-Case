import PokemonData from "../data/PokemonData";
import { FieldsNotFound } from "../error/FieldsNotFound";
import { Pokemon, pokemonInfo, purchaseDTO } from "../model/Pokemon";
import axios from "axios"
import { UrlBase } from "../constants";
import IdGenerator from "../services/IdGenerator";
import Authenticator from "../services/Authenticator";
class PokemonBussines {

    constructor(
        private idGenerator: IdGenerator,
        private authenticator: Authenticator
    ) { }

    async history(token: string) {
        try {
            // const response = await axios.get("https://pro-api.coinmarketcap.com/v1/global-metrics/quotes/latest", {
            //     headers: {
            //         'X-CMC_PRO_API_KEY': "5d9f28d8-a4b7-49d1-bf79-5627f39dd6c6"
            //     }
            // })

            if (!token) {
                throw new FieldsNotFound()
            }

            const tokenData = this.authenticator.getTokenData(token)

            if (!tokenData) {
                throw new Error("Usuário não encontrado !")
            }

            const gethistory = await new PokemonData().getHistory(tokenData.id)

            return gethistory

        } catch (error: any) {
            console.log(error);
        }

    }

    async register(input: purchaseDTO, token: string) {

        if (!input.totalPurchase || !input.name) {
            throw new FieldsNotFound()
        }

        if (!token) {
            throw new FieldsNotFound()
        }

        const tokenData = this.authenticator.getTokenData(token)

        if (!tokenData) {
            throw new Error("Usuário não encontrado !")
        }

        const findPokemon = await this.getPokemon(input.name)


        const id = this.idGenerator.generatedId()


        const pokemon = new Pokemon(id, findPokemon.name, findPokemon.imagePokemon, input.totalPurchase)

        const pokemonData = new PokemonData()
        await pokemonData.registerPokemon(pokemon)
        const message = await pokemonData.registerPurchasePokemon(pokemon, tokenData.id)

        return message
    }

    async getPokemon(name: string): Promise<pokemonInfo> {
        try {
            const response = await axios.get(`${UrlBase}/${name}`)
            const pokemonInfo: pokemonInfo = {
                name: response.data.forms[0].name,
                imagePokemon: response.data.sprites.front_default
            }

            return pokemonInfo
        } catch (error: any) {
            throw new Error(`${error.response.statusText} ${name}`);

        }
    }
}

export default PokemonBussines