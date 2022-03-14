import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNamePokemon } from "../actions";
import style from "./SearchBar.module.css"

export default function SearchBar () {
    const dispatch =  useDispatch();
    const [ name, setName ] = useState("");

function handlePokeName (e) {
    e.preventDefault();
    setName(e.target.value)

}

function handleButton (e) {
    e.preventDefault();
    dispatch(getNamePokemon(name))
    setName("")
}

    return (
        <div>
            <input
                type="text"
                placeholder="Pokebusqueda"
                onChange= {e => handlePokeName(e)}
                className={style.searchBox}
            />
            <button type="submit" onClick={e=> handleButton(e)} className={style.button}>CATCH</button>
        </div>
    )
}