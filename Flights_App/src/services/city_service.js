const {StatusCodes} = require('http-status-codes');
const {CityRepository} = require('../repositories');
const AppError = require('../utils/errors/app-error');

const cityRepository = new CityRepository();

async function createCity(data){
    try {
        const city = await cityRepository.create(data);
        return city;       
    } catch (error) {
        if(error.name == 'SequelizeValidationError' || error.name =='SequelizeUniqueConstraintError'){
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);            
            });
            console.log(explanation);
            throw new AppError(explanation,StatusCodes.BAD_REQUEST);
        }
        throw new AppError("Cannot create a new City Object",StatusCodes.INTERNAL_SERVER_ERROR);   
    }
}

async function deleteCity(id){
    try{
        const city = await cityRepository.destroy(id);
        return city;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError("Cannot Delete the City as it is not present",error.statusCode);
        }
        throw new AppError("Cannot fetch the Airplane data",StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function updateCity(id,data){
    try{
        const city = await cityRepository.update(id,data);
        return city;
    } catch(error) {
        if(error.name == 'SequelizeValidationError' || error.name == 'SequelizeUniqueConstraintError') {
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);
            });
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        else if(error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError('Cannot update the city as it is not present', error.statusCode);
        }

        throw new AppError('Cannot update the city object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}


module.exports={
    createCity,
    deleteCity,
    updateCity
}

