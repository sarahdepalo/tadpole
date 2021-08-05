import { useState } from "react";

//to do: convert the dates into days of the week.
//Write a ternary statement for if % of rain < show a certain icon
//fix the date implementation below
//Add an image for each day of the week based on the weather

const WeeklyWeather = ({ forecast }) => {
  const [displayMore, setDisplayMore] = useState(false);
  // console.log(typeof forecast)
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

  const handleClick = () => {
    setDisplayMore(!displayMore);
    console.log(displayMore);
  };

  return (
    <>
      <div className="row">
        <>
          {forecast.map((day) => (
            <>
              <div className="col weeklyWeather">
                <p>{day.date}</p>
                <img src={day.day.condition.icon} />
                <p>{day.day.condition.text}</p>
                <p>High of: {day.day.maxtemp_f}°</p>
              <p>Low of: {day.day.mintemp_f}°</p>
                <p
                  onClick={handleClick}
                  className={!displayMore ? "active viewMore" : "hidden"}
                >
                  View More
                </p>
                <div className={!!displayMore ? "active" : "hidden"}>
                  <p>Chance of rain: {day.day.daily_chance_of_rain}%</p>
                <p>Sunrise: {day.astro.sunrise}</p>
                <p>Sunset: {day.astro.sunset}</p>
                <p>Moon Phase: {day.astro.moon_phase}</p>
                  <p
                    onClick={handleClick}
                    className={!!displayMore ? "active viewMore" : "hidden"}
                  >
                    View Less
                  </p>
                </div>
              </div>
            </>
          ))}
        </>
      </div>
    </>
  );
};

export default WeeklyWeather;
