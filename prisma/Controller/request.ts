
import { PokemonClient } from "pokenode-ts";
import { ParsedUrlQuery } from "querystring";


export interface  PokInterface {
id: number,
name: string,
ability: string
stat: string,
}


export const api = new PokemonClient()
export const getPokemonByName = async ( param: string)  => {
    const nameParam = param.toString()
    const pokemon = await api.getPokemonByName(nameParam)
    const id = pokemon.id
    const name = pokemon.name
    const ability = pokemon.abilities[1].ability.name
    const stat = pokemon.stats[3].stat.name

    const result: PokInterface = { id, name, ability, stat };

    return result
}





