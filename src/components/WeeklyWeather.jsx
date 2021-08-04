import { useState } from "react";

const WeeklyWeather = ({ forecast }) => {
  //to do: convert the dates into days of the week.
  //Write a ternary statement for if % of rain < show a certain icon
  //fix the date implementation below
  //Add an image for each day of the week based on the weather
  const [displayMore, setDisplayMore] = useState(false);

  // let dates = [];
  // forecast.forEach((day) => {
  //   dates.push(day.date);
  // });
  // console.log(dates);
  // let dayNames = [];

  // const returnDate = (array) => {
  //   const days = [
  //     "Sunday",
  //     "Monday",
  //     "Tuesday",
  //     "Wednesday",
  //     "Thursday",
  //     "Friday",
  //     "Saturday",
  //   ];

  //   array.forEach((day) => {
  //     //need to change date to us format
  //     let euroDate = day.split("/");
  //     let usDate = euroDate[1] + "/" + euroDate[0] + "/" + euroDate[2];
  //     console.log(usDate);
  //     let d = new Date(usDate);
  //     let dayName = days[d.getDay()];
  //     dayNames.push(dayName);
  //   });
  //   console.log(dayNames);
  //   return dayNames;
  // };

  // returnDate(dates);
  // console.log("US dates are now: ", dayNames);

  const handleClick = () => {
    setDisplayMore(!displayMore);
    console.log(displayMore);
  };

  return (
    <>
      <div className="row">
        {forecast.map((day, index) => (
          <>
            <div key={index} className="col">
              <h4>{day.date}</h4>
              <p>{day.Timeframes[0].wx_desc}</p>
              <p>High of: {day.temp_max_f}°</p>
              <p>Low of: {day.temp_min_f}°</p>
              <p onClick={handleClick} className={!displayMore ? "active" : "hidden"}>View More</p>
              <div className={!!displayMore ? "active" : "hidden"}>
                <p>Chance of rain: {day.prob_precip_pct}%</p>
                <p>Sunrise: {day.sunrise_time}</p>
                <p>Sunset: {day.sunset_time}</p>
                <p onClick={handleClick} className={!!displayMore ? "active" : "hidden"}>View Less</p>
              </div>
            </div>
          </>
        ))}
      </div>
    </>
  );
};

export default WeeklyWeather;
