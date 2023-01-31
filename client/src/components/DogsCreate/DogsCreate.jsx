import React, {useEffect, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import { getAllTemperaments, postDogs } from '../../Redux/actions/index';
import {useDispatch, useSelector} from 'react-redux';
import './DogsCreate.css'

function validate(input) {
    let errors = {};
    if (!input.name) {
        errors.name = 'Su raza debe tener nombre,';
    }
    else if (input.name.length > 30) {
        errors.name = 'El nombre es demasiado largo.';
    }
    else if (!input.heightMin) {
        errors.heightMin = 'La altura minima es obligatoria.';
    }
    else if (isNaN(parseInt(input.heightMin))) {
        errors.heightMin = 'La altura minima debe ser un número.';
    }
    else if (input.heightMin <= 0) {
        errors.heightMin = 'La altura minima no puede ser menor a 0.';
    }
    else if (parseInt(input.heightMin) >= parseInt(input.heightMax)) {
        errors.heightMin = 'La altura minima debe ser menor a la maxima';
    }
    else if (!input.heightMax) {
        errors.heightMax = 'La altura maxima es obligatoria.';
    }
    else if (isNaN(parseInt(input.heightMax))) {
        errors.heightMax = 'La altura maxima debe ser un número';
    }
    else if (input.heightMax > 150) {
        errors.heightMax = 'La altura maxima no puede ser mayor a 150.';
    }
    else if (!input.weightMin) {
        errors.weightMin = 'El peso minimo es obligatorio.';
    }
    else if (isNaN(parseInt(input.weightMin))) {
        errors.weightMin = 'El peso minimo debe ser un número.';
    }
    else if (input.weightMin <= 0) {
        errors.weightMin = 'El peso minimo debe ser mayor a 0. ';
    }
    else if (!input.weightMax) {
        errors.weightMax = 'El peso maximo es obligatorio.';
    }
    else if (isNaN(parseInt(input.weightMax))) {
        errors.weightMax = 'El peso maximo debe ser un número.';
    }
    else if (parseInt(input.weightMax) <= parseInt(input.weightMin)) {
        errors.weightMax = 'El peso maximo debe ser superior al minimo.';
    }
    else if (input.weightMax > 200) {
        errors.weightMax = 'El peso maximo no debe ser mayor a 200.';
    }
    else if (!input.life_span) {
        errors.life_span = 'El promedio de vida es obligatorio.';
    }
    else if (isNaN(parseInt(input.life_span))) {
        errors.life_span = 'El promedio de vida debe ser un numero';
    }
    else if (input.life_span > 50) {
        errors.life_span = 'El promedio de vida no puede ser mayor a 50';
    }
    else if (input.life_span <= 0) {
        errors.life_span = 'El promedio de vida debe ser mayor a 0';
    }

    return errors;
}

export default function DogCreate() {

    const dispatch = useDispatch();
    const history = useHistory();
    const allTemperaments = useSelector((state) => state.temperaments);

    const [errors, setErrors] = useState({});

    const [input, setInput] = useState({
        name: '',
        heightMin: '',
        heightMax: '',
        weightMin: '',
        weightMax: '',
        life_span: '',
        temperaments: [],
        image: '',
    });

    useEffect(() => {
        dispatch(getAllTemperaments());
    },[dispatch]);

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
        // Esta función hace lo siguiente:
        // Cada vez que modifique o agregue algo, a mi estado input, además de lo que tiene, le agrega
        // el value de lo que se esté modificando. La idea es que a medida que vaya llenando los inputs
        // del formulario, me vaya modificando el estado inicial, que tiene todas las propiedades vacías.

        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value,
        }));

        console.log(input)
    }

    function handleSelect(e) {
        if (!input.temperaments.includes(e.target.value)) {
            setInput({
                ...input,
                temperaments: [...input.temperaments, e.target.value]
            });
            console.log(input);
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log(errors);
        if (!Object.getOwnPropertyNames(errors).length && input.name && input.heightMin && input.heightMax && input.weightMin && input.weightMax && input.life_span && input.temperaments.length) {
            dispatch(postDogs(input));
            alert('¡Perro creado con exito!');
            setInput({
                name: '',
                heightMin: '',
                heightMax: '',
                weightMin: '',
                weightMax: '',
                life_span: '',
                temperaments: [],
                image: '',
            });
            history.push('/home');
        } else {
            alert('Doggie can´t be created with these data 🤷‍♂️')
        }
    }

    function handleDeleteTemperament(el) {
        setInput({
            ...input,
            temperaments: input.temperaments.filter(temp => temp !== el)
        })
    }

    return (
        <div className='divCreate'>
            <Link to='/home'>
            <button className='buttonHome'>Home</button>
            </Link>
            <h1>Crea tu propia raza de canina</h1>
            <form onSubmit={e => handleSubmit(e)}>
                <div>
                    <label><strong>Nombre: </strong></label>
                    <input type='text' value={input.name} name='name' onChange={e => handleChange(e)} />
                    {errors.name && (
                        <p className='error'><strong>{errors.name}</strong></p>
                    )}
                </div>
                <div>
                    <label><strong>Altura minima: </strong></label>
                    <input type='text' value={input.heightMin} name='heightMin' onChange={e => handleChange(e)} />
                    <label><strong> cm</strong></label>
                    {errors.heightMin && (
                        <p className='error'><strong>{errors.heightMin}</strong></p>
                    )}
                </div>
                <div>
                    <label><strong>Altura maxima: </strong></label>
                    <input type='text' value={input.heightMax} name='heightMax' onChange={e => handleChange(e)} />
                    <label><strong> cm</strong></label>
                    {errors.heightMax && (
                        <p className='error'><strong>{errors.heightMax}</strong></p>
                    )}
                </div>
                <div>
                    <label><strong>Peso minimo: </strong></label>
                    <input type='text' value={input.weightMin} name='weightMin' onChange={e => handleChange(e)} />
                    <label><strong> kg</strong></label>
                    {errors.weightMin && (
                        <p className='error'><strong>{errors.weightMin}</strong></p>
                    )}
                </div>
                <div>
                    <label><strong>Peso maximo: </strong></label>
                    <input type='text' value={input.weightMax} name='weightMax' onChange={e => handleChange(e)} />
                    <label><strong> kg</strong></label>
                    {errors.weightMax && (
                        <p className='error'><strong>{errors.weightMax}</strong></p>
                    )}
                </div>
                <div>
                    <label><strong>Expectativa de vida: </strong></label>
                    <input type='text' value={input.life_span} name='life_span' onChange={e => handleChange(e)} />
                    <label><strong> years</strong></label>
                    {errors.life_span && (
                        <p className='error'><strong>{errors.life_span}</strong></p>
                    )}
                </div>
                <div>
                    <label><strong>Imagen: </strong></label>
                    <input type='text' value={input.image} name='image' onChange={e => handleChange(e)} />
                </div>
                <div>
                    <select onChange={e => handleSelect(e)} >
                        <option value='selected' hidden >Temperamentos</option>
                        {allTemperaments?.sort(function (a, b) {
                            if (a.name < b.name) return -1;
                            if (a.name > b.name) return 1;
                            return 0;
                        }).map(temp => {
                            return (
                                <option value={temp.name} key={temp.id}>{temp.name}</option>
                            )
                        })}
                    </select>

                    {input.temperaments.map(el => {
                        return (
                            
                                <ul className='allTemps' key={el}>
                                    <li>
                                        <p className='temp'><strong>{el}</strong></p>
                                        <button onClick={() => handleDeleteTemperament(el)} >X</button>
                                    </li>
                                </ul>
                            
                        )
                    })}

                </div>
                <button type='submit' className='boop' ><strong>Crear</strong></button>

            </form>

        </div>
    )
}