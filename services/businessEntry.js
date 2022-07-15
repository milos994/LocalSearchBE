const axios = require('axios');
const config = require('config');
const url = config.get('localSearchUrl');
const address1Id = config.get('address1Id');
const address2Id = config.get('address2Id');
/**
 * @description BusinessEntry Service.
 *
 * @class BusinessEntry
 */
class BusinessEntry {
    /**
     * @description Get all business entries.
     *
     * @static
     * @return {Array} Business entries.
     * @memberof BusinessEntry
     */
    static async getAllBusinessEntries() {
        const response = await Promise.all([
            axios.get(`${url}/coding-session-rest-api/${address1Id}`),
            axios.get(`${url}/coding-session-rest-api/${address2Id}`)
        ]);

        return response.map((businessEntry) => ({
            displayWhat: businessEntry.data.displayed_what,
            displayWhere: businessEntry.data.displayed_where,
            openingHours: businessEntry.data.opening_hours,
            phoneNumbers: businessEntry.data.addresses.map(
                (address) => {
                    const phoneNumbers = address.contacts
                        .map((contact) => contact.phone_number)
                        .filter(p => !!p); // Exclude null values

                    return phoneNumbers;
                }
            ).flat(),
            zipCodes: businessEntry.data.addresses.map(address => address.where.zipcode),
            websites: businessEntry.data.addresses.map(
                (address) => {
                    const urls = address.contacts
                        .map((contact) => contact.contact_type === 'url' ? contact.service_code : null)
                        .filter(p => !!p); // Exclude null values

                    return urls;
                }
            ).flat(),
        }));
	}

    /**
     * @description Find business entries by name or address.
     *
     *
     * @static
     * @param {String} term Search term.
     * @memberof BusinessEntry
     */
    static async findByNameOrAddress(term) {
		const businessEntries = await this.getAllBusinessEntries();
        
        return businessEntries.filter((businessEntry) => {
            if (businessEntry.displayWhat.toLowerCase().includes(term.toLowerCase())) {
                return true;
            }

            if (businessEntry.displayWhere.toLowerCase().includes(term.toLowerCase())) {
                return true;
            }
        });
	}
}

module.exports = BusinessEntry;