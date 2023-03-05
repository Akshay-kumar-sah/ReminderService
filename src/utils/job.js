const schedule = require('node-schedule');

const emailService = require('../services/email-service');
const sender = require('../config/emailConfig');

const job =  () => {
    schedule.scheduleJob('*/2 * * * *', async () => {
   // console.log('running a job at every 2 min');

   const response = await emailService.fetchPendingEmails();
   response.forEach((email) => {
   sender.sendMail({
    to:email.recepientEmail,
    subject: email.subject,
    content:email.content
   }, async (err, data) => {

    if(err){
      console.log(err);
    }else{
      console.log(data);
      await emailService.updateTicket(email.id, {status:"SUCCESS"});
    }

   })
   console.log('from job',response);

  });

}

    
)} 

  module.exports = job