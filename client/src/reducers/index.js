
const initialState = {
    pokemon : [],
    pokemonCopy: [],
    typePokemon: [] ,
    details: {}
}
// el pokemoncopy esta echo para que no se pisen los filtrados, funciona como backup

function rootReduceer (state = initialState, action) {
    switch(action.type) {
        case "GET_POKEMONS":
            return {
                ...state,
                //aca le digo que en mi estado "pokemon" que e sun arreglo vacio, manda todo lo que te mande la accion get pokemon
                pokemon: action.payload,
                pokemonCopy: action.payload
            } 

        case "GET_NAME_POKEMON":
            return {
                ...state,
                pokemon: action.payload
            }

        case "GET_TYPES_POKEMONS":
            return {
                ...state,
                typePokemon: action.payload
            }
            //wn wl proximo caso solo necesito que me devuelva el estado como esta xq voy a crearlo
            //en una ruta nueva
        case "CREATE_POKEMON":
            return{
                ...state
            }

        case "FILTER_TYPES":
            const allTypes = state.pokemonCopy
            const pokeFilter = action.payload === "All" 
            ? allTypes
            : allTypes.filter(e=> e.types.includes(action.payload))
            return {
                ...state,
                pokemon: pokeFilter
            }

        case "GET_CREATED":
                const allPokemons = state.pokemonCopy;
                //si mi payload es "All", me devolves todo; sino entra al allpokemons y filtralo por el payload que te llega
                // 
                const createdFilter = action.payload === "created" 
                ? allPokemons.filter(e => e.createInDb) 
                : allPokemons.filter(e=>!e.createInDb)
            return {
                ...state,
                pokemon: createdFilter    
                }

        case "ORDER_BY_NAME":
            //lo que hago es preguntar si el action payload es ascendente, que ejecute el primer sort 
            //y que lo ordene de manera ascendente..
            const sortPokemonName = action.payload === "asc"
            ? state.pokemonCopy.sort(function(a,b) {

            
                if(a.name > b.name) {
                    return 1;
                }
                if(b.name > a.name) {
                    return -1;
                }
                return 0
            }) 
            //si quiero que este ordenado al reves se invierten los valores
            : state.pokemonCopy.sort(function(a,b) {
                if(a.name > b.name) {
                    return -1;
                }
                if(b.name > a.name) {
                    return 1;
                }
                return 0
            })
            return{
                ...state,
                pokemon: sortPokemonName
            }

        case "ORDER_BY_ATTACK":
            const sortPokemonAttack = action.payload === "weak"
            ? state.pokemonCopy.sort(function(a,b){
                if(a.attack > b.attack) {
                    return 1;
                }
                if(b.attack > a.attack) {
                    return -1;
                }
                return 0
            })
            : state.pokemonCopy.sort(function(a,b) {
                if(a.attack > b.attack) {
                    return -1;
                }
                if(b.attack > a.attack) {
                    return 1;
                }
                return 0;
            })
            return {
                ...state,
                pokemon: sortPokemonAttack
            }
        case "GET_DETAILS":
            return {
                ...state,
                details: action.payload
            }
        
            default : 
                return state
        } 
    

    }
    


export default rootReduceer