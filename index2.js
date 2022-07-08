const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation } = require("./iss_promised");

nextISSTimesForMyLocation()
  .then((passTimes) => {
    console.log(passTimes);
  })