const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const bodyParser = require('body-parser');
const apiRouter = require('./routes');
const webRouter = require('./routes/webpages');
const createHttpError = require('http-errors');

//! config
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(`${__dirname}/public`));

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

//! middleware
app.use(cors());
app.use(express.json());
app.use(logger('dev'));

app.use('/api/v1', apiRouter);
app.use('/', webRouter);

//* Error Handler
app.use((err, req, res, next) => {
	res.status(err.status || 500);
	res.json({
		status: err.status || 500,
		message: err.message,
	});
});

app.use((req, res) => {
	const url = req.url;
	const method = req.method;
	res.status(404).json({
		status: false,
		method,
		url,
		message: 'Not Found!',
	});
});

module.exports = app;
