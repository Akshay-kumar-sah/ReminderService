const express = require('express');
const bodyParser = require('body-parser');
const {PORT} = require('./config/serverConfig');

const {sendBasicEmail} = require('./services/email-service');
const schedule = require('node-schedule');
const setupAndStartServer = () => {

    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));


    app.listen(PORT, ()=>{
     console.log(`Server Started at port ${PORT}`);


    //  sendBasicEmail(
    //     'akki19082001@gmail.com',
    //     'mailsenderflynow@gmail.com',
    //     'This mail for testing purpose',
    //     'I hope you like the support'

    // );

    const job = schedule.scheduleJob('*/2 * * * *', function(){
        console.log('running a job at every 2 min');
      });

    });

   
}


setupAndStartServer();