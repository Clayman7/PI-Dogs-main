const axios = require('axios');

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

module.exports = getTemperaments;