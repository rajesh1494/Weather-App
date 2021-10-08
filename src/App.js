import "./App.css";
import Form from './components/Form';
import Weather from "./components/Weather";
import "bootstrap/dist/css/bootstrap.min.css";
import "weather-icons/css/weather-icons.min.css";
import { useState } from "react";

// api.openweathermap.org/data/2.5/weather?q=London&appid={API key}
const API_KEY = "96ed219ef1aad78d7b9e9eaa44a7c381";

function App() {
  const [city, setCity] = useState(undefined);
  const [celsius, setCelsius] = useState(null);
  const [temp_max, setTempMax] = useState(undefined);
  const [temp_min, setTempMin] = useState(undefined);
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState(undefined);
  const [error, setError] = useState(false);

  const weatherIcon = {
    Thundertrom: "wi-thunderstorm",
    Drizzle: "wi-sleet",
    Rain: "wi-storm-showers",
    Snow: "wi-snow",
    Atmosphere: "wi-fog",
    Clear: "wi-day-sunny",
    Clouds: "wi-day-fog",
  };

  const getWeatherIcon = (weatherIcon, rangeId) => {
    switch (true) {
      case rangeId >= 200 && rangeId <= 232:
        setIcon(weatherIcon.Thundertrom);
        break;
      case rangeId >= 300 && rangeId <= 321:
        setIcon(weatherIcon.Drizzle);
        break;
      case rangeId >= 500 && rangeId <= 531:
        setIcon(weatherIcon.Rain);
        break;
      case rangeId >= 600 && rangeId <= 622:
        setIcon(weatherIcon.Snow);
        break;
      case rangeId >= 700 && rangeId <= 781:
        setIcon(weatherIcon.Atmosphere);
        break;
      case rangeId === 800:
        setIcon(weatherIcon.Clear);
        break;
      case rangeId >= 801 && rangeId <= 804:
        setIcon(weatherIcon.Clouds);
        break;
      default:
        setIcon(weatherIcon.Clouds);
    }
  };

  const getWeather = async (e) => {
    e.preventDefault();
    const cityName = e.target.elements.city.value;
    if(cityName){
    const api_call = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`
    );
    const response = await api_call.json();


    setCity(`${response.name},${response.sys.country}`);
    setCelsius(Math.floor(response.main.temp - 273.15));
    setTempMax(Math.floor(response.main.temp_max - 273.15));
    setTempMin(Math.floor(response.main.temp_min - 273.15));
    setDescription(response.weather[0].description);
    setError(false);
    getWeatherIcon(weatherIcon, response.weather[0].id);

    // console.log(response);
  }else{
    setError(true);
  }
}

  return (
    <div className="App">
      < Form getWeather={getWeather} error={error} />
      <Weather
      city={city}
      celsius={celsius}
      temp_min={temp_min}
      temp_max={temp_max}
      description={description}
      icon={icon}
      />
    </div>
  );
}

export default App;
