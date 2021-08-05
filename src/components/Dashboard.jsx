import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import DailyWeather from "./DailyWeather";
import WeeklyWeather from "./WeeklyWeather";
import Iframe from "./Iframe";
import SearchForm from './SearchForm';

const Dashboard = ({ setAuth }) => {
  const [name, setName] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [dailyWeather, setDailyWeather] = useState(null);
  const [dailyWeatherIcon, setDailyWeatherIcon] = useState("");
  const [dailyDescription, setDailyDescription] = useState("");
  const [weeklyWeather, setWeeklyWeather] = useState({});
  const [savedLocation, setSavedLocation] = useState(true);
  const [savedCity, setSavedCity] = useState("");

  //Weather unlocked keys & stuff -- Not working need to fix and replace stuff later
  // const APP_ID = process.env.REACT_APP_ID;
  // const APP_KEY = process.env.REACT_APP_KEY;

  //Initial userInfo fetch

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
      setSavedCity(response.primarylocationcity);
      console.log("SAVED CITY IS: ", savedCity);
      fetchDailyWeather(response.primarylocationzip);
      fetchWeeklyWeather(response.primarylocationzip);
    } catch (error) {
      console.error(error.message);
    }
  };

  //Daily Weather

  const fetchDailyWeather = async (zipcode) => {
    console.log("Zipcode:", zipcode);
    const response = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?zip=${zipcode}&appid=c58c3fb30ceedded908944ec0edfb311&units=imperial`
    ).then((response) => response.json());
    console.log("Daily WEather:", typeof response);
    setDailyWeather(response);
  };

  //Weekly Weather

  const fetchWeeklyWeather = async (zipcode) => {
    const response = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=6bdf48c908e14b99bf5135122210508&q=${zipcode}&days=7&aqi=no&alerts=no`
    ).then((response) => response.json());

    console.log("WeeklyWeather Response: ", response.forecast.forecastday);
    setWeeklyWeather(response.forecast.forecastday);
    setDailyWeatherIcon(response.current.condition.icon);
    setDailyDescription(response.current.condition.text);
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

  //Inspirational quotes
  const inspoQuotes = [
    "Make each day your masterpiece. -John Wooden",
    "The best revenge is massive success. -Frank Sinatra",
    "Dream big and dare to fail. -Norman Vaughan",
    "It does not matter how slowly you go as long as you do not stop. -Confucius",
    "Don’t let yesterday take up too much of today. —Will Rogers",
  ];

  let quote = inspoQuotes[Math.floor(Math.random() * inspoQuotes.length)];

  //Display button for weather for home
  const savedLocationButton = (boolean) => {
    setSavedLocation(boolean);
  }

  const revertToHomeLocation = () => {
    setSavedLocation(true);  
    getUserInfo();   
  }

  return (
    <>
      <div className="container">
        <h1>Dashboard</h1>
        <h2>Hello, {name}</h2>
        <p>{quote}</p>
        <SearchForm
          fetchDailyWeather={fetchDailyWeather}
          fetchWeeklyWeather={fetchWeeklyWeather}
          savedLocationButton={savedLocationButton}
        />
        {!savedLocation ? (
        <button type="button" className="btn2" onClick={revertToHomeLocation} >Get Weather for {savedCity}</button>
        ): null}

        <div className="row">
          {dailyWeather !== null ? (
            <>
              <h3>Today's Weather for {dailyWeather.name}</h3>
              <div className="col">
                <DailyWeather
                  todaysweather={dailyWeather}
                  icon={dailyWeatherIcon}
                  description={dailyDescription}
                />
              </div>
            </>
          ) : (
            <p>Loading Weather Data...</p>
          )}
          <div className="col">
            <Iframe todaysweather={dailyWeather} />
          </div>
        </div>
        {weeklyWeather.length > 0 ? (
          <>
            <h3>Your Weekly Forecast</h3>
            <WeeklyWeather forecast={weeklyWeather} />
          </>
        ) : (
          <p>Loading Weekly Forecast...</p>
        )}

        <button type="button" onClick={(event) => logout(event)}>
          Logout
        </button>
      </div>
    </>
  );
};

export default Dashboard;
