const PiCamera = require('pi-camera');
const picPath = `../public/img/tempPic.jpg`;
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

	turnOnIR: () => {},
	turnOffIR: () => {},



};
