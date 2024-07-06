const axios = require('axios');
const { StatusCodes } = require("http-status-codes");
const AppError = require('../utils/errors/app-error');
const {BookingRepository} = require('../repositories');
const {ServerConfig,Queue} = require('../config');
const db= require('../models');
const {Enums} =require('../utils/common');
const {BOOKED, CANCELLED} = Enums.BOOKING_STATUS;


const bookingRepository = new BookingRepository();

async function createBooking(data) {
    const transaction = await db.sequelize.transaction();
    try {
        const flight = await axios.get(`${ServerConfig.FLIGHT_SERVICE}/api/v1/flights/${data.flightId}`);
        const flightData = flight.data.data;
        if(data.noOfSeat > flightData.totalSeats) {
            throw new AppError('Not enough seats available', StatusCodes.BAD_REQUEST);
        }
        const totalBillingAmount = data.noOfSeat * flightData.price;
        const bookingPayload = {...data, totalCost: totalBillingAmount};
        const booking = await bookingRepository.create(bookingPayload, transaction);

        await axios.patch(`${ServerConfig.FLIGHT_SERVICE}/api/v1/flights/${data.flightId}/seats`, {
            seats: data.noOfSeat
        });

        await transaction.commit();
        return booking;
    } catch(error) {
        await transaction.rollback();
        throw error;
    }
    
}

async function makePayment(data){
   const transaction = await db.sequelize.transaction();
   try {
      const bookingDetails = await bookingRepository.get(data.bookingId);
      const bookingTime = new  Date(bookingDetails.createdAt);
      const currentTime = new Date();
      if(bookingDetails.status == CANCELLED ){
        throw new AppError('Booking session has expired',StatusCodes.BAD_REQUEST);
      }
      if(currentTime - bookingTime > 300000){
        await cancelBooking(data.bookingId);
        throw new AppError('Booking session has expired.',StatusCodes.BAD_REQUEST);
      }
      if(bookingDetails.totalCost != data.totalCost){
         throw new AppError('Required price not found.',StatusCodes.BAD_REQUEST);
      }
      if(bookingDetails.userId != data.userId){
         throw new AppError('User corresponding to the booking does not match.',StatusCodes.BAD_REQUEST);
      }
      // assuming payment is successful.
      await bookingRepository.update(data.bookingId,{status: BOOKED}, {transaction: transaction});
      await transaction.commit();
      await Queue.sendData({
        recepientEmail: 'abc@gmail.com',
        subject: 'Flight Booked',
        text: `Booking successfully done for the booking ${data.bookingId}`,
    })
   } catch (error) {
      await transaction.rollback();
      throw error;
      
   }
}


async function cancelBooking(bookingId){
    const transaction = await db.sequelize.transaction();
    try {
        const bookingDetails = await bookingRepository.get(bookingId,transaction);
        if(bookingDetails.status == CANCELLED){
            await transaction.commit();
            return true;
        }
        await axios.patch(`${ServerConfig.FLIGHT_SERVICE}/api/v1/flights/${bookingDetails.flightId}/seats`, {
            seats: bookingDetails.noOfSeat,
            dec: 0
        });
        await bookingRepository.update(bookingId,{status: CANCELLED}, {transaction: transaction});
        await transaction.commit();
    } catch (error) {
        await transaction.rollback();
        throw error;     
    }
}

async function cancelOldBookings(){
    try {
         const time = new Date(Date.now() - 300* 1000);
         const response = await bookingRepository.cancelOldBookings(time);
         return response;
    } catch (error) {
        throw error;
        
    }
}



module.exports ={
    createBooking,
    makePayment
}