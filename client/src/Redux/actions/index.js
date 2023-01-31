import axios from 'axios';
import React from 'react';

//aqui ocurre la conexion entre el front y el back
export function getDogs(name){
    return async function(dispatch){
        try {
            if (name) {
                let json = await axios.get('http://localhost:3001/dogs?name=' + name)
                return dispatch({
                    type: 'GET_DOGS',
                    payload: json.data
                })
            }
            let json = await axios.get('http://localhost:3001/dogs', {});
            return dispatch({
                type: 'GET_DOGS',
                payload: json.data,
            })
        } catch(err){
            
            alert('Perro no encontrado');
       
    }
 }  }


export function getAllTemperaments(){
    return async function (dispatch){
        let json = await axios.get("http://localhost:3001/temperaments");
         return dispatch({
            type: "GET_ALL_TEMPERAMENTS",
            payload: json.data,
         });
    };
}

export function filterDogsBytemperaments(payload){
    return({
        type: 'FILTER_BY_TEMPERAMENTS',
        payload
    });
}

export function filterCreated(payload){
    return{
        type: 'FILTER_CREATED',
        payload,
    }
}

export function sortByName(payload){
    return{
        type: 'SORT_BY_NAME',
        payload
    }
}

export function sortByWeight(payload){
    return{
        type: 'SORT_BY_WEIGHT',
        payload
    }
}

export function postDogs(payload){
    return async function(dispatch){
        const json = await axios.post("http://localhost:3001/dogs", payload);
        console.log(json);
        return json;
    }
}

export function getDetail(id){
    console.log(id);
    return async function(dispatch){
        try{
        let json = await axios.get(`http://localhost:3001/dogs/${id}`);
        return dispatch({
            type: 'GET_DETAILS',
            payload: json.data
        })
    }catch(error){
        console.log(error);
    }
    }
}