const fetch = require('node-fetch');
const URL = 'https://public-api.tracker.gg/apex/v1/standard/profile';

/**
 * The main hub for the client, to be instantiated.
 * @class
 */
class Client {
  /**
   * @constructor
   * @param {string} key Your API Key, provided by ApexTracker
   */
  constructor(key) {
    this.headers = { headers: { 'TRN-Api-Key': key } };
  }

  /**
   * Gets the stats of a specific user, on a specific platform.
   * @param {string} username The username of the player to be searched
   * @param {string} platform The platform of the player to be searched
   */
  user(username, platform) {
    return new Promise(async(resolve, reject) => {
      if (!username) { return reject(new Error('[APEX-API] You must supply a username')); }
      if (!platform) { return reject(new Error('[APEX-API] You must provide a platform [PC | XBOX | PSN]')); }
      if (typeof username !== 'string') { return reject(new TypeError(`[APEX-API] Username expects a string, ${typeof username} given`)); }
      if (typeof platform !== 'string') { return reject(new TypeError(`[APEX-API] Platform expects a string, ${typeof platform} given`)); }
        let nbr;
        if (platform === 'PC') { nbr = 5; }
        if (platform === 'XBOX') { nbr = 1; }
        if (platform === 'PSN') { nbr = 2; }

        const result = await fetch(`${URL}/${nbr}/${username}`, this.headers);
        const data = await result.json();

        // Invalid API Key
        if (data.message === 'Invalid authentication credentials') { reject(new Error(`[APEX-API] ${data.message}`)); }

        // Handling Player Not Found error
        if (data.error === 'Player Not Found') {
          return reject({ code: 404, error: data.error });
        }
        // Handling any other error
        else if (data.error) { return reject(data); }

        resolve(data.data);
    });
  }
};

module.exports = Client;