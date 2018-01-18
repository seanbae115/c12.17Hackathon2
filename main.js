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
	//renderPlayBox(example.artists[0].id);
    //renderArtists(example);
    getTopArtists();
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
			timeout: 7000,
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
    $('.search').on('click', searchArtists);
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
	$('.eventPopoutContainer').slideToggle();
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
 * renderPlayBox
 * @param: element artist.id
 * @calls: renderOneArtist
 */
function renderPlayBox(id) {
    var rowDiv = $('<div>',{
        'class': 'row mt-3 artistsRow accordion',
        role: 'tablist'
    });
    var playBox = $('<iframe>',{
        id: 'playBox',
        src: "https://open.spotify.com/embed?uri=spotify:artist:"+id,
        css: {
            width: 340,
            height: 80,
            border: 0
        }
    });
    rowDiv.append(playBox);
    $(".artistContainer").append(rowDiv);
}
/***********************************************************************************************************************
 * changePlayBox
 * @param: element artist.id
 * @calls: none
 */
function changePlayBox(id) {
    $('#playBox').attr('src', "https://open.spotify.com/embed?uri=spotify:artist:"+id);
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
				getLocalEvents(currentPos,artist),
				getRelatedArtists(id),
        		changePlayBox(id)
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
       "class": "card-body relArt"
    });
    let calRow = renderEvents(artist.events, artist);
    let relatedTitle = $("<p>",{
        "class": "text-center",
        text: "Related Artists"
    });
    // let relatedArtists = getRelatedArtists(artist.id);
    // return fullDiv.append(collapseDiv.append(body.append(calRow, $("<hr>"), relatedTitle, relatedArtists)));
    return fullDiv.append(collapseDiv.append(body.append(calRow, $("<hr>"), relatedTitle)));
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
    $(".relArt").append(relatedRow);
}

/***********************************************************************************************************************
 * renderOneEvent -
 *
 */
function renderOneEvent(domElement, eventObj, indexNum, artist){
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
       text: location,
			 on : {
				click: () => {
					renderConcertInfoPage(artist, indexNum);
				}
			}
    });
    calendar.append(icon);
    domElement.append(calendar, venue);
}
/***********************************************************************************************************************
 * renderEvents -
 *
 */
function renderEvents(eventArray, artist){
    let calRow = $("<div>", {
        "class": "row mt-3"
    });
    let infoContain = $("<div>",{
        "class": "col-12"}).append($("<p>",{"class": "text-center", text: "Upcoming Events"}));
    let datesContain = $("<div>",{
       "class": "row eventList",
    });
    calRow.append(infoContain);
    if (eventArray === undefined){
        datesContain.append($("<p>",{
            "class": "col-12",
            text: "There are no events for this artist"
        }));
        return datesContain;
    } else {
    	let maxEvents = eventArray.length > 4 ? 4 : eventArray.length;
        for (let eventIndex = 0; eventIndex < maxEvents; eventIndex++){
            renderOneEvent(datesContain, eventArray[eventIndex], eventIndex, artist);
        }
        return calRow.append(datesContain);
    }
}

/***********************************************************************************************************************
*getTopArtists
*/
function getTopArtists(user) {
  let topArtists = {};
	$.ajax({
		dataType: 'json',
		url: 'http://spotify.iamandyong.com/top/artists',
		limit: 9,
		method: 'GET',
		success: function (response) {
			topArtists.artists = (response.data);
            renderPlayBox(topArtists.artists[0].id);
			renderArtists(topArtists);

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
            relatedArtists.artists = response.data;
            populateRelatedArtists(relatedArtists)
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
    input = $('.searchInput').val();
    if(input){
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
                searchedArtist.artists = response.data.items;
                console.log(searchedArtist)
                //renderSearchArtist(searchedArtist.artists[0])
            }
        });
    }
}

/*function renderSearchArtist(artist) {
    var firstArtist = $('#')
}*/
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
