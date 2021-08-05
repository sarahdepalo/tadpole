const Iframe = ({ todaysweather }) => {
  //To do: create arrays for three different weather categories
  // create a switch of if else that displays the correct random playlist based on the weather
  // Give the user the option to get a new random playlist

  const temperature = todaysweather?.main?.temp;
  const description = todaysweather?.weather[0]?.description;
  console.log("Today's Temperature", temperature, description);

  const sunnyPlaylists = [
    "0LXHPX3maaIvca0IHhzZ5w",
    "103vakotCcEgU3U10gdzKR",
    "1KYA5TFAAdhp0QmbQ9pmu2",
  ];

  let sunnyPlaylist =
    sunnyPlaylists[Math.floor(Math.random() * sunnyPlaylists.length)];
  let playlist = `https://open.spotify.com/embed/playlist/${sunnyPlaylist}`;
  console.log(sunnyPlaylist);

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
            <button type="button" className="btn2">GET A NEW PLAYLIST</button>
            <button type="button" className="btn2">EXPLORE ALL PLAYLISTS</button>
            <p>Insert cute icon here later</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Iframe;
