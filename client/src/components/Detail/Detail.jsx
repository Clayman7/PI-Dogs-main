import React from 'react';
import {Link} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {getDetail} from '../../actions/index';
import { useEffect } from 'react';
import './Detail.css'
import Card from '../Card/CardDetail';


export default function Detail(props){

    const dispatch = useDispatch();

    useEffect(() =>{
        dispatch(getDetail(props.match.params.id));
    }, [dispatch]);

    const myDog = useSelector((state) => state.detail);

    return( 
        <div >
         <Link to='/home'><button className='buttonHome1' id='home' ><span>Home</span></button></Link>
            {
                myDog.length > 0 ?
                <div className='divDetail'>
              
            <Card 
             name={myDog[0].name} 
             temperaments={myDog[0].temperaments} 
             weightMin={myDog[0].weightMin}
             weightMax={myDog[0].weightMax}
             image={myDog[0].image}
             heightMin={myDog[0].heightMin}
             heightMax={myDog[0].heightMax}
             life_span={myDog[0].life_span}    
             />

                </div>
                :  <div className='loading'>
                        <h1><strong>Loading</strong></h1>
                    </div>
                
            }

        </div>  

      
     
    )
} 