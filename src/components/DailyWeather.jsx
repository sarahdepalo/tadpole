const DailyWeather = ({ todaysweather, icon }) => {
  console.log("Daily Weather:", todaysweather);
  console.log("icon:", icon);
  return (
    <>
      <div className="dailyWeatherContainer col">
        <img src={icon} alt="weather icon" className="dailyWeatherIcon" />
        <div className="col">
          <p>{todaysweather?.weather[0]?.description}</p>
          <p>{todaysweather?.main?.temp}°</p>
          <p>Feels Like {todaysweather?.main?.feels_like}°</p>
        </div>
      </div>
    </>
  );
};

export default DailyWeather;
