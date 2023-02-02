const {Dog, Temperament} = require('../db.js');

const getDbInfo = async () =>{
    return await Dog.findAll({
        include:{
            model: Temperament,
            attributes: ['name'], //esto es lo unico que me va a dar del modelo temperament
            through:{
                attributes: [],
            }
        }
    });
}

module.exports = getDbInfo;