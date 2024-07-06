const {TicketRepository} = require('../repositories');
const {Mailer} = require('../config')
const {StatusCodes} = require('http-status-codes');
const AppError = require('../utils/errors/app-error');

const ticketRepository = new TicketRepository();

async function sendEmail(mailFrom,mailTo,subject,text){
    try {
        const response = Mailer.sendMail({
            from: mailFrom,
            to: mailTo,
            subject: subject,
            text: text
        });
        return response;     
    } catch (error) {
        console.log(error);
        throw new AppError('Cannot send the mail', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}


async function createTicket(data){
    try {
        const ticket = await ticketRepository.create(data);
        return ticket;
    } catch (error) {
        throw new AppError('Cannot create a new Ticket', StatusCodes.INTERNAL_SERVER_ERROR); 
    }
}

async function getPendingEmail(){
    try {
        const response = await ticketRepository.getPendingTicket();
        return response;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError("Not Pending emails present",error.statusCode);
        }
        throw new AppError('Cannot fetch Pending Emails.',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports={
    sendEmail,
    createTicket,
    getPendingEmail
}
