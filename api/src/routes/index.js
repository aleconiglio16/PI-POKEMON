// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const { Router } = require('express');
const  axios  = require("axios");
const { Pokemon, Type } = require ("../db.js")
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


// informacion de los pokemon desde la api y la db

const getApiPokemon = async () => {
    try {
        let pokeArray = [];
        for( let i = 1; i <= 40; i++){
            pokeArray.push(await axios.get("https://pokeapi.co/api/v2/pokemon/" + i))
        }
       
        return await Promise.all(pokeArray)
        .then(e => {
             const pokemon = e.map((e) => {
                return ({
                    id: e.data.id,
                    name: e.data.name,
                    urlImage: e.data.sprites.other.home.front_default,
                    types: e.data.types.map((e) => e.type.name),
                    attack: e.data.stats[1].base_stat,
                    });

                }); 
                return pokemon;
        }   )
        }catch (e) {
        console.log("error: getApiPokemon " + e);
    }
}

 const getDbPokemon = async () => {
    try {
        const pokemon = await Pokemon.findAll({
            include: {
                model: Type,
                through: {
                    attributes: [],
                },
            },
            //attributes: ["name", "id", "urlImage", "attack", "createInDb"]
        });
        return pokemon.map((e) => ({
            id: e.id,
            name: e.name,
            urlImage: e.image,
            attack: e.attack,
            createInDb: e.createInDb,
            types: e.types.map(e=> e.name)
        }));
    } catch (e) {
        console.log("error: getDbPokemon " + e);
    }
}

async function totalPokemon () {
    try{
        const infoApiPokemon = await getApiPokemon()
        const infoDbPokemon = await getDbPokemon()
        const allPokemons = infoApiPokemon.concat(infoDbPokemon);
        return allPokemons;
    } catch (e) {
        console.log("error: totalPokemon " + e)
    }
}

router.get("/", async (req, res) => {
    const name = req.query.name;
    try{
        const pokeData = await totalPokemon()
        if(name) {
            const pokeName = pokeData.filter(e => e.name.toLowerCase().includes(name.toLowerCase()))
         if(!pokeName) {
            res.status(404).send("Pokemon no encontrado")
            }  else res.json(pokeName)
        } else res.json(pokeData)
    } catch (e) {
        console.log("error: No se encontro" + e )
    } 
});

//--------------------------------------------------------------------------------------------------//

// ahora hago el llamado a la api para que me traiga los tipos y los guarde en mi db

async function pokemonTypes () {
    try {
        const types = await axios.get("https://pokeapi.co/api/v2/type");
        const pokeData = types.data.results
        pokeData.map(e => {
            Type.findOrCreate({
                where: {
                    name: e.name
                }
            })
        })
            const pokeTypes = await Type.findAll()
        return pokeTypes;
    } catch (e) {
        console.log("error: No hay tipos " + e )
    }  
}

router.get("/types", async (req, res) =>{

  try{
      const types = await pokemonTypes();
      res.json(types)
  } catch (e) {
      console.log("error: Tipo no encontrado " + e )
  }
})

//-----------------------------------------------------------------------------------------------//
//el proximo paso es hacer un post para crear un nuevo pokemon

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

//-------------------------------------------------------------------------------------------//

// hay que crear las funciones y la ruta para la busqueda de pokemon por id

/* async function totalPokemonsId (id) {
    try{
        if(typeof (id) === "number") {
            const idApi = await axios.get("https://pokeapi.co/api/v2/pokemon/" + id);

     const pokeIdApi = idApi.data;

      const poke = {  
        id: pokeIdApi.id,
        name: pokeIdApi.name,
        urlImage: pokeIdApi.sprites.other.home.front_default,
        types: pokeIdApi.types.map(e=> e.type.name),
        hp: pokeIdApi.stats[0].base_stat,
        attack: pokeIdApi.stats[1].base_stat,
        defense: pokeIdApi.stats[2].base_stat,
        speed: pokeIdApi.stats[5].base_stat,
        weight: pokeIdApi.weight,
        height: pokeIdApi.height 

        }   
        return poke   

        } else {
            const idDb = await Pokemon.findByPk(id, {
                include: {
                    model: Type,
                    through: {
                        attributes: [],
                         },
                     }
                })
            const poke2  = {
                id: idDb.id,
                name: idDb.name,
                urlImage: idDb.urlImage,
                types: idDb.types.map( e=> e.name),
                hp: idDb.hp,
                attack: idDb.attack,
                defense: idDb.defense,
                speed: idDb.speed,
                weight: idDb.weight,
                height: idDb.height,
                createInDb: idDb.createInDb
                }
                return poke2
        }

        } catch (e) {
        console.log(e)
    }
}

router.get("/:id", async (res, req) => {
    
    const id = req.params.id;

    try{
        const totalIds = await totalPokemonsId(id);
        
        res.status(200).json(totalIds)
         

    } catch (e) {
        res.status(404).send(e)
    }           
})
 */
router.get("/:id", async (req, res) => {

    const id = req.params.id;
    const allIds = await totalPokemon();
    if(id){
        const pokemonId = allIds.filter(e => e.id == id)
        pokemonId.length? 
        res.status(200).json(pokemonId):
        res.status(404).send("ERROR")
    }
})



module.exports = router;
