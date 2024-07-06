const {EmailService} = require('../services');
const {SuccessResponse,ErrorResponse} = require('../utils/common');
const {StatusCodes} = require('http-status-codes');

async function create(req,res){
    try {
          const response = await EmailService.createTicket({
            subject: req.body.subject,
            recepientEmail: req.body.recepientEmail,
            content: req.body.content
          });
          SuccessResponse.message="Successfully created the Ticket.";
          SuccessResponse.data= response;
          return res
                    .status(StatusCodes.CREATED)
                    .json(SuccessResponse)
    } catch (error) {
        ErrorResponse.message= "Something went wrong";
        ErrorResponse.error = error;
        return res
                  .status(error.statusCode)
                  .json(ErrorResponse)
        
    }
}

module.exports={
    create
}