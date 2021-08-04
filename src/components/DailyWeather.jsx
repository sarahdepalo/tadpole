const DailyWeather = ({ todaysweather, icon}) => {
    console.log("Daily Weather:", todaysweather)
    console.log("icon:", icon)
  return (
    <>
      <div>
        <img src={icon} alt="weather icon"/>
        <p>{todaysweather?.weather[0]?.description}</p>
        <p>Temp: {todaysweather?.main?.temp}</p>
        <p>{todaysweather?.main?.feels_like}</p>
      </div>
    </>
  );
};


export default DailyWeather;