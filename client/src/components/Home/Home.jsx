import React from "react";
import { useState, useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux';
import {
    getDogs, 
    getAllTemperaments, 
    filterDogsBytemperaments,
    filterCreated,
    sortByName,
    sortByWeight 
       } from '../../Redux/actions';
import {Link} from 'react-router-dom';
import Card from "../Card/Card";
import Paginado from "../Paginado/Paginado";
import SearchBar from "../SearchBar/SearchBar";
import './Home.css';


export default function Home(){

    const dispatch = useDispatch(); //esto es para utilizar esta constante e ir utilizando mis acciones
    const allDogs = useSelector( (state) => state.dogs); //aqui es donde esta toda la info
    const allTemperaments = useSelector((state) => state.temperaments);
    const [orden, setOrden] = useState(''); // Estado local que me sirve para modificar el estado cuando ordeno y renderizar los perros ordenados como quiero.
    
    //paginado
    const [currentPage, setCurrentPage] = useState(1);
    const [dogsPerPage, setDogsPerPage] = useState(8);
    const indexOfLastdogs = currentPage * dogsPerPage;
    const indexOfFirstDogs = indexOfLastdogs - dogsPerPage;
    const currentDogs =  allDogs.slice(indexOfFirstDogs, indexOfLastdogs);
    

    const paginado = (pageNumber) =>{
        setCurrentPage(pageNumber);
    }
    
    useEffect(() =>{
        dispatch(getDogs());
        dispatch(getAllTemperaments());
    }, [dispatch]);


    //funciones necesarias
    function handleClick(e){
      e.preventDefault();
      dispatch(getDogs());
    }

    function handleFilterTemperaments(e){
        //e.preventDefault();
        dispatch(filterDogsBytemperaments(e.target.value));
        setCurrentPage(1);
    }

    function handleFilterCreated(e){
        e.preventDefault();
        setCurrentPage(1);
        dispatch(filterCreated(e.target.value));
    }

    function handleSortByName(e){
        e.preventDefault();
        dispatch(sortByName(e.target.value));
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`);
    }

    function handleSortByWeight(e){
        e.preventDefault();
        dispatch(sortByWeight(e.target.value));
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`);
    }

    return(

        <div className="home">
        <div className="divNB">
        <div className="navbarB">
        

        <button onClick={e => {handleClick(e)}} className='welcome'>
          <span>Voler a cargar</span>  
           </button>

           <Link to='/dogs' >
              <button className="welcome">
                 <span>Crear perros</span>   
              </button>
              </Link>  
        </div>
        <ul className='navbar'>

           <li className="content-select">
            <select onChange={e => handleSortByName(e)}>
                <option value='selected' hidden className="elementNB">Ordenar por Nombre</option>
                <option value='asc'>A - Z</option>
                <option value='desc'>Z - A</option>
            </select>
            </li>
            <li className="content-select">
            <select onChange={e => handleSortByWeight(e)}>
                <option value='selected' hidden>Ordenar por Peso</option>
                <option value='asc'>Ascendente</option>
                <option value='desc'>Descendente</option>
            </select>
            </li>

            <li className="content-select">
            <select onChange={(e) => handleFilterTemperaments(e)}>
                <option value='temp'>Todos los Temperamentos</option>
                { allTemperaments.map((el) =>(
                <option value={el.name}>{el.name}</option>
                ))
                }
            </select>
            </li>
            <li className="content-select">
            <select onChange={(e) => handleFilterCreated(e)}>
                <option value='all'>Todos</option>
                <option value='api'>Existentes</option>
                <option value='created'>Creados</option>
            </select>
            </li>
           
        </ul>  
        <div className="navbar">      
        <SearchBar/>   
        </div> 
            </div>
            
            <div className="cards">
            <Paginado
            className="numsPags"
            currentPage={currentPage}
            dogsPerPage={dogsPerPage}
            allDogs={allDogs.length}
            paginado={paginado}
            />    
        
            { 
                currentDogs?.map((el) =>{
                    return(
                    <div key={el.id}>
                    <Link to={"/home/" + el.id}>
                    <Card 
                       name={el.name} 
                       temperaments={el.temperaments} 
                       weightMin={el.weightMin}
                       weightMax={el.weightMax}  
                       image={el.image} 
                       key={el.id} />
                    </Link>
                    </div>
                    )
                })
            } 
            <Paginado
            className="numsPags"
            currentPage={currentPage}
            dogsPerPage={dogsPerPage}
            allDogs={allDogs.length}
            paginado={paginado}
             />

              <Link to='/' ><button className='welcome'><span>Welcome Page</span></button></Link>           
        </div>
        </div>
    )

}