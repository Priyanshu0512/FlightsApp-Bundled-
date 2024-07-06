const { StatusCodes } = require('http-status-codes');
const {AirplaneService} =require('../services');
const {SuccessResponse, ErrorResponse} = require('../utils/common');

async function createAirplane(req,res){
    try {
        const airplane = await AirplaneService.createAirplane({
            modelNumber: req.body.modelNumber,
            capacity: req.body.capacity
        });
        SuccessResponse.message = "Successfully created an Airplane.";
        SuccessResponse.data = airplane;
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

async function getAirplanes(req,res){
   try{
        const airplanes= await AirplaneService.getAirplanes();
        SuccessResponse.message = "Successfully fetched the data of all Airplanes.";
        SuccessResponse.data = airplanes;
        return res
          .status(StatusCodes.OK)
          .json(SuccessResponse);
   } catch (error){
       ErrorResponse.message = "Something went wrong";
       ErrorResponse.error = error;
       return res
           .status(error.statusCode)
           .json(ErrorResponse);
   }
}

async function getAirplane(req,res){
  try{
       const airplane= await AirplaneService.getAirplane(req.params.id);
       SuccessResponse.message = "Successfully fetched the data of the  Airplane.";
       SuccessResponse.data = airplane;
       return res
         .status(StatusCodes.OK)
         .json(SuccessResponse);
  } catch (error){
      ErrorResponse.message = "Something went wrong";
      ErrorResponse.error = error;
      return res
          .status(error.statusCode)
          .json(ErrorResponse);
  }
}

async function deleteAirplane(req,res){
  try{
       const airplane= await AirplaneService.deleteAirplane(req.params.id);
       SuccessResponse.message = "Successfully deleted the Airplane.";
       SuccessResponse.data = airplane;
       return res
         .status(StatusCodes.OK)
         .json(SuccessResponse);
  } catch (error){
      ErrorResponse.message = "Something went wrong";
      ErrorResponse.error = error;
      return res
          .status(error.statusCode)
          .json(ErrorResponse);
  }
}

async function updateAirplane(req,res){
  try{
       const airplane= await AirplaneService.updateAirplane(req.params.id,
        {capacity: req.body.capacity});
       SuccessResponse.message = "Successfully updated the Airplane.";
       SuccessResponse.data = airplane;
       return res
         .status(StatusCodes.OK)
         .json(SuccessResponse);
  } catch (error){
      ErrorResponse.message = "Something went wrong";
      ErrorResponse.error = error;
      return res
          .status(error.statusCode)
          .json(ErrorResponse);
  }
}


module.exports = {
    createAirplane,
    getAirplanes,
    getAirplane,
    deleteAirplane,
    updateAirplane
}