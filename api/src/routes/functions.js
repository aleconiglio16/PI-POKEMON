const axios = require("axios");
const { Pokemon, Type } = require("../db");


module.exports = {

        //llamado a la api para traer 40 pokemon 

    getApiPokemon : async () => {
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
    },

    // llamado a la base de datos para traer los pokemon 

    getDbPokemon : async () => {
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
    },

    // concatencaion de las dos funciones anteriores para tener todos los pokemons en el mismo lugar

     totalPokemon: async() => {
        try{
            const infoApiPokemon = await getApiPokemon()
            const infoDbPokemon = await getDbPokemon()
            const allPokemons = infoApiPokemon.concat(infoDbPokemon);
            return allPokemons;
        } catch (e) {
            console.log("error: totalPokemon " + e)
        }
    },

    // llamado a la api para traerme los tipos de pokemon

     pokemonTypes : async () => {
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
    },

    // funcion para el llamado a la api para buscar pokemons por id

    getPokemonId : async (id) => {

        if(!id.includes("-") ){
              try{
        const infoId = await axios.get("https://pokeapi.co/api/v2/pokemon/" + id)
        const pokemonData = {
            id: infoId.data.id,
            name: infoId.data.name,
            hp: infoId.data.stats[0].base_stat,
            attack: infoId.data.stats[1].base_stat,
            defense: infoId.data.stats[2].base_stat,
            speed: infoId.data.stats[5].base_stat,
            weight: infoId.data.weight,
            height: infoId.data.height,
            urlImage: infoId.data.sprites.other.home.front_default,
            types: infoId.data.types.map(e=>e.type.name)
        } 
        return pokemonData
        } catch (e) {
            console.log("ERROR EN GET POKEMONID " + e)
        }
        } else {
            try {
            const pokemon = await Pokemon.findByPk(id, {
                include: {
                    model: Type,
                    through: {
                        attributes: [],
                    },
                },
            });
            const pokeBase = ({
                id: pokemon.id,
                name: pokemon.name,
                urlImage: pokemon.urlImage,
                attack: pokemon.attack,
                defense: pokemon.defense,
                speed: pokemon.speed,
                weight: pokemon.weight,
                height: pokemon.height,
                createInDb: pokemon.createInDb,
                types: pokemon.types.map(e=> e.name)
            })
            return pokeBase;
        } catch (e) {
            console.log("error: getIdPokemonDb " + e);
        }
        } 
    } 
}