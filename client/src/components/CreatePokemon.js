import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { postPokemon, getTypesPokemons } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import style from "./CreatePokemon.module.css"


function validate(input) {
    let fails = {}

    if(!input.name || input.name.length < 6) {
        fails.name = "El nombre es obligatorio y debe tener mas de 6 caracteres";

        }   else if(!input.hp || input.hp < 1 || input.hp > 100 ){
        fails.hp ="El hp es obligatorio y debe ser entre 0 y 100";

        } else if(!input.attack || input.attack < 1 || input.attack > 100 ){
        fails.attack ="El ataque es obligatorio y debe ser entre 0 y 100";

        }  else if(!input.defense || input.defense < 1 || input.defense > 100 ){
        fails.defense ="La defensa es obligatoria y debe ser entre 0 y 100";

        } else if(!input.speed || input.speed < 1 || input.speed > 100 ){
        fails.speed ="La velocidad es obligatoria y debe ser entre 0 y 100";

        } else if(!input.hp || input.hp < 1 || input.hp > 100 ){
        fails.hp ="El hp es obligatorio y debe ser entre 0 y 100";

        } else if(!input.weight || input.weight < 1 || input.weight > 300 ){
        fails.weight ="El peso es obligatorio y debe ser entre 0 y 300";

        } else if(!input.height || input.height < 1 || input.height > 400 ){
        fails.height ="La altura es obligatoria y debe ser entre 0 y 400";

        } else if(!input.urlImage){
            fails.urlImage="no hay imagen"
        }    
        else if(input.types.length <1){
        fails.types="Se requiere como minimo un tipo y un maximo de dos por Pokemon creado"
        }
     

    return fails;
};



export default function CreatePokemon(){
    const dispatch = useDispatch();
    const typesPoke = useSelector((state) => state.typePokemon)
    const [ errors, setErrors ] = useState({})
    
    const [ input, setInput] = useState({
        name: "",
        hp:"",
        speed:"",
        attack:"",
        defense:"",
        weight:"",
        height:"",
        urlImage:"",
        types:[]
    })
    

function handleChange (e) {
    e.preventDefault();
    setInput({
        ...input,
        [e.target.name] : e.target.value
    })
    setErrors(validate ({
        ...input, 
        [e.target.name] : e.target.value
    }))
}

function handleSelect (e) {
    e.preventDefault();
    setInput({
        ...input,
        types: [...input.types, e.target.value]
    })
    setErrors(validate ({
        ...input,
        types: [...input.types, e.target.value]
    }))
}

function handleCreate (e) {
    e.preventDefault();
    if(!Object.keys(errors).length && input.name.length){
        dispatch(postPokemon(input))
        alert("Nuevo Pokemon creado correctamente!")
        setInput({
            name: "",
            hp:"",
            speed:"",
            attack:"",
            defense:"",
            weight:"",
            height:"",
            urlImage:"",
            types:[]
        })
        
    } else {
        alert("Error en la creacion")
    }
}

function handleDelete(e) {
    setInput({
        ...input, 
        types: input.types.filter(t=> t !== e)
    })
}

    useEffect(() => {
        dispatch(getTypesPokemons()); 
    }, [dispatch])/*  */

    
    return (

        <div className={style.create}>

            <div className={style.title}>
                <h1>Crea tu propio POKEMON!</h1>
            </div>

            <form onSubmit={e=> handleCreate(e)} className={style.form}>

                <div >
                     <label className={style.label} > </label>
                     <input
                        type="text"
                        placeholder="Introducir Nombre"
                        value={input.name}
                        name="name"
                        onChange={e =>handleChange(e)}
                        />    
                     {
                         errors.name && <h4>{errors.name}</h4> 
                     }

                </div>

                <div>
                     <label className={style.label}> </label>
                     <input
                        type="number"
                        placeholder="Introducir Hp"
                        value={input.hp}
                        name="hp"
                        onChange={e =>handleChange(e)}
                        />
                       {
                         errors.hp && <h4>{errors.hp}</h4> 
                       }
                </div>

                <div>
                     <label className={style.label}> </label>
                     <input
                        type="number"
                        placeholder="Introducir Ataque"
                        value={input.attack}
                        name="attack"
                        onChange={e =>handleChange(e)}
                        />
                       {
                         errors.attack && <h4>{errors.attack}</h4> 
                       }
                </div>

                <div>
                     <label className={style.label}> </label>
                     <input
                        type="number"
                        placeholder="Introducir Defensa"
                        value={input.defense}
                        name="defense"
                        onChange={e =>handleChange(e)}
                        />
                       {
                         errors.defense && <h4>{errors.defense}</h4> 
                       }
                </div>

                <div>
                     <label className={style.label}> </label>
                     <input
                        type="number"
                        placeholder="Introducir Velocidad"
                        value={input.speed}
                        name="speed"
                        onChange={e =>handleChange(e)}
                        />
                       {
                         errors.speed && <h4>{errors.speed}</h4> 
                       }
                </div>

                <div>
                     <label className={style.label}> </label>
                     <input
                        type="number"
                        placeholder="Introducir Altura"
                        value={input.height}
                        name="height"
                        onChange={e =>handleChange(e)}
                        />
                       {
                         errors.height && <h4>{errors.height}</h4> 
                       }
                </div>

                <div>
                     <label className={style.label}> </label>
                     <input
                        type="number"
                        placeholder="Introducir Peso"
                        value={input.weight}
                        name="weight"
                        onChange={e =>handleChange(e)}
                        />  
                       {
                         errors.weight && <h4>{errors.weight}</h4> 
                       }              
                </div>

                <div>
                     <label className={style.label}> </label>
                     <input 
                        type="text"
                        placeholder="Introducir Imagen"
                        value={input.urlImage}
                        name="urlImage"
                        onChange={e =>handleChange(e)}
                        /> 
                         {
                         errors.urlImage && <h4>{errors.urlImage}</h4> 
                       }                               
                </div>

                <br/>
                <div>
                <select onChange={e=> handleSelect(e)} disabled={input.types.length >= 2 }>
                    {typesPoke.map((t)=> (
                        <option value={t.name} key={t.id}>{t.name}</option>
                    ))}                      
                </select>
            
                {input.types.map((dl,i) => 
                <div className={style.select}  key={i*100}>
                    <p>{dl}</p>
                    <button onClick={() => handleDelete(dl)} className={style.tipo}>x</button>
                </div>
                )}
                 {
                         errors.types && <h4>{errors.types}</h4> 
                       } 
                </div>
                <br/> 
                <br/>
                <br/>              
                <button type="submit">CREAR</button>

            </form>
            <div className={style.volver}>
                <Link to="/home">
                    <button className={style.botonVolver}>VOLVER</button>
                </Link> 
            </div>
         
                
        </div>
    )


 




}