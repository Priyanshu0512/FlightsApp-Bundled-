const { StatusCodes } = require('http-status-codes');
const {AirportService,} =require('../services');
const {SuccessResponse, ErrorResponse} = require('../utils/common');

async function createAirport(req,res){
    try {
        const airport = await AirportService.createAirport({
            name: req.body.name,
            code: req.body.code,
            address: req.body.address,
            cityId: req.body.cityId
        });
        SuccessResponse.message = "Successfully created an Airport";
        SuccessResponse.data = airport;
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

async function getAirports(req,res){
   try{
        const airports= await AirportService.getAirports();
        SuccessResponse.message = "Successfully fetched the data of all Airports.";
        SuccessResponse.data = airports;
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

async function getAirport(req,res){
  try{
       const airport= await AirportService.getAirport(req.params.id);
       SuccessResponse.message = "Successfully fetched the data of the  Airport.";
       SuccessResponse.data = airport;
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

async function deleteAirport(req,res){
  try{
       const airport= await AirportService.deleteAirport(req.params.id);
       SuccessResponse.message = "Successfully deleted the Airplane.";
       SuccessResponse.data = airport;
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

async function updateAirport(req,res){
  try{
        const updateObject={};
        if(req.body.name) updateObject.name = req.body.name;
        if(req.body.code) updateObject.code = req.body.code;
        if(req.body.cityId) updateObject.cityId = req.body.cityId;
        if(req.body.address) updateObject.address = req.body.address;
        console.log(updateObject);
       const airport= await AirportService.updateAirport(req.params.id,
        updateObject);

       SuccessResponse.message = "Successfully updated the Airport.";
       SuccessResponse.data = airport;
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
    createAirport,
    getAirport,
    getAirports,
    deleteAirport,
    updateAirport
}