const express = require('express');
const raspividStream = require('raspivid-stream');
const app = express();
const wss = require('express-ws')(app);
const controller = require('./controllers/controller.js');
const sensor = require('ds18b20-raspi');
const temps = sensor.readAllC(2);
console.log(temps);

const dht = require('node-dht-sensor');
dht.read(11, 4, (err, temp, hum) =>{
  if (!err) {
console.log(temp + " " + hum);
  }
	else{
		console.log(err);}
});


app.set('view engine', 'ejs');
app.set('port', process.env.PORT || '8081');
app.set('ip', process.env.IP || '0.0.0.0');
app.use(express.static('public'));
app.get('/', (req, res) => res.render('home'));

app.ws('/stream', (ws, req) => {
  console.log('Incoming!');
  controller.turnOnIR();

  ws.send(JSON.stringify({
    action: 'init',
    width: '960',
    height: '540'
  }));

    var videoStream = raspividStream();
    videoStream.on('data', (data) => {
        ws.send(data, { binary: true }, (error) => { if (error) console.log(error); });
    });

    ws.on('close', () => {
        console.log('Later!');
        controller.turnOffIR();
        videoStream.removeAllListeners('data');
    });
});


app.listen(app.get('port'), app.get('ip'), ()=>console.log(`Express server running at ${app.get('ip')} on port ${app.get('port')}`));

