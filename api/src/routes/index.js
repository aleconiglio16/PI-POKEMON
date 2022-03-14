// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const { Router } = require('express');
const  axios  = require("axios");
const { Pokemon, Type } = require ("../db.js")
const router = Router();
const {getApiPokemon, 
       getDbPokemon, 
       pokemonTypes,
       getPokemonId,
       getNameApiPokemon,
       getNameDbPokemon } = require ("./functions.js")
       
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

/* async function totalPokemon () {
    try{
        const infoApiPokemon = await getApiPokemon()
        const infoDbPokemon = await getDbPokemon()
        const allPokemons = infoApiPokemon.concat(infoDbPokemon);
        return allPokemons;
    } catch (e) {
        console.log("error: totalPokemon " + e)
    }
} 
 */

router.get("/", async (req, res) => {
    const name = req.query.name;
    try{        
        if(name) {
            const pokeName = name.toLowerCase()
            const nameApi = await getNameApiPokemon(pokeName)
            if(!nameApi){
                const nameDb = await getNameDbPokemon(pokeName)
                if(nameDb){
                    res.json(nameDb)
                }   else {
                    res.status(400)
                }
            }   res.json(nameApi)
            } else {
                const infoApiPokemon = await getApiPokemon()
                const infoDbPokemon = await getDbPokemon()
                const allPokemons = infoApiPokemon.concat(infoDbPokemon);
                res.json(allPokemons)
            }
    } catch (e) {
        console.log("error: No se encontro" + e )
    } 
});

router.get("/types", async (req, res) =>{

  try{
      const types = await pokemonTypes();
      res.json(types)
  } catch (e) {
      console.log("error: Tipo no encontrado " + e )
  }
})


router.post("/", async (req, res) =>{
    try{
    const { name, speed, urlImage, attack, defense, weight, height, hp, types } = req.body

    const pokeCreate = await Pokemon.create({
        name, speed, attack, defense, weight, height, hp, urlImage
    })

    const typeDb = await Type.findAll({
        where: { name: types }
    })
    console.log(typeDb)
// el add es un metodo de sequalize que lo que hace es traerme de la tabla, la propiedad que le paso 
    pokeCreate.addType(typeDb)
    res.send("Pokemon creado correctamente")

    } catch (e) {
        console.log("Error en la creacion de pokemon" + e)
    }
})

 
router.get("/id/:id", async (req, res) => {

    const id = req.params.id;
    const allIds = await getPokemonId(id);
    allIds
    ? res.json(allIds)
    : res.status(404).send("ERROR")
})


module.exports = router;
