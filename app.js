const express = require('express');

const app = express();
const controller = require('./controllers/controller.js');
const raspividStream = require('raspivid-stream');
//const PiCamera = require('pi-camera');
const picPath = `./public/img/tempPic.jpg`;
const wss = require('express-ws')(app);
/*const cam = new PiCamera({
	mode: 'photo',
	output: picPath,
	width: 1280,
	height: 720,
	nopreview: true
});
*/
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || '8081');
app.set('ip', process.env.IP || '0.0.0.0');
app.use(express.static('public'));
app.get('/', (req, res) => res.render('home'));
//app.get('/pic', controller.showPic);
//app.post('/api/showpic', controller.showPic);
app.post('/api/showpic', async function(req, res){
	await cam.snap();
	await res.send(true);
});
app.ws('/stream', (ws, req) => {
  console.log('Incoming!');
  ws.send(JSON.stringify({
    action: 'init',
    width: '960',
    height: '540'
  }));
    var videoStream = raspividStream({ rotation: 0 });


    videoStream.on('data', (data) => {
        ws.send(data, { binary: true }, (error) => { if (error) console.log(error); });
    });

    ws.on('close', () => {
        console.log('Later!');
        videoStream.removeAllListeners('data');
    });
});


app.listen(app.get('port'), app.get('ip'), ()=>console.log(`Express server running at ${app.get('ip')} on port ${app.get('port')}`));

