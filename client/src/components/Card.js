import React from "react";
import style from "./Card.module.css"
import { Link } from "react-router-dom";



export function Card({name, urlImage, types, id}) {

    const pokeTypes = types.map(e=> <div key={e}>{e}</div>) //el e es el nombre del tipo de pokemon

    return (
        <Link to= {"/details/" + id}>
            <div className= {style.card} >
                <h3>{name}</h3>
                <h3>{id}</h3>
                <hr/>
                <img src={urlImage} alt ="img not found" width="250px"  />
                <h4>{pokeTypes} </h4>  <hr/>
            </div>
        </Link>
    )
}
