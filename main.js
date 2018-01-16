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

/**
 * Spotify ajax call
 * 
 * 
 * 
*/
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

//-------------------------------------------------------------------------------

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
//-------------------------------------------------------------------------------
/**
 * ajax call for TicketMaster local search
 * 
 * @param {object} coorObj object with 'lat' & 'lng' properties, each containing a string of numbers
 * @param {string} artist name
*/
function getLocalEvents (coordObj, artist) {
	$.ajax({
		method: 'GET',
		url: 'https://app.ticketmaster.com/discovery/v2/events.json?apikey=L3aWCQHOVxRR9AVMMbIEd8XXZC6DXiH8&latlong=' + latLngObj.lat +','+latLngObj.lng +'&radius=100&unit=miles&keyword='+ artist,
		success:  response => {
			console.log(response);
		},
		error: response => {
			console.log(response);
		}
	})
} //function getLocalEvents

//-------------------------------------------------------------------------------

/**
 * ajax call for TicketMaster Event
 * 
 * @params {eventID} id of the specific event !!Could use URL of event from objects returned, just need
 * 
*/
let seatPricing = null;
function getEventInfo(eventID){
	$.ajax({
		method: 'GET',
		url: 'https://app.ticketmaster.com/commerce/v2/events/'+ eventID + '/offers.json?apikey=L3aWCQHOVxRR9AVMMbIEd8XXZC6DXiH8',
		success:  response => {
			let prices = [];
			let objects = response.offers[0].attributes.prices;
			objects.map( object => prices.push(object.value) );
			prices.sort( (a,b) => parseFloat(a)-parseFloat(b) )
			seatPricing = prices
		},
		error: response => {
			console.log(response);
		}
	})
} //function getEventInfo
//-------------------------------------------------------------------------------

