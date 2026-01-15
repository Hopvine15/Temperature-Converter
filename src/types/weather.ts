// weatherdata type that is based on the api response from openweather with the feels i need
//TODO: remove the fields that I am not using throughout the app - once all aspects confirmed

export interface WeatherData {
  tempC: number;           
  tempF: number;           
  feelsLikeC: number;      
  feelsLikeF: number;
  tempMinC: number;       // main.temp_min
  tempMaxC: number;       // main.temp_max
  humidity: number;        // main.humidity
  pressure: number;        // main.pressure
  visibility: number;      // meters
  windSpeed: number;       // wind.speed
  windDeg?: number;        // wind.deg
  windGust?: number;       // wind.gust
  description: string;     // weather[0].description
  condition: string;       // weather[0].main
  icon?: string;           // weather[0].icon
  clouds?: number;         // clouds.all
  rain1h?: number;         // rain["1h"]
  snow1h?: number;         // snow["1h"]
  timestamp: number;       // dt (unix)
  timezoneOffset: number;  // timezone (seconds)
}