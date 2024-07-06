const { StatusCodes } = require('http-status-codes');
const {FlightService} =require('../services');
const {SuccessResponse, ErrorResponse} = require('../utils/common');

async function createFlight(req,res){
    try {
        const flight = await FlightService.createFlight({
            flightNumber: req.body.flightNumber,
            airplaneId: req.body.airplaneId,
            departureAirportId: req.body.departureAirportId,    
            arrivalAirportId: req.body.arrivalAirportId,
            arrivalTime: req.body.arrivalTime,
            departureTime: req.body.departureTime,
            price: req.body.price,
            boardingGate: req.body.boardingGate,
            totalSeats: req.body.totalSeats
        });
        SuccessResponse.message = "Successfully created an Flight";
        SuccessResponse.data = flight;
        return res
          .status(StatusCodes.CREATED)
          .json(SuccessResponse);       
    } catch (error) {
      ErrorResponse.message = "Something went wrong";
      ErrorResponse.error = error;
        return res
          .status(error.statusCode)
          .json(ErrorResponse);  

        
    }
}

async function getAllFlights(req,res){
  try {
      const flights = await FlightService.getAllFlights(req.query);
      SuccessResponse.message = "Successfully Fetched data of available Flights";
      SuccessResponse.data = flights;
      return res
        .status(StatusCodes.CREATED)
        .json(SuccessResponse);       
  } catch (error) {
    ErrorResponse.message = "Something went wrong";
    ErrorResponse.error = error;
      return res
        .status(error.statusCode)
        .json(ErrorResponse);  

      
  }
}

async function getFlight(req,res){
  try {
    const flight = await FlightService.getFlight(req.params.id);
    SuccessResponse.message = "Successfully fetched the data of the Flight.";
    SuccessResponse.data= flight;
    return res
     .status(StatusCodes.OK)
     .json(SuccessResponse);
  } catch (error) {
    ErrorResponse.message = "Something went wrong";
    ErrorResponse.error = error;
    return res
     .status(error.statusCode)
     .json(ErrorResponse);
  }
}

async function updateSeats(req,res){
  try {
    const flight = await FlightService.updateSeats({
      flightId: req.params.id,
      seats: req.body.seats,
      dec: req.body.dec
    }
    )
    SuccessResponse.message = "Successfully updated the seats in the Flight.";
    SuccessResponse.data= flight;
    return res
     .status(StatusCodes.OK)
     .json(SuccessResponse);
  } catch (error) {
    ErrorResponse.message = "Something went wrong";
    ErrorResponse.error = error;
    return res
     .status(error.statusCode)
     .json(ErrorResponse);
  }
}



module.exports = {
    createFlight,
    getAllFlights,
    getFlight,
    updateSeats
}