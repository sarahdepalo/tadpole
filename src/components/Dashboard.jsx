import { useState, useEffect } from "react";
import DailyWeather from "./DailyWeather";
import WeeklyWeather from "./WeeklyWeather";
import Iframe from "./Iframe";
import SearchForm from "./SearchForm";

const Dashboard = () => {
  //USER
  const [name, setName] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [savedLocation, setSavedLocation] = useState(true);
  const [savedCity, setSavedCity] = useState("");
  //API
  const [dailyWeather, setDailyWeather] = useState(null);
  const [dailyWeatherIcon, setDailyWeatherIcon] = useState("");
  const [dailyDescription, setDailyDescription] = useState("");
  const [weeklyWeather, setWeeklyWeather] = useState(null);

  //API Stuff:
  // const open_weather_key = process.env.REACT_APP_WEATHER_KEY;
  // const weather_api_key = process.env.REACT_APP_WEATHER_API_KEY

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
      fetchDailyWeather(response.primarylocationzip);

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

    //icon & desc for daily:
    const iconRes = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=6bdf48c908e14b99bf5135122210508&q=${zipcode}&days=7&aqi=no&alerts=no`
    ).then((iconRes) => iconRes.json());


    setDailyWeatherIcon(iconRes.current.condition.icon);
    setDailyDescription(iconRes.current.condition.text);

    //get the lat and long from the zipcode and then send to weekly weather (requires zipcode)
    const {lat, lon} = response.coord;
    console.log("LATITUDE AND LONGITUDE:", lat, lon)
    fetchWeeklyWeather(lat, lon);
  };

  //Weekly Weather

  const fetchWeeklyWeather = async (latitude, longitude) => {
    if (latitude !== null && longitude !== null) {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=3c2facbbe498e0468ed6e5b436dcc588&cnt=7&exclude=current,minutely,hourly&units=imperial`
      ).then((response) => response.json());
      console.log("Fetch WEEKLY WEATHER RESPONSE: ", response)
      //fetch sets the first day to current date -this gets rid of it to avoid redundancy 
      const fullWeek = response.daily.slice(1);
      setWeeklyWeather(fullWeek)

    }

  };

  useEffect(() => {
    getUserInfo();
  }, []);

  //Inspirational quotes
  const inspoQuotes = [
    "Make each day your masterpiece. -John Wooden",
    "The best revenge is massive success. -Frank Sinatra",
    "Dream big and dare to fail. -Norman Vaughan",
    "It does not matter how slowly you go as long as you do not stop. -Confucius",
    "Don’t let yesterday take up too much of today. —Will Rogers", "The journey of a thousand miles begins with one step. -Lao Tzu"
  ];

  let quote = inspoQuotes[Math.floor(Math.random() * inspoQuotes.length)];

  //Display button for weather for home
  const savedLocationButton = (boolean) => {
    setSavedLocation(boolean);
  };

  const revertToHomeLocation = () => {
    setSavedLocation(true);
    getUserInfo();
  };

  return (
    <>
      <div className="container">
        <h2>Hello, {name}</h2>
        <p>{quote}</p>
        <SearchForm
          fetchDailyWeather={fetchDailyWeather}
          savedLocationButton={savedLocationButton}
        />
        {!savedLocation ? (
          <button type="button" className="btn2" onClick={revertToHomeLocation}>
            Get Weather for {savedCity}
          </button>
        ) : null}

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
            {dailyWeather !== null ? (
              <Iframe todaysweather={dailyWeather} />
            ) : (
              <p>Loading music...</p>
            )}
          </div>
        </div>
        {weeklyWeather !== null ? (
          <>
            <h3>Your Weekly Forecast</h3>
            <WeeklyWeather forecast={weeklyWeather} />
          </>
        ) : (
          <p>Loading Weekly Forecast...</p>
        )}
      </div>
    </>
  );
};

export default Dashboard;
