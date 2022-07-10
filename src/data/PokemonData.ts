import { Pokemon } from "../model/Pokemon";
import { BaseDataBase } from "./BaseDataBase";

class PokemonData extends BaseDataBase {

    private static TABLE_NAME = "pokemon"
    private static TABLE_NAME_REGISTER = "purchase_pokemon"

    async getHistory(id: string) {
        try {
            const getPurchase = await this.getConnection().raw(`
            select pokemon.* from purchase_pokemon inner join pokemon
            on purchase_pokemon.id_pokemon = pokemon.id
            inner join Investor
            on Investor.id = purchase_pokemon.id_investor
            where purchase_pokemon.id_investor = "${id}"
            `)

          
            return getPurchase[0]
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    async registerPokemon(pokemon: Pokemon): Promise<string> {
        try {
            await this.getConnection().insert({
                id: pokemon.getId(),
                name: pokemon.getName(),
                image: pokemon.getImage(),
                price: pokemon.getPrice()
            })
                .into(PokemonData.TABLE_NAME)

            return `Pokemon register successfully`

        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    async registerPurchasePokemon(pokemon: Pokemon, id: string): Promise<string> {
        try {
            await this.getConnection().insert({
                id_investor: id,
                id_pokemon: pokemon.getId(),
                total_purchase: pokemon.getPrice(),
            })
                .into(PokemonData.TABLE_NAME_REGISTER)

            return `Pokemon register successfully`

        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }
}

export default PokemonData