import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { postPokemon, getTypesPokemons } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import style from "./CreatePokemon.module.css"


function validate(input) {
    let errors = {}

    if(!input.name || input.name.length < 6) {
        errors.name = "El nombre es obligatorio y no debe tener mas de 6 caracteres";

    }   else if(!input.hp || input.hp < 1 || input.hp > 100 ){
        errors.hp ="El hp es obligatorio, no puede contener letras y debe ser entre 0 y 100";

    } else if(!input.attack || input.attack < 1 || input.attack > 100 ){
        errors.attack ="El ataque es obligatorio y debe ser entre 0 y 100";

    }  else if(!input.defense || input.defense < 1 || input.defense > 100 ){
        errors.defense ="La defensa es obligatoria y debe ser entre 0 y 100";

    } else if(!input.speed || input.speed < 1 || input.speed > 100 ){
        errors.speed ="La velocidad es obligatoria y debe ser entre 0 y 100";


    } else if(!input.hp || input.hp < 1 || input.hp > 100 ){
        errors.hp ="El hp es obligatorio y debe ser entre 0 y 100";

    } else if(!input.weight || input.weight < 1 || input.weight > 300 ){
        errors.weight ="El peso es obligatorio y debe ser entre 0 y 300";

    } else if(!input.height || input.height < 1 || input.height > 400 ){
        errors.height ="La altura es obligatoria y debe ser entre 0 y 400";

    } else if(input.types.length < 1 || input.types.length > 2){
        errors.types="Se requiere como minimo un tipo y un maximo de dos por Pokemon creado"
    }
    return errors;
};



export default function CreatePokemon(){
    const dispatch = useDispatch();
    //me traigo los tipos pasandolo por state y le digo que traiga state ocupation
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
    

//Creo un handle que lo que haga es ir manejando cada vez que se modifiquen mis inputs
//cada vez que se ejecute la funcion handleChange, a mi estado input, ademas de lo que tiene
//agregale el target.value de lo que este modificando
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



//funcion para el select, para que pueda seleccionar mas de un tipo
//en este caso trae lo que ya tengo en el input y concatenale el target.value
function handleSelect (e) {
    e.preventDefault();
    setInput({
        ...input,
        types: [...input.types, e.target.value]
    })
   /*  setErrors(validate) ({
        ...input,
        types: [...input.types, e.target.value]
    }) */
}
//ahora hay que crear una funcion para le sumbit o en mi caso CREAR el pokemon

function handleCreate (e) {
    e.preventDefault();
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
}

//seteo mi input y le digo que me lo filtre por todo lo que no sea ese elemento
function handleDelete(e) {
    e.preventDefault();
    setInput({
        ...input, 
        types: input.types.filter(t=> t !== e)
    })
}


//debo generear un useEffect para despachar los types para poder renderizar

    useEffect(() => {
        dispatch(getTypesPokemons()); // aca no se si tengo q mapearlo
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
                     
                    
                </div>
                <select onChange={e=> handleSelect(e)}>
                    {typesPoke.map((t)=> (
                        <option value={t.name} key={t.id}>{t.name}</option>
                    ))}
                      
                </select>
         {/* en mi estado local q voy a tener todos los tipos, los voy a mapear, renderizando un parrafo
            con el elemento que mapeo y un boton que cuandto yo le haga click ejecute el handle */}
                {input.types.map(dl => 
                <div className={style.select}>
                    <p>{dl}</p>
                    <button onClick={() => handleDelete(dl)} className={style.tipo}>x</button>
                </div>
                )}
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