const getApiInfo = require('../controller/getApiInfo');
const getDbInfo = require('../controller/getDbInfo');

const getAllDogs = async () =>{
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const infoTotal = apiInfo.concat(dbInfo);
    return infoTotal;
}

module.exports = getAllDogs;