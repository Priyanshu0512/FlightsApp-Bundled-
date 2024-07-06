const {ServerConfig,Logger} = require('./config');
const express = require('express');
const app =express();
const apiRoutes =require('./routes');
const amqplib= require('amqplib');
const {EmailService} = require('./services')


app.use(express.json());
app.use(express.urlencoded({extended: true}));


async function connectQueue(){
    try {
        const connection =  await amqplib.connect('amqp://127.0.0.1');
        const channel = await connection.createChannel();
        await channel.assertQueue('noti-queue');
        channel.consume('noti-queue',async (data)=>{
            const object =JSON.parse(`${Buffer.from(data.content)}`);
            await EmailService.sendEmail(ServerConfig.GMAIL_EMAIL,object.recepientEmail, object.subject,object.text);
            channel.ack(data);
        })
        
    } catch (error) {
        console.log(error);
    }
}

app.use('/api',apiRoutes);

app.listen(ServerConfig.PORT, async function exec(){
    console.log(`Successfully started the server on ${ServerConfig.PORT}`);
    Logger.info("Success",{});
    await connectQueue();
    console.log("queue is up");
})