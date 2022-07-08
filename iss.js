const request = require('request');

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
 const fetchMyIP = function(callback) { 

  request("https://api.ipify.org?format=json", (error, response, body) => {
    if (error) return callback(error, null);
    if (response.statusCode !== 200) {
      const msg = `Status code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    callback(null, JSON.parse(body).ip);
  });
}

const fetchCoordsByIP = function(ip, callback) {
  request(("http://ipwho.is/" + ip), (error, response, body) => {
    if (error) return callback(error, null);
    if (response.statusCode !== 200) {
      const msg = `Status code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    if (!JSON.parse(body).success) return callback("Couldn't get IP!", null);
    const { latitude, longitude } = JSON.parse(body)
    callback(null, { latitude, longitude });
  });
}


const fetchISSFlyOverTimes = function(coords, callback) {
  let URL = (`https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`)
  request(URL, (error, response, body) => {
    if (error) return callback(error, null);
    if (response.statusCode !== 200) {
      const msg = `Status code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const parsedBody = JSON.parse(body);
    if (parsedBody.message !== "success") return callback("ISS database doesn't like it!", null);
    callback(null, parsedBody.response);
  });
}


const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) return callback(error, null);
    fetchCoordsByIP((ip), (error, location) => {
      if (error) return callback(error, null);
      fetchISSFlyOverTimes(location, (error, times) => {
        if (error) return callback(error, null);
        callback(error, times);
      })
    })
  })
}
module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };