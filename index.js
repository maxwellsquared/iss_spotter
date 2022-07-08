const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require("./iss");

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

fetchISSFlyOverTimes({ latitude: 48.4284207, longitude: -123.3656444 }, (error, times) => {
  console.log(times);
});