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
$.ajax({
	method: "GET",
	url: "https://accounts.spotify.com/authorize?client_id=514d4820fc1c42eb9e18c9d9ea28de53&redirect_uri=http:%2F%2Flocalhost:8888%2Fcallback&response_type=token",
	success: function(response) {
		console.log(response);
	},
	error: function(response) {
		console.log(response);
	}
});

/**
* Code to run when document has loaded
* @function
*
*/
$(document).ready(function() {

});
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

