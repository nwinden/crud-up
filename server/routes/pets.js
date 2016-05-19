var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/mu';

router.get('/', function (req, res) {
  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      res.sendStatus(500);
    }

    client.query('SELECT * FROM pets JOIN owners ON owners.id = pets.owner_id', function (err, result) {
      done();

      console.log(result.rows);

      res.send(result.rows);
    });
  });
});

router.post('/', function (req, res) {
  var pet = req.body;
  //console.log(pet);
  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      res.sendStatus(500);
    }

    client.query( 'INSERT INTO pets (owner_id, pet_name, breed, color)' +
                  'values($1, $2, $3, $4)', [pet.owner_id, pet.pet_name, pet.breed, pet.color],
                  function(err, result) {
                    done();

                    if (err) {
                      res.sendStatus(500);
                    }

                    res.sendStatus(201);
                  });

  });
});

router.delete('/', function (req, res) {
  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      res.sendStatus(500);
    }
      console.log('delete function', req.body);
    });
  });

module.exports = router;
