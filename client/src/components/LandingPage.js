import React from "react";
import { Link } from "react-router-dom";
import style from "./LandingPage.module.css"


export default function LandingPage() {
    return (
        <div className={style.image}>
            
            <div className={style.landing}>

                <Link to ="/home">

                    <img src="https://www.freeiconspng.com/thumbs/pokemon-png/pokemon-png-23.png" alt="fondo"/>
                
                </Link>
                <h1 className={style.title}><strong>INGRESAR</strong></h1>   
            </div>
        </div>
    )
}