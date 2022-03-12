import React from "react";


//declaro el paginado trayendo las propiedades del otro componente 
export default function Paginado({pokemonperPage, allPokemons, paginado}) {
    const pageNumbers = [];
    //voy a recorrer un arreglo en el que voy a tomar el numero redondo que resulta de dividir todos
    //los pokemon entre la cantidad de pokemon por pagina que yo quiero
    //y a ese numero lo voy a pushear  en mi array vacio de arriba
    //que como resultante va a ser una arreglo de numeros 
    for (let i = 1; i <= Math.ceil(allPokemons/pokemonperPage); i++){
    pageNumbers.push(i)
    }


    //aca pregunto si tengo pageNumbers para mapeeralo, y luego devolveme por ese arreglo cada uno de los
    //numeros que me devuelva el paginado

    return(
        <div>
            
                { pageNumbers && pageNumbers.map(number => (
                    

                        <button onClick={() => paginado(number)} key={number}> {number} </button>

                    
                    ))
                }
           
        </div>
    )

}

