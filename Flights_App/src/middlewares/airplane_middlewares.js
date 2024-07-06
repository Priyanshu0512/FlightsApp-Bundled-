const {StatusCodes, BAD_REQUEST} = require('http-status-codes');
const { ErrorResponse} = require('../utils/common');
const AppError = require('../utils/errors/app-error');

function validateCreateRequest(req,res,next){
    if(!req.body.modelNumber){
        ErrorResponse.message= "Something went wrong while creating the Airplane.";
        ErrorResponse.error= new AppError(["Model Number not found in the correct form in the upcoming request."],StatusCodes.BAD_REQUEST);
        return res
                  .status(StatusCodes.BAD_REQUEST)
                  .json(ErrorResponse);
    }
    next();
}

function validateupdateRequest(req,res,next){
    if(!req.body.capacity){
        ErrorResponse.message= "Something went wrong while updating the Airplane.";
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