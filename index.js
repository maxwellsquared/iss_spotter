const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation } = require("./iss");

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }
//   console.log("It worked! Returned IP:", ip);
// })


// fetchCoordsByIP("24.69.158.32", (error, location) => {
//   if (error) console.log (error);
//   if (location) console.log(location);
// });

// fetchISSFlyOverTimes({ latitude: 48.4284207, longitude: -123.3656444 }, (error, times) => {
//   if (times) console.log(times);
//   if (error) console.log("UH OH!!!", error);
// });


nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
});