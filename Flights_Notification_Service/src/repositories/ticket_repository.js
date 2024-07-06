const CrudRepository = require('./crud_repository');
const {Ticket} = require('../models');

const {Enums} = require('../utils/common');
const {PENDING, SUCCESS, FAILED} = Enums.STATUS_ENUMS;

class TicketRepository extends CrudRepository{
    constructor(){
        super(Ticket)
    }

    async getPendingTicket(){
        const response = await Ticket.findAll({
            where:{
                status: PENDING
            }
        });
        return response;
    }
}

module.exports= TicketRepository;