
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
          redisClient.set(redisKey, JSON.stringify(result.rows));
          callback(result.rows);
        });
    }
  })
}

let searchListingById = (id, callback) => {
  let redisKey = `listing:${id}`;
  redisClient.get(redisKey, (err, reply)=> {
    if (reply !== null) {
      console.log(reply, typeof(reply))
      callback(JSON.parse(reply));
    } else if (err) {
      console.log('error: ', err);
      callback('there was an error with redis');
    } else {
      let query = `SELECT * from listings WHERE id = ?`;
      cassandraClient.execute(query, [id], {hints: ['int']})
        .then((result) => { // does response.send end the funciton
          redisClient.set(redisKey, JSON.stringify(result.rows));
          callback((result.rows));
        });
    }
  })
};

let redisDuplicateChecker = (allReservations, newReservation) => {
  for (var i =0; i < allReservations.length; i++) {
    if (JSON.stringify(allReservations[i]) === JSON.stringify(newReservation)) {
      return true;
    }
  }
  return false;
}

let postReservation = (listing_id, check_in, check_out, username, adults, charge, createdAt, puppies, callback) => {
    let redisKey = `reservation:${listing_id}`;
    redisClient.get(redisKey, (err, reply) => {
      if (reply !== null) {
        // console.log('*****FOUND*****');
        let query = `insert into reservations_by_listing (listing_id, check_in, check_out, username, adults, charge, createdAt, puppies) values (?, ?, ?, ?, ?, ?, ?, ?)`;
        cassandraClient.execute(query, [listing_id, check_in, check_out, username, adults, charge, createdAt, puppies], {hints : ['int', 'date', 'date', 'text', 'int', 'int', 'date', 'int']})
          .then(()=> {
            let result = JSON.parse(reply);
            // console.log(result);
            // console.log('REPLY: ', reply.charAt(0));
            let newReservation = {
              listing_id: listing_id,
              check_in: check_in,
              check_out: check_out,
              username: username,
              adults: adults,
              charge: charge,
              createdAt: createdAt,
              puppies: puppies
            }
            let newData = result.slice();
            if (!redisDuplicateChecker(newData, newReservation)) {
              newData.push(newReservation);
              redisClient.set(redisKey, JSON.stringify(newData));
            }
          })
        callback('Reservation successfully Posted!');
      } else if (err) {
        console.log('error: ', err);
        callback('there was an error with redis')
      } else {
        // console.log('***NOT*FOUND***');
        let query = `insert into reservations_by_listing (listing_id, check_in, check_out, username, adults, charge, createdAt, puppies) values (?, ?, ?, ?, ?, ?, ?, ?)`;
        cassandraClient.execute(query, [listing_id, check_in, check_out, username, adults, charge, createdAt, puppies], {hints : ['int', 'date', 'date', 'text', 'int', 'int', 'date', 'int']})
          .then(()=> {
            let newReservation = [{
              listing_id: listing_id,
              check_in: check_in,
              check_out: check_out,
              username: username,
              adults: adults,
              charge: charge,
              createdAt: createdAt,
              puppies: puppies
            }];
            // newReservation = JSON.stringify(newReservation);
            redisClient.set(redisKey, JSON.stringify(newReservation));
            callback('Reservation successfully Posted!');
          })
      }
    })
}



module.exports.searchReservationByListingId = searchReservationByListingId;
module.exports.searchUsersByUsername = searchUsersByUsername;
module.exports.searchListingById = searchListingById;
module.exports.postReservation = postReservation;


