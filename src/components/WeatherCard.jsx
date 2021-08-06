import { useState } from "react";

const WeatherCard = ({
  index,
  temp_day,
  description,
  iconId,
  humidity,
  wind,
  maxTemp,
  minTemp,
  unixDate
}) => {
  const [displayMore, setDisplayMore] = useState(false);

  const handleClick = () => {
    setDisplayMore(!displayMore);
    console.log(displayMore);
  };

 const convertUnixToDayOfWeek = (d) => {
    let stamp = new Date(d * 1000);
    let day = stamp.toLocaleDateString('en-US', { weekday: 'short' });
    let dateNote = stamp.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' })

    return day + ' ' + dateNote;
}

  return (
    <div className="col weeklyWeather" key={index}>

      <img src={`http://openweathermap.org/img/wn/${iconId}.png`} alt="weather icon" className="weeklyIcon"/>
      <p>{convertUnixToDayOfWeek(unixDate)}</p>
      <p>{description}</p>
      <p>{temp_day}°</p>

      <p
        onClick={handleClick}
        className={!displayMore ? "active viewMore" : "hidden"}
      >
        View More
      </p>
      <div className={!!displayMore ? "active" : "hidden"}>
        <p>High of {maxTemp}°</p>
        <p>Low of {minTemp}°</p>
        <p>{humidity}% Humidity</p>
        <p>Wind: {wind}mph</p>

        <p
          onClick={handleClick}
          className={!!displayMore ? "active viewMore" : "hidden"}
        >
          View Less{" "}
        </p>
      </div>
    </div>
  );
};

export default WeatherCard;
