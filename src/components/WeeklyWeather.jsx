const WeeklyWeather = ({ forecast }) => {
  var date = new Date();
  var n = date.getDay();
  console.log(n);
  return (
    <>
      <div>
        {forecast.map((day, index) => (
          <div key={index}>
              <h3>{day.date}</h3>
              <p>High of: {day.temp_max_f}</p>
              <p>Low of: {day.temp_min_f}</p>
              <p>Chance of rain: {day.prob_precip_pct}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default WeeklyWeather;
