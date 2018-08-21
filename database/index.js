require('newrelic');
const redis = require("redis");
const cassandra = require('cassandra-driver');

const cassandraClient = new cassandra.Client({ contactPoints: ['localhost'], keyspace: 'reservations' });
const redisClient = redis.createClient();


let searchReservationByListingId = (listing_id, callback) => {
  let redisKey = `reservation:${listing_id}`;
  redisClient.get(redisKey, (err, reply)=> {
    if (reply !== null) {
      callback(JSON.parse(reply));
    } else if (err) {
      console.log('error: ', err);
      callback('there was an error with redis');
    } else {
      let query = `SELECT * from reservations_by_listing WHERE listing_id = ?`;
      cassandraClient.execute(query, [listing_id], {hints: ['int']})
        .then((result) => { // does response.send end the funciton
          redisClient.set(redisKey, JSON.stringify(result.rows));
          callback(result.rows);
        });
    }
  })
}

let searchUsersByUsername = (username, callback) => {
  let redisKey = `user:${username}`;
  redisClient.get(redisKey, (err, reply)=> {
    if (reply !== null) {
      callback(JSON.parse(reply));
    } else if (err) {
      console.log('error: ', err);
      callback('there was an error with redis');
    } else {
      let query = `SELECT * from users WHERE username = ?`;
      cassandraClient.execute(query, [username], {hints: ['text']})
        .then((result) => { // does response.send end the funciton
          redisClient.set([redisKey, JSON.stringify(result.rows)]);
          callback(result.rows);
        });
    }
  })
}

let searchListingById = (id, callback) => {
  let redisKey = `listing:${id}`;
  redisClient.get(redisKey, (err, reply)=> {
    if (reply !== null) {
      callback(JSON.parse(reply));
    } else if (err) {
      console.log('error: ', err);
      callback('there was an error with redis');
    } else {
      let query = `SELECT * from listings WHERE id = ?`;
      cassandraClient.execute(query, [id], {hints: ['int']})
        .then((result) => { // does response.send end the funciton
          redisClient.set(redisKey, result.rows);
          callback((result.rows));
        });
    }
  })
};

let postReservation = (listing_id, check_in, check_out, username, adults, charge, createdAt, puppies, callback) => {
    let redisKey = `reservation:${listing_id}`;
    redisClient.get(redisKey, (err, reply) => {
      if (reply !== null) {
        //check type of reply and push to there, if not slice reply (copy)

      } else if (err) {
        console.log('error: ', err);
        callback('there was an error with redis')
      } else {
        let query = `insert into reservations_by_listing (listing_id, check_in, check_out, username, adults, charge, createdAt, puppies) values ()`;
      }
    })
}

module.exports.searchReservationByListingId = searchReservationByListingId;
module.exports.searchUsersByUsername = searchUsersByUsername;
module.exports.searchListingById = searchListingById;
// module.exports.postReservation = postReservation;


