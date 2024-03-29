import { useState, useEffect } from "react";
import frogs from "../imgs/singing_frogs.jpeg";

const Iframe = ({ todaysweather }) => {
  const [playlist, setPlaylist] = useState("");
  const [playlistGroup, setPlaylistGroup] = useState([]);
  const [descriptor, setDescriptor] = useState("");

  // const temperature = todaysweather?.main?.temp;
  const description = todaysweather?.weather[0]?.description;

  useEffect(() => {
    const sunnyPlaylists = [
      "0LXHPX3maaIvca0IHhzZ5w",
      "103vakotCcEgU3U10gdzKR",
      "1KYA5TFAAdhp0QmbQ9pmu2",
      "1MAY8w4NL21o8WPNehUChz",
      "727r1jQ5dZJtKTg7T5golu",
    ];

    const rainyPlaylists = [
      "4mQpN5o9JWjgA2klK2kr27",
      "0pjlGlL6fcnReFeXJ3zn7G",
      "6IAXQkw7Svb62d7i7CiEsa",
    ];

    const snowyPlaylists = ["1i0db1elTpgAVB8ijYRlmS", "5gXrDOWq495vWAMpUIh0hv"];

    const setInitialPlaylist = () => {
      let initialPlaylists;
      if (
        description === "few clouds" ||
        description === "clear sky" ||
        description === "broken clouds" ||
        description === "scattered clouds" ||
        description === "overcast clouds" ||
        description === "dust" ||
        description === "sand" ||
        description === "Smoke"
      ) {
        initialPlaylists = sunnyPlaylists;
        setDescriptor("nice sunny");
      } else {
        if (
          description.includes("rain" || "drizzle" || "thunderstorm") 
        ) {
          initialPlaylists = rainyPlaylists;
          setDescriptor("rainy");
        } else {
          if (description.includes("snow" || "sleet" || "mist" || "fog")

          ) {
            initialPlaylists = snowyPlaylists;
            setDescriptor("chilly");
          }
        }
      }

      setPlaylistGroup(initialPlaylists);

      let randomPlaylist =
        initialPlaylists[Math.floor(Math.random() * initialPlaylists.length)];

      let startingPlaylist = `https://open.spotify.com/embed/playlist/${randomPlaylist}`;
      setPlaylist(startingPlaylist);
    };
    setInitialPlaylist();
  }, [description]);

  const shufflePlaylists = (playlists) => {
    let randomPlaylist =
      playlists[Math.floor(Math.random() * playlists.length)];
    let newPlaylist = `https://open.spotify.com/embed/playlist/${randomPlaylist}`;
    setPlaylist(newPlaylist);
  };

  const openSpotify = () => {
    const newWindow = window.open(
      "https://open.spotify.com/user/vnodo8ult3p0a9uhz5nl55478/playlists",
      "_blank",
      "noopener,noreferrer"
    );
    if (newWindow) newWindow.opener = null;
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
          <p>
            Looks like it might be a {descriptor} day. Enjoy some music with the
            weather.
          </p>
          <div className="buttonContainer">
            <button
              type="button"
              className="btn2"
              onClick={() => shufflePlaylists(playlistGroup)}
            >
              GET A NEW PLAYLIST
            </button>
            <button type="button" className="btn2" onClick={openSpotify}>
              EXPLORE ALL PLAYLISTS
            </button>
            <img
              src={frogs}
              alt="three frogs with musical notes above them"
              className="frogs"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Iframe;
