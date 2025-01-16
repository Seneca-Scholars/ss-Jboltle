import prisma from "../prisma/ ./prisma"
import { getPokemonByName, PokInterface } from "../Controller/request"
import { api } from "../Controller/request"


export const getAllInfo = async () => {

const allInfo = await prisma.pokemon.findMany({})
return allInfo
}

export const deletePokemonInfo = async (id: number) => {
    const deletePokemonInfo = await prisma.pokemon.delete({
        where:{id: id}
    })
    deletePokemonInfo
}
export const createNewPokemon = async (data: PokInterface) : Promise<void>=>  {
    

 await prisma.pokemon.create({
        data: {
            id: data.id,
            name: data.name,
            ability: data.ability,
            stats: data.stat
        }
    })



}

export const updatePokemonInfoId = async (id: number,  data:PokInterface ) => {

    const updatePokemon =   await prisma.pokemon.update({
        where:{
            id: id
        },

        data:{
            name: data.name,
            ability: data.ability,
            stats: data.stat

        }
    })
    updatePokemon

}
   
export const updatePokemonInfoName = async (name: string,  data:PokInterface ) => {
const id = await getPokemonByName(name) 

    const updatePokemon =   await prisma.pokemon.update({
        where:{

            id: id.id
                },

        data:{
            name:data.name,
            ability: data.ability,
            stats: data.stat

        }
    })
    updatePokemon

}
   