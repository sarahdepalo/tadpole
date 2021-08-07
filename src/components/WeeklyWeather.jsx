import WeatherCard from './WeatherCard';

//to do: convert the dates into days of the week.
//fix the date implementation below

const WeeklyWeather = ({ forecast }) => {

  return (
    <>
      <div className="row weeklyWeatherRow">
        {forecast.length > 0 ? (
          forecast.map((day, index) => (
            <WeatherCard 
            index={index}
            temp_day={day.feels_like.day}
            description={day.weather[0].description}
            iconId={day.weather[0].icon}
            humidity={day.humidity}
            wind={day.wind_speed}
            maxTemp={day.temp.max}
            minTemp={day.temp.min}
            unixDate={day.dt}

            />
        ))

        ) : <p>Loading..</p>}

      </div>
    </>
  );
};

export default WeeklyWeather;
