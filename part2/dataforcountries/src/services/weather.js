import axios from 'axios'

const api_key = import.meta.env.VITE_WEATHER_API_KEY

const getWeather = (city) => {
  return axios
    .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api_key}`)
    .then(response => response.data)
}

export default { getWeather }