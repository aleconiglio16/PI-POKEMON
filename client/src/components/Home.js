import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getPokemons, filterPokemonsByCreated, orderByName, orderByAttack , getTypesPokemons, filterTypes } from "../actions";
import { Link } from "react-router-dom" 
import { Card } from "./Card";
import Paginado from "./Paginado";
import style from "./Home.module.css"
import SearchBar from "./SearchBar";
import Titulo from "../imagenes/titulo.png"
import snorlax from "../imagenes/snorlax.png"


export default function Home () {
    const dispatch = useDispatch()
    const allPokemons = useSelector((state) => state.pokemon);
    const typesOfPokemon = useSelector((state) => state.typePokemon)
    const [ currentPage, setCurrentPage ] = useState(1)
    const  pokemonPerPage  = 12;
    const indexOfLastPokemon = currentPage * pokemonPerPage
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonPerPage
    const currentPokemons = allPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon)

    const [ , setOrder ] = useState("")

    const paginado = (pageNumbers) => {
        setCurrentPage(pageNumbers)
    }


useEffect (()=>{
    dispatch(getPokemons())
    dispatch(getTypesPokemons())
}, [dispatch])


function handleClick(e) {
    e.preventDefault(); 
    dispatch(getPokemons())
    setCurrentPage(1)
}

function handleFilterPokemon (e) {
    e.preventDefault();
    dispatch(filterPokemonsByCreated(e.target.value))
}

function handleOrderByName (e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value))
    setCurrentPage(1)
    setOrder(e.target.value)
}

function handleOrderByAttack (e) {
    e.preventDefault();
    dispatch(orderByAttack(e.target.value));
    setCurrentPage(1);
    setOrder(e.target.value)
}

function handleTypesFilter(e) {
    e.preventDefault();
    dispatch(filterTypes(e.target.value))
    setCurrentPage(1);
    setOrder(e.target.value)
}

return(
    
    <div className={style.general}>   
            <div className={style.title}>
                <img src={Titulo} alt="titulo" className={style.imgTitle}/>
            </div> 

            <div className={style.createReload}>
                <Link to="/create">
                    <button className={style.crear}>Crear Pokemon</button>  
                </Link>
           
                <button onClick={e => handleClick(e)} className={style.recargar}>
                         Recargar 
                </button>

                <div className={style.search}>
                <SearchBar/>
                </div>

            </div>

            <br/>           
            <hr/>         
            <br/>
            <br/>
                <div className={style.filters}>

                    <select onChange={e => handleFilterPokemon(e)}  className={style.selectores}>
                        <option value="All">Todos</option>
                        <option value="api">Existente</option>
                        <option value="created">Creado</option>
                    </select>

                    <select onChange={e => handleOrderByName(e)} className={style.selectores}>  
                        <option value="All">Nombre</option>
                        <option value= "asc">A - Z</option>
                        <option value= "desc">Z - A</option>
                    </select>

                    <select onChange={e=> handleOrderByAttack(e)} className={style.selectores}>
                        <option value="All">Fuerza</option>
                        <option value="weak">Debil a Fuerte</option>
                        <option value="strong">Fuerte a Debil</option>
                    </select>

                    <select onChange={e => handleTypesFilter(e)} className={style.selectores}>
                            <option value="All">Tipos</option>
                        {typesOfPokemon.map((t)=> (
                            <option value={t.name} key={t.id}>{t.name}</option>
                        ))}
                    </select>

                </div>

                <br/>

                <div className={style.paginado}>

                <Paginado 
                    pokemonperPage={pokemonPerPage}
                    allPokemons={allPokemons.length} 
                    paginado={paginado}
                />

                <br/>

                </div>   

                <div className={style.grid}>
                    {
                        currentPokemons.length===0
                        ? <div className={style.loading}>
                        <h1 className={style.titleLoading}>Pokemon trabajando NO MOLESTAR</h1>
                        <img src={snorlax} alt="waiting" className={style.imageLoading} width={450}/>
                        </div>
                        : currentPokemons?.map((e)=>{
                            return (  
                                             
                                <Card 
                                    name={e.name} 
                                    urlImage={e.urlImage} 
                                    types={e.types} 
                                    id={e.id}
                                    key={e.name}
                                />                      
                                
                                )
                                        })
                    }
                </div>
    </div>
)

}

