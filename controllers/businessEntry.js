const Router = require('express').Router();
const BusinessEntryService = require('../services/businessEntry');
const BadRequestError = require('../errors/badRequest');


Router.get('/business-entries', async (req, res, next) => {
	try {
        const businessEntries = await BusinessEntryService.getAllBusinessEntries();
		res.send(businessEntries);
	} catch (err) {
		return next(err);
	}
});

Router.get('/search', async (req, res, next) => {
	try {
        const { term } = req.query;

		if (!term) {
			throw new BadRequestError('Term query param is required.');
		}

        const businessEntries = await BusinessEntryService.findByNameOrAddress(term);
		res.send(businessEntries);
	} catch (err) {
		return next(err);
	}
});

module.exports = Router;