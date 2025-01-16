import express, { Request, Response } from "express";
import * as PokemonService from "../Service/Service";
import { getPokemonByName, PokInterface } from "./request";
import { api } from "./request";




export const PokemonController = express.Router();

PokemonController.get("/all", async (req: Request, res: Response) => {
  const pokemon = await PokemonService.getAllInfo();

  res.status(200)
    ? res.json({
        message: "data retrieved",
        data: pokemon,
      })
    : res.json({ message: "Error getting all info about this pokemon}" });
    })
PokemonController.get("/:name", async (req: Request, res: Response) => {
  const name = req.params.name as string;
console.log(name)
  const result = await api.getPokemonByName(name);
  res.status(200) ? res.json({ message: "Data retrieved", data: result }) : res.json({ message: "Error getting by name" });
});

PokemonController.post("/create/:name", async (req: Request, res: Response) => {
  try {
    
    const name = req.params.name as string;
  console.log(name);
  const pokeData = await getPokemonByName(name);
  const data = await PokemonService.createNewPokemon(pokeData);

  res.status(200)
    ? res.json({
        message: "Pokemon put in Database",
        data: data,
      })
    : res.json({
        message: "error adding to database",
      });
    
    } 
    catch (error)  { 

      console.log(error)
    }
    })

PokemonController.put("/update/:id", async (req: Request, res: Response) => {
  const updateData : PokInterface = req.body 
  console.log(updateData)
const id =  parseInt(req.params.id)

console.log(id)


  try {
    const updatedPokemon = await PokemonService.updatePokemonInfoId(id , updateData);

    res.status(200).json({
      message: "Pokemon updated successfully",
      data: updatedPokemon,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error updating Pokemon",
    });
  }
});
PokemonController.put("/update/:name", async (req: Request, res: Response) => {
  const name = req.params.name as string
  const updateData : PokInterface = req.body 
console.log(updateData)
  try {
    const updatedPokemon = await PokemonService.updatePokemonInfoName(name , updateData);

    res.status(200).json({
      message: "Pokemon updated successfully",
      data: updatedPokemon,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error updating Pokemon",
    });
  }
});

PokemonController.delete("/delete/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const deletePokemon = await PokemonService.deletePokemonInfo(id);

  res.status(200)
    ? res.json({
        message: `Pokemon removed from Database at id: ${id}`,
        data: deletePokemon
      })
    : res.json({
        message: "Pokemon not in database",
      });
});
