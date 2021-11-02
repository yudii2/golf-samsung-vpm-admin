export default {
  updateWeather(state, weather) {
    state.weather.humidity = weather.humidity;
    state.weather.temperature = weather.temperature;
    state.weather.weatherText = weather.weatherText;
    state.weather.weatherImage = weather.weatherImage;
    state.weather.precipitationType = weather.precipitationType;
    state.weather.refTime = weather.refTime;
  },
};
