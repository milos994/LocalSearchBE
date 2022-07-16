const axios = require('axios');
const sinon = require('sinon');
const { expect } = require('chai');

const BusinessEntryService = require('../services/businessEntry');
const { it } = require('mocha');

describe('Unit tests for business entry functions', () => {
    afterEach(() =>  sinon.restore());

    context('Function getAllBusinessEntries', () => {
        it('Should return an array of business entries', async () => {
            const mockedResponse = {
                displayed_what: 'What',
                displayed_where: 'Where',
                opening_hours: 'Hours',
                addresses: [{
                    where: {
                        zipcode: '11030'
                    },
                    contacts: [
                        {
                        phone_number: '1234567890',
                        contact_type: 'url',
                        service_code: 'https://www.google.com'
                        }
                    ],
                }]
            };

            sinon.stub(axios, 'get').resolves({
                data: mockedResponse
            });
            const businessEntries = await BusinessEntryService.getAllBusinessEntries();

            expect(businessEntries.length).to.equal(2);
            expect(businessEntries[0].displayWhat).to.be.equal(mockedResponse.displayed_what);
            expect(businessEntries[0].displayWhere).to.be.equal(mockedResponse.displayed_where);
            expect(businessEntries[0].openingHours).to.be.equal(mockedResponse.opening_hours);

            expect(businessEntries[0].zipCodes.length).to.equal(1);
            expect(businessEntries[0].zipCodes[0]).to.be.equal(mockedResponse.addresses[0].where.zipcode);

            expect(businessEntries[0].websites.length).to.equal(1);
            expect(businessEntries[0].websites[0]).to.be.equal(mockedResponse.addresses[0].contacts[0].service_code);
        });
    });

    context('Function findByNameOrAddress', () => {
        it('Should return an array of business entries', async () => {
            const mockedResponse = [{
                displayWhat: 'Le Café du Marché',
                displayWhere: 'Rue de Conthey 17, 1950 Sion',
                phoneNumbers: [
                    '0273211181'
                ],
                zipCodes: [
                    1950
                ],
                websites: [
                    'http://cafemarche.ch'
                ]
            }];
            sinon.stub(BusinessEntryService, 'getAllBusinessEntries').resolves(mockedResponse);

            const searchResponse = await BusinessEntryService.findByNameOrAddress('mar');
            expect(searchResponse.length).to.equal(1);
        });

        it('Should not return any results when there is no business with search term', async () => {
            const mockedResponse = [{
                displayWhat: 'Le Café du Marché',
                displayWhere: 'Rue de Conthey 17, 1950 Sion',
                phoneNumbers: [
                    '0273211181'
                ],
                zipCodes: [
                    1950
                ],
                websites: [
                    'http://cafemarche.ch'
                ]
            }];
            sinon.stub(BusinessEntryService, 'getAllBusinessEntries').resolves(mockedResponse);

            const searchResponse = await BusinessEntryService.findByNameOrAddress('Milos');
            expect(searchResponse.length).to.equal(0);
        });
    });
})