const { StatusCodes } = require('http-status-codes');
const { AirplaneRepository} = require('../repositories');
const AppError = require('../utils/errors/app-error');

const airplaneRepository = new AirplaneRepository();

async function createAirplane(data){
    try {
        const airplane = await airplaneRepository.create(data);
        return airplane;       
    } catch (error) {
        if(error.name == 'SequelizeValidationError'){
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);
                
            });
            console.log(explanation);
            throw new AppError(explanation,StatusCodes.BAD_REQUEST);
        }
        throw new AppError("Cannot create a new Airplane Object",StatusCodes.INTERNAL_SERVER_ERROR);   
    }  
}

async function getAirplanes(){
    try{
        const airplanes = await airplaneRepository.getAll();
        return airplanes;
    } catch(error){
        throw new AppError("Cannot fetch data of the airplanes.",StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAirplane(id){
    try{
        const airplane = await airplaneRepository.get(id);
        return airplane;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError("Airplane Not Found",error.statusCode);
        }
        throw new AppError("Cannot fetch the Airplane data",StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function deleteAirplane(id){
    try{
        const airplane = await airplaneRepository.destroy(id);
        return airplane;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError("Cannot Delete the Airplane as it is not present",error.statusCode);
        }
        throw new AppError("Cannot delete the Airplane data",StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function updateAirplane(id,data){
    try{
        const airplane = await airplaneRepository.update(id,data);
        return airplane;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError("Cannot Update the Airplane as it is not present",error.statusCode);
        }
        throw new AppError("Cannot fetch the Airplane data",StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
module.exports={
    createAirplane,
    getAirplanes,
    getAirplane,
    deleteAirplane,
    updateAirplane
}