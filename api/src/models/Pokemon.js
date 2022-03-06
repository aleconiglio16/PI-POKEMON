const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    name: {
      type: DataTypes.STRING,
      //el allownull al estar en false no te permite que este campo este vacio
      allowNull: false,
    },
    id:{
      //el UUID genera un numero random de numeros y letras para que no se pisen los pokemones creados por mi con los de la api
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allownull: false,
      primaryKey: true
    }, 
    hp: {
      type: DataTypes.INTEGER,
      allownull: true
    },
    attack:{
      type: DataTypes.INTEGER,
      allownull: true
    },
    defense: {
      type: DataTypes.INTEGER,
      allownull: true
    },
    speed: {
      type: DataTypes.INTEGER,

    },
    height:{
      type: DataTypes.INTEGER,

    },
    weight:{
      type: DataTypes.INTEGER,

    },
      urlImage:{
      type: DataTypes.STRING,
      allownull: true
    },
    //este sirve por si queres hacer un llamado solo al que esta creado en base de datos
    createInDb:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
  });
};
