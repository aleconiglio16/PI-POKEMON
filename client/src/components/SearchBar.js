import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNamePokemon } from "../actions";

export default function SearchBar () {
    const dispatch =  useDispatch();
    const [ name, setName ] = useState("");


//debo crear una funcion que guarde en mi estado local lo que vaya apareciendo en el imput
function handlePokeName (e) {
    e.preventDefault();
    setName(e.target.value)

}

//creo una funcion para el boton donde me despache el name, que va a ser mi estado local 
//yo voy guardando loq ue va tipeando el usuario en el estado local name, entonces esto va a llegarle
// a mi accion que va a llamar al back y le va a pasar el name(loq  escribe el usuario)
function handleButton (e) {
    e.preventDefault();
    dispatch(getNamePokemon(name))
    setName("")
}

    return (
        <div>
            <input
            type="text"
            placeholder = "Pokebusqueda"
            onChange= {e => handlePokeName(e)}
            />
            <button type="submit" onClick={e=> handleButton(e)}>CATCH</button>
        </div>
    )
}