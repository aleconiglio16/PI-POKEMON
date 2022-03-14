import React from "react";
import style from "./Paginado.module.css"

export default function Paginado({pokemonperPage, allPokemons, paginado}) {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(allPokemons/pokemonperPage); i++){
    pageNumbers.push(i)
    }

    return(
        <div>            
                { pageNumbers && pageNumbers.map(number => (                    

                        <button onClick={() => paginado(number)} key={number} className={style.paginado}> {number} </button>
                    
                    ))
                }
           
        </div>
    )

}

