require('dotenv').config();
const keys = require('./keys.js');
const moment = require('moment');
const Spotify = require('node-spotify-api');
const dotenv = require('dotenv');
const axios = require('axios');


const spotify = new Spotify(keys.spotify);

const searchType = process.argv[2];
let searchTerm = process.argv.slice(3).join('+');

spotifySearch = (searchTerm) => {
    console.log('searching spotify here.')
    if (searchTerm) {
        spotify
            .search({ type: 'track', query: `${searchTerm}` })
            .then(function (response) {
                console.log(response.tracks.items.forEach(function (x) {
                    console.log('Artist(s): ' + x.album.artists[0].name);
                    console.log('Song Name: ' + x.name);
                    console.log('Link: ' + x.external_urls.spotify);
                    console.log('Album: ' + x.album.name);
                    // console.log(response.tracks.items[0].artists.name);
                    console.log('000000000')
                }));
            })
            .catch(function (err) {
                console.log(err);
            });
    } else {
        spotify
            .search({ type: 'track', query: `the sign ace of base` })
            .then(function (response) {
                console.log(response.tracks.items.forEach(function (x) {
                    console.log('Artist(s): ' + x.album.artists[0].name);
                    console.log('Song Name: ' + x.name);
                    console.log('Link: ' + x.external_urls.spotify);
                    console.log('Album: ' + x.album.name);
                    // console.log(response.tracks.items[0].artists.name);
                    console.log('000000000')
                }));
            })
            .catch(function (err) {
                console.log(err);
            });
    }
}

omdbSearch = (searchTerm) => {

    if (searchTerm) {
        axios.get(`http://www.omdbapi.com/?t=${searchTerm}&y=&plot=short&apikey=trilogy`).then(
            function (response) {
                console.log('Title: ' + response.data.Title);
                console.log('Year: ' + response.data.Year);
                console.log('IMDB Rating: ' + response.data.imdbRating);
                console.log('Rotten Tomatoes Rating: ' + response.data.Ratings[1].Value);
                console.log('Country: ' + response.data.Country);
                console.log('Language: ' + response.data.Language);
                console.log('Plot: ' + response.data.Title);
                console.log('Actors: ' + response.data.Actors);
            })
            .catch(function (error) {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log("---------------Data---------------");
                    console.log(error.response.data);
                    console.log("---------------Status---------------");
                    console.log(error.response.status);
                    console.log("---------------Status---------------");
                    console.log(error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an object that comes back with details pertaining to the error that occurred.
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log("Error", error.message);
                }
                console.log(error.config);
            });
    } else {
        axios.get(`http://www.omdbapi.com/?t=Mr.+Nobody&y=&plot=short&apikey=trilogy`).then(
            function (response) {
                console.log('Title: ' + response.data.Title);
                console.log('Year: ' + response.data.Year);
                console.log('IMDB Rating: ' + response.data.imdbRating);
                console.log('Rotten Tomatoes Rating: ' + response.data.Ratings[1].Value);
                console.log('Country: ' + response.data.Country);
                console.log('Language: ' + response.data.Language);
                console.log('Plot: ' + response.data.Title);
                console.log('Actors: ' + response.data.Actors);
            })
            .catch(function (error) {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log("---------------Data---------------");
                    console.log(error.response.data);
                    console.log("---------------Status---------------");
                    console.log(error.response.status);
                    console.log("---------------Status---------------");
                    console.log(error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an object that comes back with details pertaining to the error that occurred.
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log("Error", error.message);
                }
                console.log(error.config);
            });
    }

}

bandsSearch = (searchterm) => {
    axios.get(`https://rest.bandsintown.com/artists/${searchTerm}/events?app_id=codingbootcamp`).then(
        function (response) {
            console.log(response.data);
            response.data.forEach(res => {
                console.log('Venue: ' + res.venue.name);
                console.log('City: ' + res.venue.city)
                console.log('Date: ' + moment(res.datetime).format('L'));
                console.log('-----');
            })
        })
        .catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log("---------------Data---------------");
                console.log(error.response.data);
                console.log("---------------Status---------------");
                console.log(error.response.status);
                console.log("---------------Status---------------");
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        });
}

searchFromRandom = () => {

}

switch (searchType) {
    case 'spotify-this-song':
        spotifySearch(searchTerm);
        break;

    case 'movie-this':
        omdbSearch(searchTerm);
        break;

    case 'concert-this':
        bandsSearch(searchTerm);
        break;

    case 'do-what-it-says':
        searchFromRandom();
        break;
}