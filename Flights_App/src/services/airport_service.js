const { StatusCodes } = require("http-status-codes");
const { AirportRepository } =require('../repositories');
const AppError = require('..//utils/errors/app-error')
const airportRepository = new AirportRepository();

async function createAirport(data){
    try {
        const airport = await airportRepository.create(data);
        return airport;    
    } catch (error) {
        if(error.name == 'SequelizeValidationError' || error.name == 'SequelizeUniqueConstraintError'){
            let explanation=[];
            error.errors.forEach((err)=>{
                explanation.push(err.message);
            });
            console.log(explanation);
            throw new AppError(explanation,StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot create New Airport Object',StatusCodes.INTERNAL_SERVER_ERROR);      
    }
}

async function getAirports(){
    try {
         const airports = await airportRepository.getAll();
         return airports;
    } catch (error) {
        throw new AppError('Cannot fetch data of all Airports',StatusCodes.INTERNAL_SERVER_ERROR);     
    }
}

async function getAirport(id){
    try {
         const airport = await airportRepository.get(id);
         return airport;      
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError("Airport Not found",error.statusCode);
        }
        throw new AppError('Cannot fetch the airport data',StatusCodes.INTERNAL_SERVER_ERROR);       
    }
}

async function deleteAirport(id){
    try {
        const airport = await airportRepository.destroy(id);
        return airport;       
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError('Cannot delete the airport as it is not present',error.statusCode)
        }
        throw new AppError('Cannot delete the airport data.',StatusCodes.INTERNAL_SERVER_ERROR);
        
    }
}

async function updateAirport(id,data){
    try{
        const airport= await airportRepository.update(id,data);
        return airport;
    } catch (error) {
        if(error.name == 'SequelizeValidationError' || error.name == 'SequelizeUniqueConstraintError') {
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);
            });
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        else if(error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError('Cannot update the airport as it is not present', error.statusCode);
        }
        throw new AppError("Cannot fetch the Airport data",StatusCodes.INTERNAL_SERVER_ERROR);
    }
}


module.exports={
    createAirport,
    getAirport,
    getAirports,
    deleteAirport,
    updateAirport
}
