import React from 'react';
import './CardDetail.css';
import gen from '../../img/gen.jpeg';

const Card = ({name, temperaments,  weightMin, weightMax, image, heightMin, heightMax, life_span }) => {

  return (
    <div className='cardD'>
        <h2 className='cardtitle' ><span>Raza {name}</span></h2>
        <img src={image.length > 0 ? image : gen } alt='image not found' width='350px' height='250' className='imagecard'  />
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
            <h5 className='carddescrB'>Altura minima: {heightMin}</h5>
            <h5 className='carddescrB'>Altura maximo: {heightMax}</h5>
            <h5 className='carddescrB'>Años promedio de vida: {life_span}</h5>   

    </div>
  )
}

export default Card