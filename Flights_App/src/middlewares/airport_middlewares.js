const {StatusCodes} = require('http-status-codes');
const { ErrorResponse} = require('../utils/common');
const AppError = require('../utils/errors/app-error');

function validateCreateRequest(req,res,next){
    if(!req.body.name){
        ErrorResponse.message= "Something went wrong while creating the Airport.";
        ErrorResponse.error= new AppError(["Name was not found in the correct form in the upcoming request."],StatusCodes.BAD_REQUEST);
        return res
                  .status(StatusCodes.BAD_REQUEST)
                  .json(ErrorResponse);
    }
    if(!req.body.code){
        ErrorResponse.message= "Something went wrong while creating the Airport.";
        ErrorResponse.error= new AppError(["Airport Code not found in the correct form in the upcoming request."],StatusCodes.BAD_REQUEST);
        return res
                  .status(StatusCodes.BAD_REQUEST)
                  .json(ErrorResponse);
    }
    if(!req.body.cityId){
        ErrorResponse.message= "Something went wrong while creating the Airport.";
        ErrorResponse.error= new AppError(["CityId not found in the correct form in the upcoming request."],StatusCodes.BAD_REQUEST);
        return res
                  .status(StatusCodes.BAD_REQUEST)
                  .json(ErrorResponse);
    }
    next();
}

function validateupdateRequest(req,res,next){
    if(!req.body.name && ! req.body.code && !req.body.cityId && ! req.body.address){
        ErrorResponse.message= "Something went wrong while updating the Airport.";
        ErrorResponse.error= new AppError(["Empty update Request"],StatusCodes.BAD_REQUEST);
        return res
                  .status(StatusCodes.BAD_REQUEST)
                  .json(ErrorResponse);
    }
    
    next();
}
module.exports={
    validateCreateRequest,
    validateupdateRequest
}