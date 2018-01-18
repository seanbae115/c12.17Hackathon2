//-------------------------------------------------------------------------------
// start document
//-------------------------------------------------------------------------------
/**
* Globals: global variables are declared here.
*
*/
let map;
let currentPos = null;
let currentPosMarker = null;
let tempPos = null;
let geocoder;
let distMatrix;

/**
* Document ready
*
* Code to run when document has loaded
*/
$(document).ready(function() {
	getCurrentPos();
	$('.eventPopoutContainer').slideToggle();
    renderArtists(example);
    //getRelatedArtists("3WrFJ7ztbogyGnTHbHJFl2");
    searchClickHandler();
		addHomeClickHandlers();
});
/**
* @function addHomeClicks
*	add click handlers on logo and on home button
*	@param none
* @calls handleHomeClick;
*/
function addHomeClickHandlers() {
	$('#logo, #homeBtn').click(handleHomeClick);
}

/**
* @function handleHomeClicks
*	handles functions to be run when home in menu or logo is clicked.
*	@param none
*/
function handleHomeClick() {
	$('.eventPopoutContainer:visible').slideToggle();
  $('.artistInfo:visible').slideToggle();
}

/***********************************************************************
* @function getCurrentPos
*  use google maps API to get current position. If it fails, prompt for and use ZIP code.

* @param: {undefined} none;
* @calls addModalKeyDownHandler(); addModalClickHandler();
* @return object {lat: '34', lng:'44'}
*/
function getCurrentPos() {
	navigator.geolocation.getCurrentPosition(
		function(position) { //on success
		    currentPos = {
				lat: position.coords.latitude,
				lng: position.coords.longitude,
			};
		},
		function(error) { //on failure
			$('#zipInputContainer').show();
            if(!currentPos) {
              addModalKeyDownHandler();
    					addModalClickHandler();
            }
			$('#errorModalTitle').text("We couldn't get your current position automatically")
			$('#errorModal').modal('show');
		},
        {
			enableHighAccuracy: true, // additional options
			timeout: 1000,
		}
	);
}
/* @function changePosition
*  prompt for and use ZIP code to create new location object.
* @param none;
* @return object {lat: '34', lng:'44'}
*/
function changePosition() {
	$('#zipInput').off();
	$('#submitBtn').off();
	addModalKeyDownHandler();
	addModalClickHandler();
	$('#zipInputContainer').show();
	$('#errorModal').modal('show');
}
/**
* addModalKeyDownHandler
*  add keydown and click handler to manage inputting zip code in modal
* @param: none;
* @calls validateZip, addressToLatLng
*/
function addModalKeyDownHandler() {
	$('#zipInput').keydown(function(e){
		switch(e.which) {
			case 13:
				if(validateZip($('#zipInput').val())) {
					addressToLatLng($('#zipInput').val());
                    setTimeout(function() {
                        currentPos = tempPos;
                    }, 1000);
                    $('#zipInputContainer').hide();
					$('#errorModal').modal('hide');
				}
				break;
		}
	});
}
/**
* @function addClickModalHandlers
*  add click handler to manage inputting zip code in modal
* @param none;
* @calls validateZip, addressToLatLng
*/
function addModalClickHandler() {
	$('#zipInputContainer button').click(function() {
		if(validateZip($('#zipInput').val())) {
			addressToLatLng($('#zipInput').val());
            setTimeout(function() {
                currentPos = tempPos;
            }, 1000);
            $('#zipInputContainer').hide();
			$('#errorModal').modal('hide');
		}
	});
}

function searchClickHandler() {
    $('.search').on('click',function () {
        console.log('clicked');
        var input = $('.searchInput').val();
        searchArtists(input);
    })
}
/**
* @function validateZip
*   ensure zip inputted is 5 in length and only numbers.
* @param: string; numbers
* @return boolean.
*/
function validateZip(zip) {
	return (parseInt(zip).toString() === zip && zip.length === 5);
}
/**
* @function makeMap
* constructs map placing a marker at currentPos
* @param: {object} object with keys lat and lng
* @return
*/

function makeMap(centerPoint = {lat: 33.6846, lng: -117.8265}) {
	// var mapCenter = new google.maps.LatLng(lat, lng);
	map = new google.maps.Map(document.getElementById('map'),{
		center:centerPoint,
		zoom: 13,
	});
	var marker = new google.maps.Marker({
          position: centerPoint,
          map: map,
  });
	currentPosMarker = marker;
	var infowindow = new google.maps.InfoWindow({
  	content:"You're Here!"
  });
	infowindow.open(map,marker);
}

/**
* @function convertAddress/ZipToLatLng
* convert input into an object with keys lat and lng
* @param: {string} address or zip typically
* @return
*/

function addressToLatLng(address) {
    geocoder ? '' : geocoder = new google.maps.Geocoder();
		geocoder.geocode({'address': address} , function(data, status) {
		if (status === 'OK') {
			tempPos = {
				lat: data[0].geometry.location.lat(),
				lng: data[0].geometry.location.lng(),
			};
			// makeMap(currentPos.lat, currentPos.lng);
		} else {
			$('#errorModal .modal-body').text('Geocode failed: ' + status);
			$('#errorModal').modal('show');
		}
	});
}

/**
* @function getDistanceAndTime
* calculates driving distance and duration between two points
* @param object or string origin and dest. inputs using posObj or address strings
* @return object {distance:00mi,duration:00min}
*/
var tempObj;
function getDistanceTime(origin, destination) {
    distMatrix ? '': distMatrix = new google.maps.DistanceMatrixService();
    distMatrix.getDistanceMatrix(
        {
            origins: [origin],
            destinations: [destination],
            travelMode: 'DRIVING',
            unitSystem: google.maps.UnitSystem.IMPERIAL,
            drivingOptions: {
                departureTime: new Date(Date.now()),
                trafficModel: 'bestguess',
            }
        },
        function(data, status) {
            if(status === 'OK') {
                tempObj = {
                    destination: data.destinationAddresses[0],
                    distance: data.rows[0].elements[0].distance.text,
                    duration: data.rows[0].elements[0].duration.text,
                }
								let durationDiv = $('<div>', {
									text: 'Drive time: '+ tempObj.duration,
									'class': 'durationDiv',
								});
								$('.eventDiv').append(durationDiv);
            } else {
                $('#errorModal .modal-body').text('DistMatrix failed: ' + status);
                $('errorModal').modal('show');
            }
        });

        // $.ajax({
        //   url: 'https://maps.googleapis.com/maps/api/distancematrix/json?'+
        //   'key=AIzaSyC4S4d0uon3xNEPOH5gIg61s_540od18ho'+
        //   '&origins='+origin+
        //   '&units=imperial'+
        //   '&destinations='+destination,
        //   type: "GET",
        //   dataType: 'json',
        //   success: function(data) {
        //     console.log(data);
        //   }
        // });
}
/**
* placeMarker - places down marker on map given obj with coordinates and event info
* @param: {object}
* @calls fitMapBounds && getDistanceTime
*/
function placeMarker(eventObj) {
	var venue = {
		lat: parseFloat(eventObj._embedded.venues[0].location.latitude),
		lng: parseFloat(eventObj._embedded.venues[0].location.longitude),
	};
	var marker = new google.maps.Marker({
		position: venue,
		map: map,
		title: eventObj.name,
	});
	var infoWindow = new google.maps.InfoWindow({
		content: '<div>'+ eventObj.dates.start.localDate+'</div>'+
			'<div>'+eventObj._embedded.venues[0].name+'</div>',
	});
	// marker.addListener('click', function(){
	// 	infoWindow.open(map, marker);
	// });
	infoWindow.open(map, marker);
	marker.addListener('click', function() {
		window.open('https://www.google.com/maps/dir/?api=1&destination='+
		eventObj._embedded.venues[0].location.latitude+','+
		eventObj._embedded.venues[0].location.longitude)
	});
	fitMapBounds(marker);
	getDistanceTime(currentPos, venue);
}
/**
* @function adjustZoom
*	@param obj marker or array of markers.
* adjust zoom of map based on markers currently on map. currently limited at 2
*/
function fitMapBounds(marker) {
	var markers = [currentPosMarker, marker];
	var bounds = new google.maps.LatLngBounds();
	for (var i = 0; i < markers.length; i++) {
		bounds.extend(markers[i].getPosition());
	}
	map.fitBounds(bounds);
}
/***********************************************************************************************************************
 * renderConcertInfoPage
 * @param: {object} artist_obj
 * @calls makeMap, placeMarker
*/
function renderConcertInfoPage(artist, eventIndex) {
	$('.eventPopout > div').remove();
	let artistDiv = $('<div>', {'class': 'col-4 artistPortrait'});
	let artistImg = $('<img>', {
		css: {
			"background-image": `url(${artist.images[2].url})`,
		},
		'class': 'rounded-circle img-responsive circleBorder',
	});
	let artistName = $('<div>', {
		'class':'text-center caption',
		'text': artist.name,
	})
	let closeBtn = $('<button>', {
		'class': 'btn btn-danger',
		on: {
			click: () => {
				$('.eventPopoutContainer').slideToggle();
			}
		},
		text: 'Close'
	});
	artistDiv.append(artistImg, artistName,closeBtn);
	let eventDiv = $('<div>', {'class': 'col-8 card-body eventDiv'});
	let eventVenue = $('<div>', {'class': 'eventVenue', text: artist.events[eventIndex]._embedded.venues[0].name});
	let eventAddress = $('<div>', {'class': 'eventAddress', text: artist.events[eventIndex]._embedded.venues[0].address.line1});
	let eventCity = $('<div>', {
		'class': 'eventCity',
		'text': artist.events[eventIndex]._embedded.venues[0].city.name+', '+
			artist.events[eventIndex]._embedded.venues[0].state.stateCode+' '+
			artist.events[eventIndex]._embedded.venues[0].postalCode,
		});
	let eventDate = $('<div>', {'class': 'eventDate', 'text': artist.events[eventIndex].dates.start.localDime});
	let eventTime = $('<div>', {'class': 'eventTime', 'text': 'StartTime: '+artist.events[eventIndex].dates.start.localTime});
	let eventDistance =  $('<div>', {'class': 'eventDistance', text: 'Distance: '+artist.events[eventIndex]._embedded.venues[0].distance +' miles'});
	let ticketBtn = $('<button>', {
		'class': 'btn btn-info',
		on: {
			click: () => {
				window.open(artist.events[eventIndex].url);
			}
		},
		text: 'Cost ' + checkPrice(),
	});
	function checkPrice() {
		return (artist.events[eventIndex].priceRanges ? artist.events[eventIndex].priceRanges[0].min+' to '+artist.events[eventIndex].priceRanges[0].max +' '+ artist.events[eventIndex].priceRanges[0].currency : '?')
	}
	eventDiv.append(eventVenue, eventAddress, eventCity, eventDate ,eventTime, ticketBtn, eventDistance);
	let mapDiv = $('<div>', {
		'id':'map',
		'class':'col-12',
	});
	$('.eventPopout').append(artistDiv, eventDiv, mapDiv);
	makeMap(currentPos);
	placeMarker(artist.events[eventIndex]);
}

/***********************************************************************************************************************
 * renderArtists
 * @param: {object} artists_obj
 * @calls: renderOneArtist, createInfoDropDown
*/
function renderArtists(artists_obj) {
    let artistIndex = 0;
    let dropDownIndex = 0;
	for(let rowIndex = 0; rowIndex < 4; rowIndex++){
        var rowDiv = $('<div>',{
            'class': 'row mt-3 artistsRow accordion',
            role: 'tablist'
        });
        let indexLimit = artistIndex + 3;
        for(artistIndex; artistIndex < indexLimit; artistIndex++){
        	let singleArtist = renderOneArtist(artists_obj.artists[artistIndex]);
        	rowDiv.append(singleArtist);
        }
        for (dropDownIndex; dropDownIndex < indexLimit; dropDownIndex++){
            let dropDown = createInfoDropDown(artists_obj.artists[dropDownIndex]);
            rowDiv.append(dropDown);
            artists_obj.artists[dropDownIndex].row = rowDiv;
        }
		$(".artistContainer").append(rowDiv);
    }
}
/***********************************************************************************************************************
 * renderOneArtist - renders the artist and their information on DOM
 * @param: {object, DomElement} artist, rowDiv - a single object from the artists_object
*/
function renderOneArtist (artist) {
	let name = artist.name;
	let imageUrl = artist.images[2].url;
	let id = artist.id;
	let aTag = $("<a>", {
	    "data-toggle": "collapse",
	    "href": `#collapse${artist.name}`
	});
	artist.accordionCollapse = aTag;
	let colDiv = $('<div>',{
	    'class': 'col-4'
	});
	let img = $('<div>',{
	    css: {"background-image": `url(${imageUrl})`},
	    'class': 'rounded-circle img-responsive w-100 circleBorder',
	    id: id,
		on: {
			click: () => {
				getLocalEvents(currentPos,artist);
				getRelatedArtists()
			}
		}
	});
	let nameDiv = $('<div>',{
	    text: name,
	    'class': 'text-center caption'
	});
	aTag.append(img, nameDiv);
	return colDiv.append(aTag);
}
/***********************************************************************************************************************
 * createArtistInfo -
 */
function createInfoDropDown(artist){
    let fullDiv = $("<div>",{
       "class": "col-12 artistInfo",
    });
    artist.infoRow = fullDiv;
    let collapseDiv = $("<div>",{
       id: `collapse${artist.name}`,
       "class": "collapse hide",
        role: "tabpanel",
        "aria-labelledby": "headingOne",
        "data-parent": "#accordion"
    });
    let body = $("<div>", {
       "class": "card-body"
    });
    let calRow = renderEvents(artist.events);
    let relatedTitle = $("<p>",{
        "class": "text-center",
        text: "Related Artists"
    });
    let relatedArtists = populateRelatedArtists(example);
    return fullDiv.append(collapseDiv.append(body.append(calRow, $("<hr>"), relatedTitle, relatedArtists)));
}
/***********************************************************************************************************************
 *@function renderOneRelated
 * @param: {object} artist
 */
function renderOneRelated(artist) {
    let name = artist.name;
    let imageUrl = artist.images[2].url;
    let id = artist.id;
    let colDiv = $('<div>',{
        'class': 'col-3'
    });
    let img = $('<div>',{
        css: {"background-image": `url(${imageUrl})`},
        'class': 'rounded-circle img-responsive w-100 circleBorder',
        id: id,
        on: {
            click: () => {
                console.log("Related artist clicked");
            }
        }
    });
    let nameDiv = $('<div>',{
        text: name,
        'class': 'text-center caption'
    });
    return colDiv.append(img, nameDiv);
}
/***********************************************************************************************************************
 *@function populateRelatedArtists
 */
function populateRelatedArtists(artistsObj){
    let relatedRow = $("<div>",{
        "class": "row mt-3 relatedArtistRow"
    });
    for (let relatedIndex = 0; relatedIndex < 4; relatedIndex++){
        let artistElement = renderOneRelated(artistsObj.artists[relatedIndex]);
        relatedRow.append(artistElement);
    }
    return relatedRow;
}

/***********************************************************************************************************************
 * renderOneEvent -
 *
 */
function renderOneEvent(domElement, eventObj, indexNum){
    let date = eventObj.dates.start.localDate;
    let location = eventObj._embedded.venues[indexNum].name;
    let calendar = $("<div>",{
       "class": "col-3 dates",
        text: date
    });
    let icon = $("<i>",{
        "class": "fa fa-calendar",
        "aria-hidden": "true"
    });
    let venue = $("<div>",{
       "class": "col-9 venueName",
       text: location
    });
    calendar.append(icon);
    domElement.append(calendar, venue);
}
/***********************************************************************************************************************
 * renderEvents -
 *
 */
function renderEvents(eventArray){
    let calRow = $("<div>", {
        "class": "row mt-3"
    });
    let infoContain = $("<div>",{
        "class": "col-12"}).append($("<p>",{"class": "text-center", text: "Upcoming Events"}));
    let datesContain = $("<div>",{
       "class": "row eventList"
    });
    calRow.append(infoContain);
    if (eventArray === undefined){
        datesContain.append($("<p>",{
            "class": "col-12",
            text: "there are no events for this artist"
        }));
        return datesContain;
    } else {
    	let maxEvents = eventArray.length > 4 ? 4 : eventArray.length;
        for (let eventIndex = 0; eventIndex < maxEvents; eventIndex++){
            renderOneEvent(datesContain, eventArray[eventIndex], eventIndex);
        }
        return calRow.append(datesContain);
    }
}

/***********************************************************************************************************************
*getTopArtists
*/
function getTopArtists(user) {
  let artists = [];
	$.ajax({
		dataType: 'json',
		url: 'https://api.spotify.com/v1/user/top/artists',
		limit: 9,
		method: 'GET',
		success: function (response) {
			console.log(response);
			artists = (response.artists);
        },
        error: function (response) {
            console.log('error');
        }
    });
}
/*********************************************************************************************************************
 *getRelatedArtists -
 * @param: {string} artist -
 * @returns: {object} relatedArtists
 */
function getRelatedArtists(artistID) {
    //"3WrFJ7ztbogyGnTHbHJFl2"
    $.ajax({
        url: 'http://spotify.iamandyong.com/related_artists',
        dataType: 'json',
        method: 'POST',
        limit: 10,
        data: {
            artist_id: artistID
        },
        success: function (response) {
            console.log(response);
            let relatedArtists = {};
            relatedArtists.artists = response.data.items;
            renderArtists(relatedArtists)
        },
        error: function (response) {
            console.log('error');
        }
    });
}
/***********************************************************************************************************************
 * searchArtists - ajax call for Spotify from search bar
 * @param: {string} input -
 */
function searchArtists(input) {
    let searchedArtist = {};
    $.ajax({
        url: "http://spotify.iamandyong.com/search_artists",
        dataType: 'json',
        method: 'POST',
        data: {
            search_term: input,
            limit: 10
        },
        success: function (response) {
            console.log(response);
            searchedArtist.artists = response.data.items;
            console.log(searchedArtist);
        }
    });
}
/***********************************************************************************************************************
 * getLocalEvents - ajax call for TicketMaster local search
 * @param: {object, string} coordObj, artist - object with 'lat' & 'lng' properties, each containing a string of numbers
 * @returns: {undefined} none
*/
function getLocalEvents (coordObj, artist) {
	if(coordObj !== null
		){
		$.ajax({
			method: 'GET',
	        dataType: 'json',
			url: `https://app.ticketmaster.com/discovery/v2/events.json?apikey=L3aWCQHOVxRR9AVMMbIEd8XXZC6DXiH8&latlong=${coordObj.lat},${coordObj.lng}&radius=100&unit=miles&keyword=${artist.name}&classificationName=music`,
			success:  response => {
				if(response.hasOwnProperty('_embedded')){
					let eventArray = [];
					response._embedded.events.forEach( (event) => {eventArray.push(event)} );
					artist.events = eventArray;
				} else {
					// $(p > '.artist').text('No local events scheduled at this time')
					alert('No information to display')
				}
				var oldRowParent = artist.infoRow.parent();
				artist.infoRow.remove();
			 	oldRowParent.append(createInfoDropDown(artist));
			 	artist.row.find('.show').removeClass('show');
			 	document.getElementById("collapse"+artist.name).classList.add('show');
			 	//$("div[id='collapse"+artist.name+"']").addClass('show');
			},
			error: response => {
				console.log(response);
			}
		})
	} else {
		getCurrentPos();
	}
}
//-------------------------------------------------------------------------------
// Below function is depricated, due to having the information returned in the event object
//-------------------------------------------------------------------------------
// /***********************************************************************************************************************
//  * getEventInfo - ajax call for TicketMaster Event information and pricing
//  * @params {string} eventID of the specific event !!Could use URL of event from objects returned, just need
//  * @returns: {undefined} none
// */
// let seatPricing = null;
// function getEventInfo(eventID){
// 	$.ajax({
// 		method: 'GET',
// 		url: `https://app.ticketmaster.com/commerce/v2/events/${eventID}/offers.json?apikey=L3aWCQHOVxRR9AVMMbIEd8XXZC6DXiH8`,
// 		success:  response => {
// 			let prices = [];
// 			let objects = response.offers[0].attributes.prices;
// 			objects.map( object => prices.push(object.value) );
// 			prices.sort( (a,b) => parseFloat(a)-parseFloat(b) );
// 			seatPricing = prices
// 		},
// 		error: response => {
// 			console.log(response);
// 		}
// 	})
// }


/***********************************************************************************************************************
 * *********************************************************************************************************************
 * this is an example of the spotify api return
 * *********************************************************************************************************************
***********************************************************************************************************************/
var example = {
    "artists" : [ {
        "external_urls" : {
            "spotify" : "https://open.spotify.com/artist/0jnsk9HBra6NMjO2oANoPY"
        },
        "followers" : {
            "href" : null,
            "total" : 5043039
        },
        "genres" : [ "dance pop", "edm", "pop", "pop rap", "post-teen pop", "r&b", "southern hip hop", "tropical house" ],
        "href" : "https://api.spotify.com/v1/artists/0jnsk9HBra6NMjO2oANoPY",
        "id" : "0jnsk9HBra6NMjO2oANoPY",
        "images" : [ {
            "height" : 640,
            "url" : "https://i.scdn.co/image/2d0b5f483c7ed95b7c3c63147c3d38f9366b2c21",
            "width" : 640
        }, {
            "height" : 320,
            "url" : "https://i.scdn.co/image/98f6070f467c5b95e09505aeda1aa5b48d1a133d",
            "width" : 320
        }, {
            "height" : 160,
            "url" : "https://i.scdn.co/image/d1a78628d48a855d51ab7d74b6d78c22ee8a2b63",
            "width" : 160
        } ],
        "name" : "Flo Rida",
        "popularity" : 82,
        "type" : "artist",
        "uri" : "spotify:artist:0jnsk9HBra6NMjO2oANoPY"
    }, {
        "external_urls" : {
            "spotify" : "https://open.spotify.com/artist/6MF9fzBmfXghAz953czmBC"
        },
        "followers" : {
            "href" : null,
            "total" : 973817
        },
        "genres" : [ "dance pop", "edm", "pop", "pop rap", "post-teen pop", "r&b", "tropical house" ],
        "href" : "https://api.spotify.com/v1/artists/6MF9fzBmfXghAz953czmBC",
        "id" : "6MF9fzBmfXghAz953czmBC",
        "images" : [ {
            "height" : 640,
            "url" : "https://i.scdn.co/image/dedc6fcfc7ec914af993c783a60a8f34bdcfaa01",
            "width" : 640
        }, {
            "height" : 320,
            "url" : "https://i.scdn.co/image/2c156e614f24740952bd2f216df2ff34f0b285bb",
            "width" : 320
        }, {
            "height" : 160,
            "url" : "https://i.scdn.co/image/f32759120c9bdcecd757c96be04e5e8a3f8f8b8b",
            "width" : 160
        } ],
        "name" : "Taio Cruz",
        "popularity" : 71,
        "type" : "artist",
        "uri" : "spotify:artist:6MF9fzBmfXghAz953czmBC"
    }, {
        "external_urls" : {
            "spotify" : "https://open.spotify.com/artist/085pc2PYOi8bGKj0PNjekA"
        },
        "followers" : {
            "href" : null,
            "total" : 1611605
        },
        "genres" : [ "dance pop", "pop", "pop rap", "post-teen pop", "r&b", "tropical house" ],
        "href" : "https://api.spotify.com/v1/artists/085pc2PYOi8bGKj0PNjekA",
        "id" : "085pc2PYOi8bGKj0PNjekA",
        "images" : [ {
            "height" : 1000,
            "url" : "https://i.scdn.co/image/d9e6047498dc100048c4597be2aa1d20ebf6df40",
            "width" : 1000
        }, {
            "height" : 640,
            "url" : "https://i.scdn.co/image/ffb9f989856095ea16e38a0898e424294b88903c",
            "width" : 640
        }, {
            "height" : 113,
            "url" : "https://i.scdn.co/image/c0be328a0231bc8a8b388908e5deb8edf39d74d3",
            "width" : 200
        }, {
            "height" : 36,
            "url" : "https://i.scdn.co/image/a4cc50668e961ade3a6050d25461ab3f50a0b28a",
            "width" : 64
        } ],
        "name" : "will.i.am",
        "popularity" : 75,
        "type" : "artist",
        "uri" : "spotify:artist:085pc2PYOi8bGKj0PNjekA"
    }, {
        "external_urls" : {
            "spotify" : "https://open.spotify.com/artist/3sgFRtyBnxXD5ESfmbK4dl"
        },
        "followers" : {
            "href" : null,
            "total" : 2293456
        },
        "genres" : [ "dance pop", "edm", "pop", "pop rap" ],
        "href" : "https://api.spotify.com/v1/artists/3sgFRtyBnxXD5ESfmbK4dl",
        "id" : "3sgFRtyBnxXD5ESfmbK4dl",
        "images" : [ {
            "height" : 675,
            "url" : "https://i.scdn.co/image/2d75f5222d8a92d5e12419ae3e5238261f943df6",
            "width" : 1000
        }, {
            "height" : 432,
            "url" : "https://i.scdn.co/image/a91b72640d92fa70bfc7556d38114b3f010c5cc5",
            "width" : 640
        }, {
            "height" : 135,
            "url" : "https://i.scdn.co/image/9b592e53e0ae00516c65580a254113bc7d0933e2",
            "width" : 200
        }, {
            "height" : 43,
            "url" : "https://i.scdn.co/image/e7a7f70dc456d6844e2c15b44c4ff1853aac54f8",
            "width" : 64
        } ],
        "name" : "LMFAO",
        "popularity" : 69,
        "type" : "artist",
        "uri" : "spotify:artist:3sgFRtyBnxXD5ESfmbK4dl"
    }, {
        "external_urls" : {
            "spotify" : "https://open.spotify.com/artist/698hF4vcwHwPy8ltmXermq"
        },
        "followers" : {
            "href" : null,
            "total" : 666704
        },
        "genres" : [ "dance pop", "edm", "pop", "pop christmas", "pop rap" ],
        "href" : "https://api.spotify.com/v1/artists/698hF4vcwHwPy8ltmXermq",
        "id" : "698hF4vcwHwPy8ltmXermq",
        "images" : [ {
            "height" : 640,
            "url" : "https://i.scdn.co/image/0b157b64c62c3d783412147dec56b5bb03e7c33c",
            "width" : 640
        }, {
            "height" : 320,
            "url" : "https://i.scdn.co/image/09b6e7c6554c8b12ece3abf44cbd0e6bc53e889c",
            "width" : 320
        }, {
            "height" : 160,
            "url" : "https://i.scdn.co/image/7b14aeb3dd47774bab1cf90a11ddddb96ab686fc",
            "width" : 160
        } ],
        "name" : "Far East Movement",
        "popularity" : 69,
        "type" : "artist",
        "uri" : "spotify:artist:698hF4vcwHwPy8ltmXermq"
    }, {
        "external_urls" : {
            "spotify" : "https://open.spotify.com/artist/6S0dmVVn4udvppDhZIWxCr"
        },
        "followers" : {
            "href" : null,
            "total" : 654086
        },
        "genres" : [ "dance pop", "pop", "pop christmas", "pop rap", "post-teen pop", "r&b", "rap", "soul christmas", "southern hip hop", "urban contemporary" ],
        "href" : "https://api.spotify.com/v1/artists/6S0dmVVn4udvppDhZIWxCr",
        "id" : "6S0dmVVn4udvppDhZIWxCr",
        "images" : [ {
            "height" : 860,
            "url" : "https://i.scdn.co/image/faf6044a48f42c6530483f31e9e213d159546eb5",
            "width" : 750
        }, {
            "height" : 734,
            "url" : "https://i.scdn.co/image/d998c11101483881a1c1a7ddea987d8f6466a2e3",
            "width" : 640
        }, {
            "height" : 229,
            "url" : "https://i.scdn.co/image/8efebfbfad1daa764334cbc70ee6becad461e9c5",
            "width" : 200
        }, {
            "height" : 73,
            "url" : "https://i.scdn.co/image/4237286c9d8ab36f2257f9fa618a22643a55e2bd",
            "width" : 64
        } ],
        "name" : "Sean Kingston",
        "popularity" : 71,
        "type" : "artist",
        "uri" : "spotify:artist:6S0dmVVn4udvppDhZIWxCr"
    }, {
        "external_urls" : {
            "spotify" : "https://open.spotify.com/artist/7sfl4Xt5KmfyDs2T3SVSMK"
        },
        "followers" : {
            "href" : null,
            "total" : 497341
        },
        "genres" : [ "crunk", "dance pop", "dirty south rap", "gangster rap", "hip hop", "hip pop", "pop rap", "rap", "southern hip hop", "trap music" ],
        "href" : "https://api.spotify.com/v1/artists/7sfl4Xt5KmfyDs2T3SVSMK",
        "id" : "7sfl4Xt5KmfyDs2T3SVSMK",
        "images" : [ {
            "height" : 640,
            "url" : "https://i.scdn.co/image/ab976e368187909123518fcceefbfbab44ae6d3c",
            "width" : 640
        }, {
            "height" : 320,
            "url" : "https://i.scdn.co/image/a0619a0d4d9881a8954ea44e340cdeb697d446d6",
            "width" : 320
        }, {
            "height" : 160,
            "url" : "https://i.scdn.co/image/a13610d139e7943df5be0ad28ad7e21cf82cd266",
            "width" : 160
        } ],
        "name" : "Lil Jon",
        "popularity" : 75,
        "type" : "artist",
        "uri" : "spotify:artist:7sfl4Xt5KmfyDs2T3SVSMK"
    }, {
        "external_urls" : {
            "spotify" : "https://open.spotify.com/artist/1ackd5XprZEkH3McKbQD51"
        },
        "followers" : {
            "href" : null,
            "total" : 780864
        },
        "genres" : [ "electro latino", "latin", "latin pop", "pop", "reggaeton", "tropical" ],
        "href" : "https://api.spotify.com/v1/artists/1ackd5XprZEkH3McKbQD51",
        "id" : "1ackd5XprZEkH3McKbQD51",
        "images" : [ {
            "height" : 640,
            "url" : "https://i.scdn.co/image/168cbd30c0b63dababe6509718c40fdeaa00e1b7",
            "width" : 640
        }, {
            "height" : 320,
            "url" : "https://i.scdn.co/image/b718d525a667573e6675aaed91f60a1a9e20b0cf",
            "width" : 320
        }, {
            "height" : 160,
            "url" : "https://i.scdn.co/image/88493626125f4a0780abbb693db1aeb2e28f618d",
            "width" : 160
        } ],
        "name" : "Juan Magán",
        "popularity" : 81,
        "type" : "artist",
        "uri" : "spotify:artist:1ackd5XprZEkH3McKbQD51"
    }, {
        "external_urls" : {
            "spotify" : "https://open.spotify.com/artist/7qG3b048QCHVRO5Pv1T5lw"
        },
        "followers" : {
            "href" : null,
            "total" : 4728452
        },
        "genres" : [ "dance pop", "latin", "latin pop", "pop", "tropical" ],
        "href" : "https://api.spotify.com/v1/artists/7qG3b048QCHVRO5Pv1T5lw",
        "id" : "7qG3b048QCHVRO5Pv1T5lw",
        "images" : [ {
            "height" : 640,
            "url" : "https://i.scdn.co/image/7bcf74dc08f729c2a7932add1069ffbcf50821d8",
            "width" : 640
        }, {
            "height" : 320,
            "url" : "https://i.scdn.co/image/00bcfc2ee3d000ba2b5e516d08a0b173eea6ed29",
            "width" : 320
        }, {
            "height" : 160,
            "url" : "https://i.scdn.co/image/cf50e8e99f886cd6f3738e62e1148d164c51105c",
            "width" : 160
        } ],
        "name" : "Enrique Iglesias",
        "popularity" : 82,
        "type" : "artist",
        "uri" : "spotify:artist:7qG3b048QCHVRO5Pv1T5lw"
    }, {
        "external_urls" : {
            "spotify" : "https://open.spotify.com/artist/4pADjHPWyrlAF0FA7joK2H"
        },
        "followers" : {
            "href" : null,
            "total" : 449836
        },
        "genres" : [ "dance pop", "desi", "indian pop", "pop", "pop rap", "post-teen pop", "r&b", "urban contemporary" ],
        "href" : "https://api.spotify.com/v1/artists/4pADjHPWyrlAF0FA7joK2H",
        "id" : "4pADjHPWyrlAF0FA7joK2H",
        "images" : [ {
            "height" : 640,
            "url" : "https://i.scdn.co/image/74598dd9a42cc467adb5f062ce001e8b40508770",
            "width" : 640
        }, {
            "height" : 320,
            "url" : "https://i.scdn.co/image/0eda283821f91a62b15462d6ea78a5f86d2e474a",
            "width" : 320
        }, {
            "height" : 160,
            "url" : "https://i.scdn.co/image/9278d43061abb513190e5bf734497e85338ccd57",
            "width" : 160
        } ],
        "name" : "Jay Sean",
        "popularity" : 70,
        "type" : "artist",
        "uri" : "spotify:artist:4pADjHPWyrlAF0FA7joK2H"
    }, {
        "external_urls" : {
            "spotify" : "https://open.spotify.com/artist/2cy1zPcrFcXAJTP0APWewL"
        },
        "followers" : {
            "href" : null,
            "total" : 583344
        },
        "genres" : [ "cubaton", "latin", "latin hip hop", "latin pop", "pop", "reggaeton", "tropical" ],
        "href" : "https://api.spotify.com/v1/artists/2cy1zPcrFcXAJTP0APWewL",
        "id" : "2cy1zPcrFcXAJTP0APWewL",
        "images" : [ {
            "height" : 640,
            "url" : "https://i.scdn.co/image/5a1883768f2765960d5ef0a342f720ab56992905",
            "width" : 640
        }, {
            "height" : 320,
            "url" : "https://i.scdn.co/image/e53a2fa72adec536ba8fef16fc09274cceefe98f",
            "width" : 320
        }, {
            "height" : 160,
            "url" : "https://i.scdn.co/image/60f90c6ea9d8a14ff268055398725a9d4278b229",
            "width" : 160
        } ],
        "name" : "Gente De Zona",
        "popularity" : 81,
        "type" : "artist",
        "uri" : "spotify:artist:2cy1zPcrFcXAJTP0APWewL"
    }, {
        "external_urls" : {
            "spotify" : "https://open.spotify.com/artist/07YZf4WDAMNwqr4jfgOZ8y"
        },
        "followers" : {
            "href" : null,
            "total" : 4195677
        },
        "genres" : [ "dance pop", "pop", "pop rap", "post-teen pop", "r&b" ],
        "href" : "https://api.spotify.com/v1/artists/07YZf4WDAMNwqr4jfgOZ8y",
        "id" : "07YZf4WDAMNwqr4jfgOZ8y",
        "images" : [ {
            "height" : 640,
            "url" : "https://i.scdn.co/image/50e885b04dbe6f9691428b0e1661e489cdc7603a",
            "width" : 640
        }, {
            "height" : 320,
            "url" : "https://i.scdn.co/image/ed15b3eeedbd2cd3bd8880a2bf5f47b68412d856",
            "width" : 320
        }, {
            "height" : 160,
            "url" : "https://i.scdn.co/image/d079edab9b1c71884b715db957464fd4de451f0c",
            "width" : 160
        } ],
        "name" : "Jason Derulo",
        "popularity" : 87,
        "type" : "artist",
        "uri" : "spotify:artist:07YZf4WDAMNwqr4jfgOZ8y"
    }, {
        "external_urls" : {
            "spotify" : "https://open.spotify.com/artist/2DlGxzQSjYe5N6G9nkYghR"
        },
        "followers" : {
            "href" : null,
            "total" : 3546612
        },
        "genres" : [ "dance pop", "hip pop", "pop", "pop rap", "post-teen pop", "r&b", "urban contemporary" ],
        "href" : "https://api.spotify.com/v1/artists/2DlGxzQSjYe5N6G9nkYghR",
        "id" : "2DlGxzQSjYe5N6G9nkYghR",
        "images" : [ {
            "height" : 1333,
            "url" : "https://i.scdn.co/image/71b0c671d5decfe38df81549a56dcef11e8649a1",
            "width" : 1000
        }, {
            "height" : 853,
            "url" : "https://i.scdn.co/image/3966d522ec082e4d209aea77758fa81e18f77705",
            "width" : 640
        }, {
            "height" : 267,
            "url" : "https://i.scdn.co/image/a7d65c23311c12553bb509c873b20983b269cb3b",
            "width" : 200
        }, {
            "height" : 85,
            "url" : "https://i.scdn.co/image/4af53d4ccc6ed80c1d2c931947743b7d16f8effa",
            "width" : 64
        } ],
        "name" : "Jennifer Lopez",
        "popularity" : 80,
        "type" : "artist",
        "uri" : "spotify:artist:2DlGxzQSjYe5N6G9nkYghR"
    }, {
        "external_urls" : {
            "spotify" : "https://open.spotify.com/artist/5Y5TRrQiqgUO4S36tzjIRZ"
        },
        "followers" : {
            "href" : null,
            "total" : 800934
        },
        "genres" : [ "dance pop", "hip hop", "hip pop", "pop", "pop rap", "r&b", "rap", "southern hip hop", "urban contemporary" ],
        "href" : "https://api.spotify.com/v1/artists/5Y5TRrQiqgUO4S36tzjIRZ",
        "id" : "5Y5TRrQiqgUO4S36tzjIRZ",
        "images" : [ {
            "height" : 640,
            "url" : "https://i.scdn.co/image/71e2c7a1026d3a2397ae7ee08797a95d9a16c19f",
            "width" : 640
        }, {
            "height" : 320,
            "url" : "https://i.scdn.co/image/7003b8afd2d8cd0485b7d1aee66a18a5df77b290",
            "width" : 320
        }, {
            "height" : 160,
            "url" : "https://i.scdn.co/image/403883343e55df40147b4f6bd3f7c8a2e395a7d6",
            "width" : 160
        } ],
        "name" : "Timbaland",
        "popularity" : 78,
        "type" : "artist",
        "uri" : "spotify:artist:5Y5TRrQiqgUO4S36tzjIRZ"
    }, {
        "external_urls" : {
            "spotify" : "https://open.spotify.com/artist/2w9zwq3AktTeYYMuhMjju8"
        },
        "followers" : {
            "href" : null,
            "total" : 580950
        },
        "genres" : [ "dance pop", "pop" ],
        "href" : "https://api.spotify.com/v1/artists/2w9zwq3AktTeYYMuhMjju8",
        "id" : "2w9zwq3AktTeYYMuhMjju8",
        "images" : [ {
            "height" : 640,
            "url" : "https://i.scdn.co/image/a079e10e2a1c29f640580f50b8feeafee54c6c15",
            "width" : 640
        }, {
            "height" : 320,
            "url" : "https://i.scdn.co/image/ddf5c8eddab0694aea4ab6ebacde3c515564861a",
            "width" : 320
        }, {
            "height" : 160,
            "url" : "https://i.scdn.co/image/03ed89b8977b8a9d44955d378b1ae783569b3084",
            "width" : 160
        } ],
        "name" : "INNA",
        "popularity" : 70,
        "type" : "artist",
        "uri" : "spotify:artist:2w9zwq3AktTeYYMuhMjju8"
    }, {
        "external_urls" : {
            "spotify" : "https://open.spotify.com/artist/5NS0854TqZQVoRmJKSWtFZ"
        },
        "followers" : {
            "href" : null,
            "total" : 759698
        },
        "genres" : [ "electro latino", "latin", "latin hip hop", "latin pop", "pop", "pop reggaeton", "reggaeton", "tropical" ],
        "href" : "https://api.spotify.com/v1/artists/5NS0854TqZQVoRmJKSWtFZ",
        "id" : "5NS0854TqZQVoRmJKSWtFZ",
        "images" : [ {
            "height" : 1333,
            "url" : "https://i.scdn.co/image/58f4cb709e715a2c3d2e37401a09145a109aa20c",
            "width" : 1000
        }, {
            "height" : 853,
            "url" : "https://i.scdn.co/image/c9a8768ade92fc93e8fbec79d9cc11d6aac5e3d3",
            "width" : 640
        }, {
            "height" : 267,
            "url" : "https://i.scdn.co/image/51a7beea1943851b2e3527b889662a2d1676233b",
            "width" : 200
        }, {
            "height" : 85,
            "url" : "https://i.scdn.co/image/402f284329cd6c70170632c32e99d5799162d2ba",
            "width" : 64
        } ],
        "name" : "Chino & Nacho",
        "popularity" : 70,
        "type" : "artist",
        "uri" : "spotify:artist:5NS0854TqZQVoRmJKSWtFZ"
    }, {
        "external_urls" : {
            "spotify" : "https://open.spotify.com/artist/3ATyg4fGC9F8trfb0GRWmX"
        },
        "followers" : {
            "href" : null,
            "total" : 579518
        },
        "genres" : [ "latin", "latin hip hop", "latin pop", "pop", "pop reggaeton", "reggaeton", "tropical" ],
        "href" : "https://api.spotify.com/v1/artists/3ATyg4fGC9F8trfb0GRWmX",
        "id" : "3ATyg4fGC9F8trfb0GRWmX",
        "images" : [ {
            "height" : 640,
            "url" : "https://i.scdn.co/image/487bd375ae416d73d6d219853e30cab0e1ffc62f",
            "width" : 640
        }, {
            "height" : 320,
            "url" : "https://i.scdn.co/image/4b46725f25ef7521ff603b466959c011a46b6b3f",
            "width" : 320
        }, {
            "height" : 160,
            "url" : "https://i.scdn.co/image/56d15a1b89d7b6068cfcf3a190c46247735f340e",
            "width" : 160
        } ],
        "name" : "Joey Montana",
        "popularity" : 78,
        "type" : "artist",
        "uri" : "spotify:artist:3ATyg4fGC9F8trfb0GRWmX"
    }, {
        "external_urls" : {
            "spotify" : "https://open.spotify.com/artist/3Isy6kedDrgPYoTS1dazA9"
        },
        "followers" : {
            "href" : null,
            "total" : 1446088
        },
        "genres" : [ "dance pop", "dancehall", "pop", "pop rap", "r&b", "reggae fusion" ],
        "href" : "https://api.spotify.com/v1/artists/3Isy6kedDrgPYoTS1dazA9",
        "id" : "3Isy6kedDrgPYoTS1dazA9",
        "images" : [ {
            "height" : 640,
            "url" : "https://i.scdn.co/image/1e4adec937164bd52733a5927723628425efe2f2",
            "width" : 640
        }, {
            "height" : 320,
            "url" : "https://i.scdn.co/image/64f4f28f28496b3d488f07ff1e704dc3319adef0",
            "width" : 320
        }, {
            "height" : 160,
            "url" : "https://i.scdn.co/image/54dbf80d084cbf908df36081ffdb041684801c90",
            "width" : 160
        } ],
        "name" : "Sean Paul",
        "popularity" : 84,
        "type" : "artist",
        "uri" : "spotify:artist:3Isy6kedDrgPYoTS1dazA9"
    }, {
        "external_urls" : {
            "spotify" : "https://open.spotify.com/artist/6c4sUNBgdonFJz8Kx2VsGz"
        },
        "followers" : {
            "href" : null,
            "total" : 219308
        },
        "genres" : [ "dance pop", "norwegian hip hop", "pop rap", "tropical house" ],
        "href" : "https://api.spotify.com/v1/artists/6c4sUNBgdonFJz8Kx2VsGz",
        "id" : "6c4sUNBgdonFJz8Kx2VsGz",
        "images" : [ {
            "height" : 640,
            "url" : "https://i.scdn.co/image/316c4a45a1ae634c72de288ff673eb501575f1ce",
            "width" : 640
        }, {
            "height" : 320,
            "url" : "https://i.scdn.co/image/b40ee4bcd9ba13f7a1e1ddea765bbf8c96265e9d",
            "width" : 320
        }, {
            "height" : 160,
            "url" : "https://i.scdn.co/image/707bbcc13ea6609ecb7d8ec79eda4239171acd54",
            "width" : 160
        } ],
        "name" : "Madcon",
        "popularity" : 65,
        "type" : "artist",
        "uri" : "spotify:artist:6c4sUNBgdonFJz8Kx2VsGz"
    }, {
        "external_urls" : {
            "spotify" : "https://open.spotify.com/artist/0Ol3Jol2T3lZZVLNNzWPhj"
        },
        "followers" : {
            "href" : null,
            "total" : 108502
        },
        "genres" : [ "dance pop", "edm", "europop", "pop house", "tropical house" ],
        "href" : "https://api.spotify.com/v1/artists/0Ol3Jol2T3lZZVLNNzWPhj",
        "id" : "0Ol3Jol2T3lZZVLNNzWPhj",
        "images" : [ {
            "height" : 600,
            "url" : "https://i.scdn.co/image/8997d4d41ac35efbe4a29496316985a5610d6f22",
            "width" : 600
        }, {
            "height" : 300,
            "url" : "https://i.scdn.co/image/99370547e40d9394ab8eb5e1f9ae13d776797c3c",
            "width" : 300
        }, {
            "height" : 64,
            "url" : "https://i.scdn.co/image/81557301330182eb6c297ad8532f609e501e9e36",
            "width" : 64
        } ],
        "name" : "R.I.O.",
        "popularity" : 59,
        "type" : "artist",
        "uri" : "spotify:artist:0Ol3Jol2T3lZZVLNNzWPhj"
    } ]
};
