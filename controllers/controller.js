const PiCamera = require('pi-camera');
const picPath = `../public/img/tempPic.jpg`;
const dht = require('node-dht-sensor');
const ds18b20 = require('ds18b20-raspi');


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

	getAirTemp: (req, res)=>{
		console.log("Querying DHT11...")
		dht.read(11, 4, (err, temp, hum) =>{
			if (!err) {
				fTemp = temp*(9/5)+32;
				console.log(`Query successful.  Temp was ${fTemp} and humidity was ${hum}`);
				res.send(fTemp);
			}
			else{
				console.log(`Query failed: ${err}`);
				res.send(-1);
			}
		});

	},

	getLiveFeed: (ws, req) => {
		console.log('Incoming!');
		controller.turnOnIR();

		ws.send(JSON.stringify({
			action: 'init',
			width: '960',
			height: '540'
		}));

		let videoStream = raspividStream();
		videoStream.on('data', (data) => {
			ws.send(data, { binary: true }, (error) => { if (error) console.log(error); });
		});

		ws.on('close', () => {
			console.log('Later!');
			controller.turnOffIR();
			videoStream.removeAllListeners('data');
		});
	},

	getWaterTemp: (req, res) => {
		console.log("Querying water temp...");
		let fTemp = ds18b20.readSimpleF();
		if (!fTemp){
			console.log("Query failed.");
			res.send(-1);
		}
		else{
			console.log(`Query successful. Water Temp was ${fTemp}`);
			res.send(waterTemp);
		}
	},

	turnOnIR: () => {},
	turnOffIR: () => {},



};
