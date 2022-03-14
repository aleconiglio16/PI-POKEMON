import axios from "axios";

//TRAE TODOS LOS POKEMON DESDE LA BASE DE DATOS

export function getPokemons() {
    return async function(dispatch){
        var json = await axios.get("/");
/* http://localhost:3001 */
        return dispatch({
            type: "GET_POKEMONS",
            payload: json.data
        })
    }
}
//--------------------------------------------------------------------------------------------------//

//FILTRA POKEMON POR NOMBRE

export function getNamePokemon(name) {
    return async function(dispatch) {
        try{
        var json = await axios.get("/?name=" + name);
        /* http://localhost:3001 */
        return dispatch ({
            type: "GET_NAME_POKEMON",
            payload: json.data
        })
        } catch (e) {
            console.log(e)
        }
    }
}
export function filterPokemonsByCreated(payload) {
    return {
        type: "GET_CREATED",
        payload
    }

}
//--------------------------------------------------------------------------------------------//

//ORDENA POKEMONS POR NOMBRE

export function orderByName(payload) {
    return {
        type:"ORDER_BY_NAME",
        payload
    }
}
//-----------------------------------------------------------------------------------------------//

//ORDENA POKEMONS POR PODER DE ATAQUE

export function orderByAttack(payload) {
    return {
        type:"ORDER_BY_ATTACK", 
        payload
    }
}
//---------------------------------------------------------------------------------------------//

//TRAE TODOS LOS TIPOS DE POKEMON DE LA BASE DE DATOS

export function getTypesPokemons() {
    return async function(dispatch){
        var typesData = await axios.get("/types");
/* http://localhost:3001 */
        return dispatch({
            type: "GET_TYPES_POKEMONS",
            payload: typesData.data
        })
    }
}
//-------------------------------------------------------------------------------------------//

//FILTRA LOS POKEMON POR TIPO

export function filterTypes(payload) {
    return {
        type: "FILTER_TYPES",
        payload
    }
} 
//--------------------------------------------------------------------------------------//

//POST PARA CREAR POKEMONES NUEVOS

export function postPokemon(payload) {
    return async function (dispatch){
        const json = await axios.post("/", payload);
        /* http://localhost:3001 */
        return json;
    }
}

//----------------------------------------------------------------------------------------------//

//debe generar una aciton para el detalle del pokemon trayendo la ruta del id

export function pokeDetails (id) {
    return async function (dispatch){
        try{
            var json = await axios.get("/id/" + id);
            /* http://localhost:3001 */
            return dispatch({
                type: "GET_DETAILS",
                payload: json.data
            })
        } catch (e){
            console.log(e)
        }
    } 
}
