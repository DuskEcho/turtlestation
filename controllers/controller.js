const PiCamera = require('pi-camera');
const picPath = `../public/img/tempPic.jpg`;
const dht = require('node-dht-sensor');
const ds18b20 = require('ds18b20-raspi');
const raspividStream = require('raspivid-stream');
const Gpio = require('onoff').Gpio;
const IR = new Gpio(26, 'out');



const cam = new PiCamera({
	mode: 'photo',
	output: picPath,
	width: 1280,
	height: 720,
	nopreview: true
});

async function readDHT(){
	return new Promise((resolve, reject) => {
		dht.read(11, 17, (err, temp, hum) =>{
			if (!err) {
				fTemp = temp*(9/5)+32;
				console.log(`Query successful.  Temp was ${fTemp} and humidity was ${hum}`);
				resolve({temp: fTemp});
			}
			else{
				console.log(`Air Temp query failed: ${err}`);
				resolve({temp: -1});
			}
		});
	})
}

function readDS18B20(){
	return new Promise((resolve, reject) => {
		let fTemp = ds18b20.readSimpleF();
		if (!fTemp){
			console.log("Water Temp query failed.");
			resolve({temp: -1});
		}
		else{
			console.log(`Query successful. Water Temp was ${fTemp}`);
			resolve({temp: fTemp});
		}
	})
}

module.exports = {

	toggleIR: (req, res)=>{
		console.log(req);
		console.log('IR STATE IS ' + IR.readSync());
		if (IR.readSync() ===0){
			turnOnIR();
		}
		else{
			turnOffIR();
		}
		res.send({status: "complete"});
	},

	showPic: async  (req, res)=>{
		await cam.snap();
  		res.sendfile(picPath);
	},

	getAirTemp: (req, res)=>{
		console.log("Querying DHT11...")
		readDHT().then((temp)=>res.send(temp));
	},

	getLiveFeed: (ws, req) => {
		console.log('Incoming!');

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
			turnOffIR();
			videoStream.removeAllListeners('data');
		});
	},

	getWaterTemp: (req, res) => {
		console.log("Querying water temp...");
		readDS18B20().then((temp)=>res.send(temp));
	},



};

turnOnIR = ()=>{
IR.writeSync(1);
}
turnOffIR = ()=>{
IR.writeSync(0);
}

