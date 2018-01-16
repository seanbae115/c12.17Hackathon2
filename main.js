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
function makeMap() {
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
//var artists = [];
/*function getTop9Artists(user) {
	$.ajax({
		dataType: 'json',
		url: 'https://api.spotify.com/v1/user/top/artists',
		limit: 9,
		method: 'GET',
		success: function (response) {
			console.log(response);
        }
    });
}*/

/*
function renderArtists(artists) {
	for(var artistIndex = 0; artistIndex < artist.length; artistIndex++){
        var name = artist[artistIndex].name;
        var imageUrl = artist[artistIndex].image[2].url;
        var img = $('<img>',{
            src: imageUrl,
			'class': 'rounded-circle border border-primary img-responsive w-100'
        });
        var nameDiv = $('<div>',{
        	text: name,
			'class': 'text-center caption'
		});

	}

}*/
/**
 * ajax call for TicketMaster local search
 *
 *
 *
*/
$.ajax({
	method: 'GET',
	// event: '0900539F0B204F05',
	// apikey: 'L3aWCQHOVxRR9AVMMbIEd8XXZC6DXiH8',
	url: 'https://app.ticketmaster.com/discovery/v2/events.json?apikey=L3aWCQHOVxRR9AVMMbIEd8XXZC6DXiH8',
	success:  response => {
		let prices = response.offers[0].attributes.prices
		for(let priceInd = 0; priceInd < prices.length; priceInd++){
			seatPricing.push(prices[priceInd].value);
		}
	},
	error: response => {
		console.log(response);
	}
})
//-------------------------------------------------------------------------------

/**
 * ajax call for TicketMaster Event
 *
 * @params {eventID} id of the specific event
 *
*/
var seatPricing = []; //array of

function getEventInfo(eventID){
	$.ajax({
		method: 'GET',
		// event: 'eventID',
		url: 'https://app.ticketmaster.com/commerce/v2/events/0900539F0B204F05/offers.json?apikey=L3aWCQHOVxRR9AVMMbIEd8XXZC6DXiH8',
		success:  response => {
			let prices = response.offers[0].attributes.prices
			for(let priceInd = 0; priceInd < prices.length; priceInd++){
				seatPricing.push(prices[priceInd].value);
			}
		},
		error: response => {
			console.log(response);
		}
	})
}
//-------------------------------------------------------------------------------
