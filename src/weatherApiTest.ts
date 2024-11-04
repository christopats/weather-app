import { fetchWeatherData } from "./weatherApi";

console.log("Starting API test...");

fetchWeatherData(40.7128, 71.006)
  .then((data) => {
    console.log("Fetched weather data: ", JSON.stringify(data, null, 2));
  })
  .catch((error) => {
    console.error("API call failed:", error);
  });
