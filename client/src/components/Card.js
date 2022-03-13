import React from "react";
import style from "./Card.module.css"
import { Link } from "react-router-dom";


export function Card({name, urlImage, types, id}) {

    const pokeTypes = types.map(e=> <div key={e}>{e}</div>) //el e es el nombre del tipo de pokemon

    return (
        <div className={style.landingCard}>
            <Link to= {"/details/" + id}>
                <div className= {style.card} >
                    <h3 className={style.name}>{name}</h3>
                    <h3>id# {id}</h3>                
                    <img src={urlImage} className={style.imagen} alt ="img not found" width="270px" />
                    <h4 className={style.types}>{pokeTypes} </h4>
                </div>
            </Link> 
        </div>
    )
}
