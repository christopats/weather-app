import axios from "axios";

export interface WeatherData {
  current_weather: {
    temperature: number;
    windspeed: number;
    weathercode: number;
  };
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_sum: number[];
  };
}

export interface ProcessedWeatherData {
  current: {
    temperature: number;
    windspeed: number;
    weathercode: number;
  };
  daily: Array<{
    date: string;
    maxTemp: number;
    minTemp: number;
    precipitation: number;
  }>;
}

export async function fetchWeatherData(
  latitude: number,
  longitude: number
): Promise<WeatherData> {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,weathercode&current_weather=true&timezone=auto`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching weather data: ", error);
    throw error;
  }
}

export function processWeatherData(data: WeatherData): ProcessedWeatherData {
  const current = data.current_weather;
  const daily = data.daily;

  return {
    current: {
      temperature: current.temperature,
      weathercode: current.weathercode,
      windspeed: current.windspeed,
    },
    daily: daily.time.map((date, index) => ({
      date,
      maxTemp: daily.temperature_2m_max[index],
      minTemp: daily.temperature_2m_min[index],
      precipitation: daily.precipitation_sum[index],
    })),
  };
}
