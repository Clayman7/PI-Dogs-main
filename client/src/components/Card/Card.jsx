import React from 'react';
import './Card.css';
import gen from '../../img/gen.jpeg';

const Card = ({name, temperaments,  weightMin, weightMax, image }) => {

  return (
    <div className='card'>
        <h2 className='cardtitle' ><span>{name}</span></h2>
        <h5 className='carddescr'>{function (temperaments) {
                if (typeof (temperaments) === 'string') {
                    return temperaments;
                }
                if (Array.isArray(temperaments)) {
                    let temps = temperaments.map(el => el.name);
                    return temps.join(', ');
                }
            }(temperaments)}</h5> 
            
            <h5 className='carddescr'>Peso minimo: {weightMin}</h5>
            <h5 className='carddescr'>Peso maximo: {weightMax}</h5>
         
        <img src={image.length > 0 ? image : gen  } alt='image not found' width='350px' height='250' className='imagecard'  />

    </div>
  )
}

export default Card