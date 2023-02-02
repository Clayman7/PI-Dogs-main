const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios');
const {Dog, Temperament} = require('../db.js');
const getAllDogs = require('../controller/getAllDogs');
const getTemperaments = require('../controller/getTemperaments');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

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
        life_span: life_span + ' años',
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
