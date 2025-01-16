import express from 'express'
import { PokemonController } from './Controller/Controller'




export const server = express()

server.use(express.urlencoded({extended: true}))


server.use(express.json())



server.use("/pokemon", PokemonController)



server.listen(3000 , ()=> {
    console.log("Listening on http://localhost:3000")
} )


