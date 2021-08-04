const Iframe = ({todaysweather}) => {

  //To do: create arrays for three different weather categories
  // create a switch of if else that displays the correct random playlist based on the weather 
  // Give the user the option to get a new random playlist

  const temperature = todaysweather?.main?.temp;
  const description = todaysweather?.weather[0]?.description
  console.log("Today's Temperature", temperature, description);

  const sunnyPlaylists = [
    "0LXHPX3maaIvca0IHhzZ5w",
    "103vakotCcEgU3U10gdzKR",
    "1KYA5TFAAdhp0QmbQ9pmu2",
  ];

  // shuffle playlists:
  // function shuffleArray(array) {
  //   for (let i = array.length - 1; i > 0; i--) {
  //     const j = Math.floor(Math.random() * (i + 1));
  //     [array[i], array[j]] = [array[j], array[i]];
  //   }
  // }

  // shuffleArray(sunnyPlaylists);
  let sunnyPlaylist = sunnyPlaylists[Math.floor(Math.random() * sunnyPlaylists.length)];
  let playlist = `https://open.spotify.com/embed/playlist/${sunnyPlaylist}`
  console.log(sunnyPlaylist);

  return (
    <>
      <div className="spotifyContainer">
        <p>Looks like a good day. Here's some music to get you through it</p>
        <iframe
          src={playlist}
          title="Spotify playlist player"
          width="50%"
          height="380"
          frameBorder="0"
          allowtransparency="true"
          allow="encrypted-media"
          className="spotify"
        ></iframe>
      </div>
    </>
  );
};

export default Iframe;
