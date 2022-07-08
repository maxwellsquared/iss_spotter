const { fetchMyIP, fetchCoordsByIP } = require("./iss");

fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }
  console.log("It worked! Returned IP:", ip);
})


fetchCoordsByIP("24.69.158.32", (error, location) => {
  if (error) console.log (error);
  if (location) console.log(location);
});