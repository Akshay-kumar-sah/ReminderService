const express = require('express');
const bodyParser = require('body-parser');
const {PORT} = require('./config/serverConfig');
const {createChannel} = require('./utils/messageQueue');

const {sendBasicEmail} = require('./services/email-service');
//const schedule = require('node-schedule');
const jobs = require('./utils/job');
const TicketController = require('./controllers/ticket-controller');
const {subscribeMessage} = require('./utils/messageQueue');
const {REMINDER_BINDING_KEY} = require('./config/serverConfig');
const emailService = require('./services/email-service');

const setupAndStartServer = async () => {

    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    const channel = await createChannel();
    subscribeMessage(channel, emailService.subscribeEvents, REMINDER_BINDING_KEY);

    app.post('/api/v1/tickets',TicketController.create);

    app.listen(PORT, ()=>{
     console.log(`Server Started at port ${PORT}`);


    // jobs();

    //  sendBasicEmail(
    //     'akki19082001@gmail.com',
    //     'mailsenderflynow@gmail.com',
    //     'This mail for testing purpose',
    //     'I hope you like the support'

    // );

  


    });

   
}


setupAndStartServer();