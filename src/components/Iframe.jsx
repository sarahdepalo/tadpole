import { useState, useEffect } from "react";

const Iframe = ({ todaysweather }) => {

  const [playlist, setPlaylist] = useState("");

  const temperature = todaysweather?.main?.temp;
  const description = todaysweather?.weather[0]?.description;
  console.log("Today's Temperature", temperature, description);

  const sunnyPlaylists = [
    "0LXHPX3maaIvca0IHhzZ5w",
    "103vakotCcEgU3U10gdzKR",
    "1KYA5TFAAdhp0QmbQ9pmu2",
  ];

  const rainyPlaylists = ["4mQpN5o9JWjgA2klK2kr27", "0pjlGlL6fcnReFeXJ3zn7G"];

  const snowyPlaylists = ["1i0db1elTpgAVB8ijYRlmS"];

  let mainPlaylistGroup;

  if (description === "clear sky" || "few clouds" || temperature > 75) {
    mainPlaylistGroup = sunnyPlaylists;
  } else {
    if (
      description === "scattered clouds" ||
      "broken clouds" ||
      "shower rain" ||
      "rain" ||
      "thunderstorm"
    ) {
      mainPlaylistGroup = rainyPlaylists;
    } else {
      if (description === "snow" || "mist" || temperature < 35) {
        mainPlaylistGroup = snowyPlaylists;
      }
    }
  }

  const setInitialPlaylist = () => {
    let randomPlaylist =
      mainPlaylistGroup[Math.floor(Math.random() * mainPlaylistGroup.length)];
    console.log("Random Playlist:", randomPlaylist);
    let startingPlaylist = `https://open.spotify.com/embed/playlist/${randomPlaylist}`;
    setPlaylist(startingPlaylist);
  };


  useEffect(() => {
    setInitialPlaylist();
  }, []);


  const shufflePlaylists = () => {
    let randomPlaylist =
      mainPlaylistGroup[Math.floor(Math.random() * mainPlaylistGroup.length)];
    console.log("Random Playlist:", randomPlaylist);
   let newPlaylist = `https://open.spotify.com/embed/playlist/${randomPlaylist}`;
    setPlaylist(newPlaylist)
  };

  const openSpotify = () => {
    const newWindow = window.open('https://open.spotify.com/user/vnodo8ult3p0a9uhz5nl55478?si=469f02e696a244dc', '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
  };

  return (
    <>
      <div className="spotifyContainer">
        <iframe
          src={playlist}
          title="Spotify playlist player"
          width="100%"
          height="408"
          frameBorder="0"
          allowtransparency="true"
          allow="encrypted-media"
          className="spotify"
        ></iframe>
        <div className="exploreContainer">
          <p>Looks like a good day. Enjoy some nice music with the weather.</p>
          <div className="buttonContainer">
            <button type="button" className="btn2" onClick={shufflePlaylists}>
              GET A NEW PLAYLIST
            </button>
            <button type="button" className="btn2" onClick={openSpotify}>
              EXPLORE ALL PLAYLISTS
            </button>
            <p>Insert cute icon here later</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Iframe;
