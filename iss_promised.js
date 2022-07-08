const request = require('request-promise-native');

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
 const fetchMyIP = function() { 
  return request('https://api.ipify.org?format=json');
}

const fetchCoordsByIP = function(body) {
  const ip = JSON.parse(body).ip;
  return request(`http://ipwho.is/${ip}`);
};

const fetchISSFlyOverTimes = function(body) {
  const {latitude, longitude} = JSON.parse(body);
  const url = `https://iss-pass.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`;
  return request(url);
}

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const { response } = JSON.parse(data);
      return response;
    })
    .catch((error) => {
      console.log("It didn't work: ", error.message);
    });;
}
module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };