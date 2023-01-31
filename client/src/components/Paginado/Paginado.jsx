import React from 'react';
import './Paginado.css';

function Paginado({dogsPerPage, allDogs, paginado, currentPage}){

    const pageNumbers = [];

    let largo = allDogs / dogsPerPage;

    if(!Number.isInteger(largo)){
      largo = parseInt(largo);
    }

    for (let i=0; i<= Math.ceil(largo); i++){
        pageNumbers.push(i+1);
    }
  
    return (
      
        <div className='paginado'>
          <button 
          className="flechaspag" 
          onClick={() => paginado(currentPage === 1 ? pageNumbers.length : currentPage - 1 )}> 
          Atras 
          </button>

         {pageNumbers &&
           pageNumbers.map(number => {
           return(
            <button className={`numberpage ${number===currentPage?"paginaactiva":null}`} 
           key={number} 
           onClick={() => paginado(number)}>{currentPage === number ? <b>{number}</b> : number}
           </button>
           )
         })}
          <button className="flechaspag" onClick={() => paginado(currentPage === 0 ? pageNumbers.length : currentPage + 1)}> Adelante </button>
        </div>
    ) 
}

export default Paginado;