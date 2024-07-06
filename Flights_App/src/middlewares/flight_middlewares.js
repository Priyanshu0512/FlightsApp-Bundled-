const {StatusCodes} = require('http-status-codes');
const { ErrorResponse} = require('../utils/common');
const AppError = require('../utils/errors/app-error');

function validateCreateRequest(req,res,next){
    if(!req.body.flightNumber){
        ErrorResponse.message= "Something went wrong while creating the Flight.";
        ErrorResponse.error= new AppError(["Flight Number was not found in the correct form in the upcoming request."],StatusCodes.BAD_REQUEST);
        return res
                  .status(StatusCodes.BAD_REQUEST)
                  .json(ErrorResponse);
    }
    if(!req.body.airplaneId){
        ErrorResponse.message= "Something went wrong while creating the Flight.";
        ErrorResponse.error= new AppError(["Airplane Id Code not found in the correct form in the upcoming request."],StatusCodes.BAD_REQUEST);
        return res
                  .status(StatusCodes.BAD_REQUEST)
                  .json(ErrorResponse);
    }
    if(!req.body.departureAirportId){
        ErrorResponse.message= "Something went wrong while creating the Flight.";
        ErrorResponse.error= new AppError(["Departure Airport Id not found in the correct form in the upcoming request."],StatusCodes.BAD_REQUEST);
        return res
                  .status(StatusCodes.BAD_REQUEST)
                  .json(ErrorResponse);
    }
    if(!req.body.arrivalAirportId){
        ErrorResponse.message= "Something went wrong while creating the Flight.";
        ErrorResponse.error= new AppError(["Arrival Airport Id not found in the correct form in the upcoming request."],StatusCodes.BAD_REQUEST);
        return res
                  .status(StatusCodes.BAD_REQUEST)
                  .json(ErrorResponse);
    }
    if(!req.body.arrivalTime){
        ErrorResponse.message= "Something went wrong while creating the Flight.";
        ErrorResponse.error= new AppError(["Arrival Time not found in the correct form in the upcoming request."],StatusCodes.BAD_REQUEST);
        console.log(req.body.arrivalTime);
        return res
                  .status(StatusCodes.BAD_REQUEST)
                  .json(ErrorResponse);
    }
    if(!req.body.departureTime){
        ErrorResponse.message= "Something went wrong while creating the Flight.";
        ErrorResponse.error= new AppError(["Departure Time not found in the correct form in the upcoming request."],StatusCodes.BAD_REQUEST);
        return res
                  .status(StatusCodes.BAD_REQUEST)
                  .json(ErrorResponse);
    }
    if(!req.body.price){
        ErrorResponse.message= "Something went wrong while creating the Flight.";
        ErrorResponse.error= new AppError(["Price not found in the correct form in the upcoming request."],StatusCodes.BAD_REQUEST);
        return res
                  .status(StatusCodes.BAD_REQUEST)
                  .json(ErrorResponse);
    }
    if(!req.body.totalSeats){
        ErrorResponse.message= "Something went wrong while creating the Flight.";
        ErrorResponse.error= new AppError(["Total Seats not found in the correct form in the upcoming request."],StatusCodes.BAD_REQUEST);
        return res
                  .status(StatusCodes.BAD_REQUEST)
                  .json(ErrorResponse);
    }
    next();
}

function validateUpdateSeatsRequest(req,res,next){
    if(!req.body.seats){
        ErrorResponse.message= "Something went wrong while updating seats in the Flight.";
        ErrorResponse.error= new AppError(["Seats was not found in the correct form in the upcoming request."],StatusCodes.BAD_REQUEST);
        return res
                  .status(StatusCodes.BAD_REQUEST)
                  .json(ErrorResponse);
    }
    next();
}
module.exports={
    validateCreateRequest,
    validateUpdateSeatsRequest
}