//Dependencies
const express = require('express');
const twilio = require('twilio');
const cors = require('cors');

//twilio requirements for sms api
const accountSid = 'ACb2bd82d32f4c2bb888cb0a269c5a8674';
const authToken = 'a30b13ae884df97a66c38a6d93059fca';
const client = require('twilio')(accountSid, authToken);

const app = express(); //alias

app.use(cors()); //blocks the browser from restricting any data

app.get('/',(req,res) => {
    res.send('Welcome to the express server');
}); 

//send sms from twilio
app.get('/send-text',(req,res)=>{
    const {recipent, textmessage} = req.query;

    client.messages.create({
        body: textmessage,
        to: recipent,
        from: '+12027966420' //from twilio
    }).then((message)=> console.log(message.sid));
})

//must have nodemon installed
app.listen(4000, ()=>console.log("Running on port 4000"));