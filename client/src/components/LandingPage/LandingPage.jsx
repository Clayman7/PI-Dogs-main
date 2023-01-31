import React from 'react';
import {Link} from 'react-router-dom';
import './LandingPage.css'

export default function LandingPage(){
    return(
        <div className='divLp'>
          
            <Link to={'/home'}>
                <button className='button'><span>Ingresar</span></button>
            </Link>
        </div>
    )
}