import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import DailyWeather from "./DailyWeather";
import WeeklyWeather from "./WeeklyWeather";

const Dashboard = ({ setAuth }) => {
  const [name, setName] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [dailyWeather, setDailyWeather] = useState(null);
  const [dailyWeatherIcon, setDailyWeatherIcon] = useState("");
  const [weeklyWeather, setWeeklyWeather] = useState({});

  //Weather unlocked keys & stuff -- Not working need to fix and replace stuff later
  const APP_ID = process.env.REACT_APP_ID;
  const APP_KEY = process.env.REACT_APP_KEY;

  const getUserInfo = async () => {
    // Accesses our server and gets us user information
    try {
      const response = await fetch("http://localhost:3000/dashboard", {
        method: "GET",
        headers: { token: localStorage.token },
      }).then((response) => response.json());

      console.log("Parse Response:", response);

      setName(response.firstname);
      setZipcode(response.primarylocationzip);

      fetchDailyWeather(response.primarylocationzip);
      fetchWeeklyWeather(response.primarylocationzip);

    } catch (error) {
      console.error(error.message);
    }
  };

  const fetchDailyWeather = async (zipcode) => {
    const response = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?zip=${zipcode}&appid=c58c3fb30ceedded908944ec0edfb311&units=imperial`
    ).then((response) => response.json());
    console.log("Daily WEather:", typeof response);

    if (response.cod !== "400") {
      setDailyWeather(response);
      setDailyWeatherIcon(
        `http://openweathermap.org/img/w/${response.weather[0].icon}.png`
      );
    }
  };

  const fetchWeeklyWeather = async (zipcode) => {
    const response = await fetch(
      `http://api.weatherunlocked.com/api/forecast/us.${zipcode}?app_id=5b784a4c&app_key=284ee951bf61c4d6a14ed1d37a4f75ba`
    ).then((response) => response.json());

    console.log(response);
    setWeeklyWeather(response.Days);
    console.log("Weekly Weather:", weeklyWeather);
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  //removes the stored token and logs user out
  const logout = (event) => {
    event.preventDefault();
    localStorage.removeItem("token");
    setAuth(false);
    toast.success("Logged Out Successfully");
  };

  return (
    <>
      <h1>Dashboard</h1>
      <h2>Hello, {name}</h2>
      {dailyWeather !== null ? (
        <>
          <p>Here is today's weather for {dailyWeather.name}</p>
          <DailyWeather todaysweather={dailyWeather} icon={dailyWeatherIcon} />
          <WeeklyWeather forecast={weeklyWeather}/>
        </>
      ) : (
        <p>Loading Weather Data...</p>
      )}

      <button type="button" onClick={(event) => logout(event)}>
        Logout
      </button>
    </>
  );
};

export default Dashboard;
