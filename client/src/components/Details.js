import React from "react";
import { Link, useParams} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { pokeDetails } from "../actions/index";
import { useEffect } from "react";
import styles from "./Details.module.css"

export default function Details(props) {
    const dispatch = useDispatch()
    const params = useParams();

    useEffect(() => {
        // de esta forma yo accedo al id de ese detalle
        dispatch(pokeDetails(params.id));
    } ,[dispatch, params.id])

    const myPokemon = useSelector((state) => state.details)

    return (
        
        <div className={styles.detailsPage}>      
            
            <div className={styles.detailsPokemonCard}>

                <div className={styles.detailsHeader}>

                        <img src={myPokemon.urlImage} alt="Img not found" width="200px" className= {styles.image} />
                        <h1 className={styles.name}>{myPokemon.name}</h1>
                        <div className={styles.types}>
                            {
                                myPokemon.types?.map(e=> (
                                    <span key={e}><strong>{e}</strong> </span>
                                    ))
                                }
                        </div>

                            <h4>#{myPokemon.id}</h4>

                </div>

                    <div className={styles.detailsBodyTop}>
                        <h3>ATAQUE: {myPokemon.attack} </h3>                        
                        <h3>DEFENSA: {myPokemon.defense} </h3>                       
                    </div>

                    <div className={styles.detailsBodyCenter}>    
                        <h3>HP: {myPokemon.hp}</h3>                        
                        <h3>VELOCIDAD: {myPokemon.speed}</h3>                        
                    </div>

                    <div className={styles.detailsBodyBotton}>    
                        <h3>ALTURA: {myPokemon.height}</h3>                        
                        <h3>PESO: {myPokemon.weight}</h3>                        
                    </div>

            </div > 
                    <div className={styles.return}>
                <Link to="/home">
                    <img src="https://cdn.atomix.vg/wp-content/uploads/2013/10/pokeball.png" alt="Boton" width="150px"/>
                </Link>      
                    </div>
                    
        </div>
        
    )

}