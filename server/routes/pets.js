var express = require('express');
var router = express.Router();
var path = require('path');
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/mu';

router.get('/', function (req, res) {
  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      res.sendStatus(500);
    }

    client.query('SELECT pets.owner_id,pets.pet_name,pets.breed,pets.color,pets.id,owners.first_name,owners.last_name FROM pets JOIN owners ON owners.id = pets.owner_id', function (err, result) {
      done();



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

router.post('/check_in/', function(req, res){
  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      res.sendStatus(500);
    }
    console.log(req.body)
    client.query('INSERT INTO visits (check_in_date, pet_id)' + 'values($1, $2)', [req.body.check_in_date, req.body.pet_id],
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

    client.query('DELETE FROM visits WHERE pet_id =' + req.body.id + '; DELETE FROM pets WHERE id =' + req.body.id,
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

router.put('/', function (req, res) {
  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      res.sendStatus(500);
    }
    client.query('UPDATE pets SET pet_name = $1 ,  breed = $2 , color = $3  WHERE id =' + req.body.id,
      [req.body.pet_name, req.body.breed, req.body.color],
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

router.put('/check_out/', function (req, res) {
  console.log('check_out ran', req.body);
  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      res.sendStatus(500);
    }
    client.query('UPDATE visits SET check_out_date = $1 WHERE pet_id =' + req.body.pet_id,
      [req.body.check_out_date],
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
