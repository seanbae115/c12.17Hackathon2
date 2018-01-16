//-------------------------------------------------------------------------------
// start document
//-------------------------------------------------------------------------------
/**
 * code testing spotify API
 * Create new instance of spotifyApi from the js file...what next??
 *
 *
*/
// var spotifyApi = new SpotifyWebApi();

// spotifyApi.setAccessToken('AQCYrCIDSLYbQSfMRGISNh-VquWKE-P_qF3NyerO3lz25bxRoo_5n00nRrBK3_f9IfjWv1clNHZULfM2')

// spotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE', function(err, data) {
//   if (err) console.error(err);
//   else console.log('Artist albums', data);
// });
// $.ajax({
// 	method: "GET",
// 	url: "https://accounts.spotify.com/authorize?client_id=514d4820fc1c42eb9e18c9d9ea28de53&redirect_uri=http:%2F%2Flocalhost:8888%2Fcallback&response_type=token",
// 	success: function(response) {
// 		console.log(response);
// 	},
// 	error: function(response) {
// 		console.log(response);
// 	}
// })

/**
* Code to run when document has loaded
* @function
*
*/
$(document).ready(function() {

});
let map;
function initMap() {
	var mapCenter = new google.maps.LatLng(33.6694649,  -117.8231107);
	map = new google.maps.Map(document.getElementById('map'),{
		center:mapCenter,
		zoom: 12,
	});
	var marker = new google.maps.Marker({
          position: mapCenter,
          map: map
  });
}

//-------------------------------------------------------------------------------
