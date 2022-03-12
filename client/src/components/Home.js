import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getPokemons, filterPokemonsByCreated, orderByName, orderByAttack , getTypesPokemons, filterTypes } from "../actions";
import { Link } from "react-router-dom" 
import { Card } from "./Card";
import Paginado from "./Paginado";
import style from "./Home.module.css"
import SearchBar from "./SearchBar";


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

return(
    <div className={style.home}>
        <Link to="/create">Crear Pokemon</Link>
        <h1> POKEMON API </h1>
        <button onClick={e => handleClick(e)}>
           Recargar personajes
        </button>
        <br/>
        <SearchBar/>
        <br/>
                <select onChange={e => handleFilterPokemon(e)}>
                    <option value="All">Todos</option>
                    <option value="api">Existente</option>
                    <option value="created">Creado</option>
                </select>
                <select onChange={e => handleOrderByName(e)}>  
                    <option value="All">Nombre Pokemon</option>
                    <option value= "asc">A - Z</option>
                    <option value= "desc">Z - A</option>
                </select>
                <select onChange={e=> handleOrderByAttack(e)}>
                    <option value="All">Ordenamiento de Fuerza</option>
                    <option value="weak">Debil a Fuerte</option>
                    <option value="strong">Fuerte a Debil</option>
                </select>
                <select>
                        <option>Tipos</option>
                    {typesOfPokemon.map((t)=> (
                        <option value={t.name} key={t.id}>{t.name}</option>
                    ))}
                </select>

{/* al paginado se lo pasa con sus props */} 

    <Paginado 
        pokemonperPage={pokemonPerPage}
        allPokemons={allPokemons.length} // se le pasa asi xq necesitamos un valor numerico
        paginado={paginado}
        />

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
)

}

