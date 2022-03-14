import {    
    filterPokemonsByCreated,
    orderByAttack,
  } from "../src/actions/index.js";
  
  describe("Reducer-Actions Tests:", () => {
    
    it('It should return an action with the props type "FILTER_POKEMONS_BY_TYPE" & payload, the value is send as an argument:', () => {
      expect(filterPokemonsByCreated("created")).toEqual({
        type: "GET_CREATED",
        payload: "created",
      });
    });
  
    it('It should return an action with the props type "SORT_POKEMONS_BY_STRENGTH" & payload, the value is send as an argument:', () => {
      expect(orderByAttack("asc")).toEqual({
        type: "ORDER_BY_ATTACK",
        payload: "asc",
      });
    });
  
  
  });