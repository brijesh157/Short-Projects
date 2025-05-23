const express = require("express")
const app = express();
const bodyParser = require("body-parser");


const twilio = require('twilio');
const port = process.env.PORT || 3000;

const accountSid = "YOUR_ACCOUNT_SID";
const authToken = "YOUR_AUTH_TOKEN";
const client = twilio(accountSid, authToken);


//app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));
// The above code works only when the Content-Type is : application/x-www-form-urlencoded

//app.use(bodyParser.json());
//Similarly, The above code works only when the Content-Type is : application/json


app.post("/send-sms", (req, res) => {
    const { to, body } = req.body;

    client.messages.create({
        body: body,
        to: to,
        from: "YOUR_TWILIO_PHONE_NUMBER"
    })
        .then(() => {
            res.send("SMS sent successfully");
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send("Error sending SMS " + err.message);
        })
})


app.listen(3000, () => {
    console.log(`Listening on port : ${port}`);
})