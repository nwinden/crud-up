var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/mu';

router.get('/', function (req, res) {
  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      res.sendStatus(500);
    }

    client.query('SELECT pets.owner_id,pets.pet_name,pets.breed,pets.color,pets.id,owners.first_name,owners.last_name FROM pets JOIN owners ON owners.id = pets.owner_id', function (err, result) {
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
  console.log('delete function', req.body);
  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      res.sendStatus(500);
    }

    client.query('DELETE FROM pets WHERE id =' + req.body.id,
      function(err, result){
        done();
        if (err) {
          console.log(err);
          res.sendStatus(500);
          return;
        }
        res.sendStatus(200);
      })
  });

});



module.exports = router;
