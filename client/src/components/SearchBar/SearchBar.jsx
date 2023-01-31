import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import {getDogs} from '../../Redux/actions/index';
import './SearchBar.css';

export default function SearchBar(){

    const dispatch = useDispatch();
    const [name, setName] = useState('');
   

    function handleInputChange(e){
        e.preventDefault();
        setName(e.target.value);
    }

    function handleSubmit(e){
        let found = getDogs(name);
      console.log(found);
        e.preventDefault();
        dispatch(found);
        setName(''); 
    }

    return(
        <>
            <input
               type='text'
               placeholder='Busqueda de dogo..'
               onChange={e => handleInputChange(e)}
               value={name}
               className='input'
               onKeyPress={e => e.key === 'Enter' && handleSubmit(e)}
               />

               <button
               type='submit'
               onClick={e => handleSubmit(e)}
               className='fetch'>
                <strong>Buscar</strong>
               </button>
        </>
    )
}