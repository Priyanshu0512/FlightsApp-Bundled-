const { StatusCodes } = require("http-status-codes");
const { FlightRepository } =require('../repositories');
const AppError = require('..//utils/errors/app-error');
const {compareTime} =require('../utils/helpers/datetime_helper');
const {Op} = require('sequelize');

const flightRepository = new FlightRepository();

async function createFlight(data){
    try {
            const flight = await flightRepository.create(data);
            return flight;  
    } catch (error) {
        if(error.name == 'SequelizeValidationError' || error.name == 'SequelizeUniqueConstraintError'){
            let explanation=[];
            error.errors.forEach((err)=>{
                explanation.push(err.message);
            });
            throw new AppError(explanation,StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot create New Flight Object',StatusCodes.INTERNAL_SERVER_ERROR);      
    }
}

async function getAllFlights(query){
    let customFilter = {};
    let sortFilter=[];
    const endingTripTime = " 23:59:00";
    if(query.trips){
        [departureAirportId, arrivalAirportId] = query.trips.split("-");
        if(departureAirportId == arrivalAirportId){
            throw new AppError('Departure and Arrival Airports cannot be same', StatusCodes.BAD_REQUEST);
        }
        customFilter.departureAirportId= departureAirportId;
        customFilter.arrivalAirportId= arrivalAirportId;
    }
    if(query.price){
        [minPrice, maxPrice] = query.price.split("-");
        customFilter.price ={
            [Op.between]: [minPrice, ((maxPrice == undefined) ? 20000 : maxPrice)]
        }
    }
    if(query.tripDate) {
        customFilter.departureTime = {
            [Op.between]: [query.tripDate, query.tripDate + endingTripTime]
        }
    }
    if(query.sort){
        const params = query.sort.split(",");
        const sortFilters = params.map((param)=> param.split("_"));
        sortFilter=sortFilters;

    }
    if(query.travelers){
        customFilter.totalSeats={
            [Op.gte] : query.travelers
        }
    }
    try {
        const flights = await flightRepository.getAllFlights(customFilter,sortFilter)
        return flights;       
    } catch (error) {
        throw new AppError('Cannot get the data of the Flights', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getFlight(id){
    try {
            const flight = await flightRepository.get(id);
            return flight;      
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND){
                throw new AppError("Flight Not found",error.statusCode);
        }
        throw new AppError('Cannot fetch the Flight data',StatusCodes.INTERNAL_SERVER_ERROR);       
    }
}

async function updateSeats(data){
    try {
            const flight = await flightRepository.updateRemainingSeats(data.flightId,data.seats,data.dec);
            return flight;      
    } catch (error) {
        throw new AppError('Cannot update the Seats.',StatusCodes.INTERNAL_SERVER_ERROR);       
    }
}
    


module.exports={
    createFlight,
    getAllFlights,
    getFlight,
    updateSeats

}
