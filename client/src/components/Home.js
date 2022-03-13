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


export default function Home () {
    const dispatch = useDispatch() //constante utilizada para ir despachando mis acciones
    const allPokemons = useSelector((state) => state.pokemon) //el selector lo que hace es traerme a allpokemons todo lo que esta en el estado de pokemons
    const typesOfPokemon = useSelector((state) => state.typePokemon)
    //creo una constante que me guarde en un estado local la pag actual y una constante que me la setee 
    //y arranca en uno porque siempre voy a empezar por la pag 1
    const [ currentPage, setCurrentPage ] = useState(1)
    // en la siguiente constante voy a guardar cuantos personajes quiero por pagina 
    const [ pokemonPerPage, setPokemonPerPage ] = useState(12)
    // creo una constante con el indice del ultimo personaje
    const indexOfLastPokemon = currentPage * pokemonPerPage
    //necesitamos una constante con el indice del primer personaje
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonPerPage
    //y por ultimo una constante que me devuelva los personajes que estan ene la pag actual
    const currentPokemons = allPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon)

    const [ order, setOrder ] = useState("")

    const paginado = (pageNumbers) => {
        setCurrentPage(pageNumbers)
    }


useEffect (()=>{
    dispatch(getPokemons())
    dispatch(getTypesPokemons())
}, [dispatch])


//funcion de reseteo para cargar nuevamente los pokemon

function handleClick(e) {
    e.preventDefault(); //esto es preventivo para que no se rompan las cosas ni se recargue sola la pag
    dispatch(getPokemons())
}

function handleFilterPokemon (e) {
    e.preventDefault();
    dispatch(filterPokemonsByCreated(e.target.value))
}

function handleOrderByName (e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value))
    //le agrego una funcion para que cuando hago el ordenamiento me lo haga en la primer pagina
    setCurrentPage(1)
    //genero un estado de orden que es un estado local vacio y lo uso unicamente para cuando seteo la pag
    //nombrada arriba, me modifique el estado local y se renderice. SOLO PARA ESO
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
}

return(
    
    <div className={style.general}>   
            <div className={style.title}>
                <img src={Titulo} alt="titulo"/>
              </div> 
            <div className={style.createReload}>
                <Link to="/create">
                   <button className={style.crear}>Crear Pokemon</button>  
                </Link>
           
                <button onClick={e => handleClick(e)} className={style.recargar}>
                Recargar 
                </button>
            </div>
            <br/>
           
            <br/>
            <div className={style.search}>
                <SearchBar/>
            </div>
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
                        allPokemons={allPokemons.length} // se le pasa asi xq necesitamos un valor numerico
                        paginado={paginado}
                        />
                    <br/>

                </div>    
                    <div className={style.grid}>
                    {
                        currentPokemons?.map((e)=>{
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

