//adding links to the html file, express is rendering html
const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
//we're adding a link to the html file for the button
router.post("/sendText/:travelTime/:rawTime", function (req, res) {
    console.log('travelTime:', req.params.travelTime)
    console.log('rawTime:', req.params.rawTime)
    var tTime = req.params.travelTime

    buttonAction1(res, tTime);
    console.log(tTime)
});
//link to the html file as a whole
router.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/index.html'));
  });
//twilio api information as a function when button on html file is clicked
function buttonAction1(res, tTime){
    console.log("running test function")
    const accountSid = 'ACc1bcb5b9402e67ef201df3937f522ebe';
    const authToken = 'ad0278c4e2c2c787cc44616f5b3d9c25';
    const client = require('twilio')(accountSid, authToken);
    client.messages
    .create({
        body: 'Your journey is going to take about '+tTime,
        from: '+12766334501',
        to: '+13053047050'
    })
    .then(message => console.log(message.sid));
}
//setting up localhost
app.use('/', router);
app.listen(process.env.port || 3000);
//port that localhost is running on
console.log('Running at Port 3000');