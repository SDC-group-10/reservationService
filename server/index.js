const express = require('express');
const parser = require('body-parser');
const serverFunctions = require('../database/index.js');

const searchReservationByListingId = serverFunctions.searchReservationByListingId;
const searchUsersByUsername = serverFunctions.searchUsersByUsername;
const searchListingById = serverFunctions.searchListingById;

//
let app = express();
app.set('port', 3003);
app.use(parser.json());

app.get('/dogs', (req, res) => {
  console.log('dogs got pinged');
})

app.get('/api/reservations/:listing_id', (req, res) => {
  // console.log(req.params.listing_id);
  // console.log(serverFunctions);
  searchReservationByListingId(req.params.listing_id, res.send.bind(res));
});

app.get('/api/users/:username', (req, res) => {
  searchUsersByUsername(req.params.username, res.send.bind(res));
});

app.get('/api/listings/:id', (req, res) => {
  searchListingById(req.params.id, res.send.bind(res));
})

app.post('/api/reservations/', (req, res) => {

})


app.listen(app.get('port'), ()=> {
  console.log('connected, listening on port number 3003');
})