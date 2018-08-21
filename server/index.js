// require('newrelic');
const express = require('express');
const parser = require('body-parser');
const {
  searchReservationByListingId,
  searchUsersByUsername,
  searchListingById,
  postReservation,
} = require('../database/index.js');

// const searchReservationByListingId = databaseFunctions.searchReservationByListingId;
// const searchUsersByUsername = databaseFunctions.searchUsersByUsername;
// const searchListingById = databaseFunctions.searchListingById;
// const postReservation = databaseFunctions.postReservation;
//
let app = express();
app.set('port', 3003);
app.use(parser.json());

app.get('/abc', (req, res)=> {
  console.log('hi');
  res.send('hi');
})

app.use(express.static(__dirname + '/../public'));

app.get('/api/reservations/:listing_id', (req, res) => {
  searchReservationByListingId(req.params.listing_id, res.send.bind(res));
});

app.get('/api/users/:username', (req, res) => {
  searchUsersByUsername(req.params.username, res.send.bind(res));
});

app.get('/api/listings/:id', (req, res) => {
  searchListingById(req.params.id, res.send.bind(res));
})

app.post('/api/reservations/new', (req, res) => {
  console.log('post got pinged');
   // postReservation(0, '2018-08-21', '2018-08-21', 'admin', 5, 599, '2018-08-21', 3, res.send.bind(res));
})

app.get('/api/reservations/new', (req, res) => {
  console.log('post got pinged');
   // postReservation(0, '2018-08-21', '2018-08-21', 'admin', 5, 599, '2018-08-21', 3, res.send.bind(res));
})


app.listen(app.get('port'), ()=> {
  console.log('connected, listening on port number 3003');
})