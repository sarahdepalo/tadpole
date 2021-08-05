import { useState } from "react";

const WeatherCard = ({
  index,
  date,
  icon,
  condition,
  maxTemp,
  lowTemp,
  chanceOfRain,
  sunrise,
  sunset,
  moonPhase,
}) => {
  const [displayMore, setDisplayMore] = useState(false);

  const handleClick = () => {
    setDisplayMore(!displayMore);
    console.log(displayMore);
  };

  return (
    <div className="col weeklyWeather" key={index}>
      <h4>{date}</h4>
      <img src={icon} alt="weather icon" />
      <p>{condition}</p>
      <p>High of {maxTemp}°</p>
      <p>Low of {lowTemp}°</p>
      <p
        onClick={handleClick}
        className={!displayMore ? "active viewMore" : "hidden"}
      >
        View More
      </p>
      <div className={!!displayMore ? "active" : "hidden"}>
        <p>Chance of rain: {chanceOfRain}%</p>
        <p>Sunrise: {sunrise}</p>
        <p>Sunset: {sunset}</p>
        <p>Moon Phase: {moonPhase}</p>

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
