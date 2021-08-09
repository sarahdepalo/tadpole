import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import screenshot from "../imgs/dashboardScreenshot.png";
import musicNote from "../imgs/musicNote.png";

const Homepage = () => {
  const [currentSong, setCurrentSong] = useState("");

  useEffect(() => {
    const songs = [
      "Rollerblades - Dominic Fike",
      "Right - Mac Miller",
      "Nikes On - Healy",
      "plastic door// - KennyHoopla",
      "CORSO - Tyler, The Creator",
      "777 - Joji",
      "Playing Games - Anna of the North",
      "Rainbow Bap - Jaden",
      "Tequila Shots - Kid Cudi",
      "Saturn - RIZ LA VIE",
      "NO HALO - BROCKHAMPTON",
      "Good News - Mac Miller",
      "Peach - Kevin Abstract"
    ];
  
    const getCurrentSong = () => {
      let song = songs[Math.floor(Math.random() * songs.length)];
      setCurrentSong(song);
    };
    getCurrentSong();
  }, []);

  return (
    <>
      <div className="heroContainer">
        <div className="container">
          <div className="row">
            <div className="col welcomeContainer">
              <h2>We Combine Accurate Weather Forecasts With Awesome Music</h2>
              <p>
                Tadpole was created for those who love to match their daily
                music listening to the weather outside. Whether you want to go
                out and celebrate or stay in bed all day, we've got you covered.
              </p>
              <Link to="/register" className="btn2">
                CREATE AN ACCOUNT
              </Link>
              <h5>What We're Currently Listening to:</h5>
              <div className="currentSong">
                <img src={musicNote} alt="music note" />
                <p>{currentSong}</p>
              </div>
              <img
                src={screenshot}
                alt="screenshot of the tadpole dashboard"
                className="hiddenScreenshot"
              />
            </div>
            <div className="col screenshotContainer">
              <img
                src={screenshot}
                alt="screenshot of the tadpole dashboard"
                className="screenshot"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Homepage;
