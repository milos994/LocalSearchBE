
const express = require('express');
const BaseError = require('./errors/base');
const cors = require('cors')

const app = express();
app.use(express.json());
app.use(cors({
	origin: "*",
	methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
	preflightContinue: false,
	optionsSuccessStatus: 204
}));


const businessEntryController = require('./controllers/businessEntry');

app.use(businessEntryController);

app.use((err, req, res, next) => {
	if (err instanceof BaseError) {
		res.status(err.status).json({ message: err.message });
	} else {
		res.status(500).json({ message: 'Internal Server Error' });
	}
	next();
});

app.listen(8000);

module.exports = app;