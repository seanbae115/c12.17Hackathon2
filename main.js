//-------------------------------------------------------------------------------
// start document
//-------------------------------------------------------------------------------
// var spotifyApi = new SpotifyWebApi();

// spotifyApi.setAccessToken('AQCYrCIDSLYbQSfMRGISNh-VquWKE-P_qF3NyerO3lz25bxRoo_5n00nRrBK3_f9IfjWv1clNHZULfM2')

// spotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE', function(err, data) {
//   if (err) console.error(err);
//   else console.log('Artist albums', data);
// });
$.ajax({
	method: "GET",
	url: "https://accounts.spotify.com/authorize?client_id=514d4820fc1c42eb9e18c9d9ea28de53&redirect_uri=http:%2F%2Flocalhost:8888%2Fcallback&response_type=token",
	success: function(response) {
		console.log(response);
	},
	error: function(response) {
		console.log(response);
	}
})