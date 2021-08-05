const DailyWeather = ({ todaysweather, icon, description }) => {
  console.log("Daily Weather:", todaysweather);
  console.log("icon:", icon);
  return (
    <>
      <div className="dailyWeatherContainer">
        <img src={icon} alt="weather icon" className="dailyWeatherIcon" />
          <p>{description}</p>
          <h3>{todaysweather?.main?.temp}°</h3>
          <p>Feels Like {todaysweather?.main?.feels_like}°</p>
          <p>High of {todaysweather?.main?.temp_max}</p>
          <p>Low of {todaysweather?.main?.temp_min}</p>
          <p>Humidity: {todaysweather?.main?.humidity}%</p>
          <p>Wind: {todaysweather?.wind?.speed}mph</p>
      </div>
    </>
  );
};

export default DailyWeather;
