const express = require('express');
const app = express();
const wss = require('express-ws')(app);
const controller = require('./controllers/controller.js');


app.set('view engine', 'ejs');
app.set('port', process.env.PORT || '52780');
app.set('ip', process.env.IP || '0.0.0.0');
app.use(express.static('public'));
app.get('/', (req, res) => res.render('home'));
app.get('/airTemp', controller.getAirTemp);
app.get('/waterTemp', controller.getWaterTemp);
app.get('/toggleIR', controller.toggleIR);
app.ws('/stream', controller.getLiveFeed);


app.listen(app.get('port'), app.get('ip'), ()=>console.log(`Express server running at ${app.get('ip')} on port ${app.get('port')}`));

