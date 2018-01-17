//-------------------------------------------------------------------------------
// start document
//-------------------------------------------------------------------------------
/**
* Document ready
*
* Code to run when document has loaded
*/
$(document).ready(function() {

});
//-------------------------------------------------------------------------------
/**
 * @function getTopArtists
 * Ajax call to Spotify to get user top artists
 *
 * @Param {} user
*/
$(document).ready(function() {
	getCurrentPos();
});
/*************************************************************************************/
//var artists = [];
function getTopArtists(user) {
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
/*************************************************************************************
function renderArtists(artists_array) {
    for(var rowIndex = 0; rowIndex<3; rowIndex++){
        var rowDiv = $('<div>',{
            'class': 'row mt-3 artistsRow accordion',
            role: 'tablist'
        });
        for(var artistIndex = 0; artistIndex < artists.length; artistIndex++){
            var name = artists_array[artistIndex].name;
            var imageUrl = artists_array[artistIndex].image[2].url;
            var id = artist_array[artistIndex].id;
            var colDiv = $('<div>',{
                'class': 'col-4'
            });
            var img = $('<img>',{
                src: imageUrl,
                'class': 'rounded-circle border border-primary img-responsive w-100',
                id: id
            });
            var nameDiv = $('<div>',{
                text: name,
                'class': 'text-center caption'
            });
            colDiv.append(img, nameDiv);
        }

    }

}
/*************************************************************************************/
function addClickHandlers() {
    $('<img>').on('click', showInfo);
}
/*************************************************************************************/
function showInfo() {
}
/*************************************************************************************/
function getRelatedArtists(artist) {
    artist = $(this).attr('id');
    var relatedArtists = [];
    $.ajax({
        url: 'http://spotify.iamandyong.com/related_artists',
        dataType: 'json',
        method: 'GET',
        data: {
            artist_id: artist
        },
        success: function (response) {
            console.log(response);
            relatedArtists = (response.artists);
        },
        error: function (response) {
            console.log('error');
        }
    })
}

function searchArtists(input) {
    $.ajax({
        url: "http://spotify.iamandyong.com/search_artists",
        dataType: 'json',
        method: 'GET',
        data: {
            search_term: input
        },
        success: function (response) {
            console.log(response);
        }
    })
}

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
let map;
let currentPos = null;
let geocoder;
function getCurrentPos() {
	navigator.geolocation.getCurrentPosition(
		function(position) {
		//err
			currentPos = {
				lat: position.coords.latitude,
				lng: position.coords.longitude,
			};
            makeMap(currentPos.lat, currentPos.lng);
		},
		function(error) {
			$('#zipInputContainer').show();
			addModalKeyDownHandlers();
			addModalClickHandlers();
			$('#errorModal').modal('show');
		}, {
			enableHighAccuracy: true,
			timeout: 5000,
		}
	);
}
function addModalKeyDownHandlers() {
	$('#zipInput').keydown(function(e){
		switch(e.which) {
			case 13:
				if(checkZipInput($('#zipInput').val())) {
					$(this).off();
					addressToLatLng($('#zipInput').val());
					$('#errorModal').modal('hide');
				};
				break;
		}
	});
}
function addModalClickHandlers() {
	$('#zipInputContainer button').click(function() {
		if(checkZipInput($('#zipInput').val())) {
			$(this).off();
			 addressToLatLng($('#zipInput').val());
			$('#errorModal').modal('hide');
		}
	});
}
function checkZipInput(zip) {
	if (parseInt(zip).toString() === zip && zip.length === 5){
		return true;
	} return false;
}
function makeMap(lat = 33.669, lng = -117.823) {
	var mapCenter = new google.maps.LatLng(lat, lng);
	console.log(mapCenter);
	map = new google.maps.Map(document.getElementById('map'),{
		center:mapCenter,
		zoom: 13
	});
	var marker = new google.maps.Marker({
          position: mapCenter,
          map: map
  });
}
function addressToLatLng(address) {
	geocoder = new google.maps.Geocoder();
	geocoder.geocode({'address': address} , function(data, status) {
		if (status === 'OK') {
			currentPos = {
				lat: data[0].geometry.location.lat(),
				lng: data[0].geometry.location.lng(),
			};
			makeMap(currentPos.lat, currentPos.lng);
		} else {
			$('#errorModal .modal-body').text('Geocode failed: ' + status);
			$('errorModal').modal('show');
		}
	});
}

//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------
//var artists = [];
/*function getTop9Artists(user) {
=======
function getTopArtists(user) {
  var artists = [];
>>>>>>> d53838eb7a58fcbf68a475ce51efee51ff879a15
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
  return artists;
}
//-------------------------------------------------------------------------------
/**
 * @function renderArtists
 *
 * @param {array} artists_array
 *
*/

function renderArtists(artists_array) {
    let artistIndex = 0;
	for(let rowIndex = 0; rowIndex < 4; rowIndex++){
        let rowDiv = $('<div>',{
            'class': 'row mt-3 artistsRow accordion',
            role: 'tablist'
        });
        let indexLimit = artistIndex + 3;
        for(artistIndex; artistIndex < indexLimit; artistIndex++){
            let name = artists_array.artists[artistIndex].name;
            let imageUrl = artists_array.artists[artistIndex].images[2].url;
            let id = artists_array.artists[artistIndex].id;
            let aTag = $("<a>", {
                "data-toggle": "collapse",
                "href": "#collapseOne"
            });
            let colDiv = $('<div>',{
                'class': 'col-4'
            });
            let img = $('<div>',{
                css: {"background-image": `url(${imageUrl})`},
                'class': 'rounded-circle img-responsive w-100 circleBorder',
                id: id
            });
            let nameDiv = $('<div>',{
                text: name,
                'class': 'text-center caption'
            });
            aTag.append(img, nameDiv)
            colDiv.append(aTag);
            rowDiv.append(colDiv);
        }
		$(".artistContainer").append(rowDiv);
    }
}
//-------------------------------------------------------------------------------
/**
 * @function addClickHandlers
 *
 *
 *
*/

function addClickHandlers() {
    $('<img>').on('click', showInfo);
}
//-------------------------------------------------------------------------------
/**
 * @function showInfo
 *
 *
 *
*/

function renderRelated(artists_array) {

}
/*************************************************************************************/
function addClickHandlers() {
    $('<img>').on('click', showInfo);
}
/*************************************************************************************/
function showInfo() {

}
/*************************************************************************************/
function getRelatedArtists(artist) {
    artist = $(this).attr('id');
    var relatedArtists = [];
    $.ajax({
        url: 'http://spotify.iamandyong.com/related_artists',
        dataType: 'json',
        method: 'POST',
        limit: 10,
        data: {
            artist_id: artist
        },
        success: function (response) {
            console.log(response);
            relatedArtists = (response.artists);
        },
        error: function (response) {
            console.log('error');
        }
    });
    return relatedArtists;
}

function searchArtists(input) {
    $.ajax({
        url: "http://spotify.iamandyong.com/search_artists",
        dataType: 'json',
        method: 'POST',
        data: {
            search_term: input
        },
        success: function (response) {
            console.log(response);
        }
    })
}

/***************************************************************************************************
 * this is an example of the spotify api return*/
/**************************************************************************************************/
/**
 * ajax call for TicketMaster local search
 *
 * @function makeMap creates map
 *
 * @param ???
 *
 * @param {object} coorObj object with 'lat' & 'lng' properties, each containing a string of numbers
 * @param {string} artist name
 *
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
 * @function - ajax call for TicketMaster Event information and pricing
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
