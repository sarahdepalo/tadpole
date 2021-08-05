import WeatherCard from './WeatherCard';

//to do: convert the dates into days of the week.
//fix the date implementation below

const WeeklyWeather = ({ forecast }) => {
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


  return (
    <>
      <div className="row">
          {forecast.map((day, index) => (
              <WeatherCard 
              index={index}
              date={day.date}
              icon={day.day.condition.icon}
              condition={day.day.condition.text}
              maxTemp={day.day.maxtemp_f}
              lowTemp={day.day.mintemp_f}
              chanceOfRain={day.day.daily_chance_of_rain}
              sunrise={day.astro.sunrise}
              sunset={day.astro.sunset}
              moonPhase={day.astro.moon_phase}

              />
          ))}
      </div>
    </>
  );
};

export default WeeklyWeather;
