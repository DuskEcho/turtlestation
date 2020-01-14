const PiCamera = require('pi-camera');
const picPath = `../public/img/tempPic.jpg`;
const raspividStream = require('raspivid-stream');
const wss = require('express-ws')(app);
const cam = new PiCamera({
	mode: 'photo',
	output: picPath,
	width: 1280,
	height: 720,
	nopreview: true
});


module.exports = {
	showPic: async  (req, res)=>{
	await cam.snap();
  	res.sendfile(picPath);


	},

	grabStream: (ws, req) => {
		console.log('Incoming!');
		turnOnIR();
		ws.send(JSON.stringify({
			action: 'init',
			width: '960',
			height: '540'
		}));
		let videoStream = raspividStream({ rotation: 0 });


		videoStream.on('data', (data) => {
			ws.send(data, { binary: true }, (error) => { if (error) console.log(error); });
		});

		ws.on('close', () => {
			console.log('Later!');
			turnOffIR();
			videoStream.removeAllListeners('data');
		});
	},



};

turnOnIR = () =>{

};
turnOffIR = () =>{

};
