const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios');
const {Dog, Temperament} = require('../db.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//esta funcion trae la info de la api
const getApiInfo = async () =>{
    const apiUrl = await axios.get('https://api.thedogapi.com/v1/breeds');
    const apiInfo = await apiUrl.data.map((el) =>{
        return{
            id: el.id,
            name: el.name,
            heightMin: el.height.metric.split(' - ')[0],
            heightMax: el.height.metric.split(' - ')[1] ?
                el.height.metric.split(' - ')[1] :
                Math.round(el.height.metric.split(' - ')[0] * 1.1),
            weightMin: el.weight.metric.split(' - ')[0] !== "NaN" ?
                el.weight.metric.split(' - ')[0] :
                (el.weight.metric.split(' - ')[1] ?
                    Math.round(el.weight.metric.split(' - ')[1] * 0.6) :
                    '30'),//Math.round(el.weight.imperial.split(' - ')[1] * 0.6 / 2.205).toString()),
            weightMax: el.weight.metric.split(' - ')[1] ?
                el.weight.metric.split(' - ')[1] :
                '39',//Math.round(parseInt(el.weight.imperial.split(' - ')[1]) / 2.205).toString(),
            life_span: el.life_span,
            temperaments: el.temperament,
            image: el.image.url
        }
    });

    

    return apiInfo;
}

//esta funcion trae la info de la db
const getDbInfo = async () =>{
    return await Dog.findAll({
        include:{
            model: Temperament,
            attributes: ['name'], //esto es lo unico que me va a atraer del modelo temperament
            through:{
                attributes: [],
            }
        }
    });
}

const getAllDogs = async () =>{
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const infoTotal = apiInfo.concat(dbInfo);
    return infoTotal;
}


//extraer temperamentos
const getTemperaments = async () => {

        const allDogs = await axios.get('https://api.thedogapi.com/v1/breeds');
        const temperaments = allDogs.data.map(e=> e.temperament).toString();
        const temp_Space = temperaments.split(',');

        const temp_Ok= temp_Space.map( e => {
            if (e[0]===' ') {
                return e.split(' ')[1]
            }
            return e
        })
        const allTemperaments = temp_Ok.filter( e => e!='')
        return allTemperaments
}



//------------------------Rutas-------------------------
//ruta que devuelve todos los perros o uno con un nombre en especifico
router.get('/dogs', async (req, res) =>{
    const name = req.query.name;
    let dogsTotal = await getAllDogs();
    if(name){
        let dogsName = await dogsTotal.filter(el => el.name.toLowerCase().includes(name.toLowerCase()));
        dogsName.length ?
        res.status(200).send(dogsName) :
        res.status(404).send("No existe el perro");
    }else{
        res.status(200).send(dogsTotal);
    }
});


//ruta que devuelve perros por id
router.get('/dogs/:id', async (req, res) =>{
    try{
        const{id} = req.params;
        const dogsT = await getAllDogs();
        
        if(id){
            let dogId = await dogsT.filter( (e) => e.id == id);
            dogId.length ? res.status(200).send(dogId) : res.status(404).send("Perro no encontrado");
        }

    }catch(error){
        res.status(200).send(error);
    }
});

//ruta para crear un nuevo perro
router.post('/dogs', async (req, res) =>{
    let {
        name,
        heightMin,
        heightMax,
        weightMin,
        weightMax,
        life_span,
        temperaments,
        image,
    } = req.body;

        let dogsCreated = await Dog.create({
        name,
        heightMin,
        heightMax,
        weightMin,
        weightMax,
        life_span: life_span + ' years',
        image,
        });

        let temperamentDb = await Temperament.findAll({
            where: {name : temperaments}
        })

        dogsCreated.addTemperament(temperamentDb);
        res.send('Perro creado con exito');
});


//ruta que devuelve los temperamentos

router.get('/temperaments', async (req, res) =>{
    //const temperamentsApi = await axios.get('https://api.thedogapi.com/v1/breeds');
    try {
        const allTemperaments = await getTemperaments();

        allTemperaments.forEach( temperament => {
            Temperament.findOrCreate({
                where: {
                    name: temperament
                }
            })
        })

        const temperamentInDb = await Temperament.findAll()

        res.status(200).json(temperamentInDb)
    } catch (error) {
        res.status(404).json({error: error.message})
    }
});  



module.exports = router;
