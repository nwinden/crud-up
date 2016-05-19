var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/mu';


router.get('/', function(req, res) {

  pg.connect(connectionString, function(err, client, done) {

    if (err) {
      res.sendStatus(500);
    }

    client.query(
      'SELECT * FROM owners',
      function(err, result) {
        done();

        if (err) {
          res.sendStatus(500);
        }

        res.send(result.rows);
      }
    );
  });

});

router.post('/', function(req, res) {

  var owner = req.body;

  pg.connect(connectionString, function(err, client, done) {

    if (err) {
      res.sendStatus(500);
    }

    client.query( 'INSERT INTO owners (first_name, last_name)' +
                  'values($1, $2)', [owner.first_name, owner.last_name],
                  function(err, result) {
                    done();

                    if (err) {
                      res.sendStatus(500);
                    }

                    res.sendStatus(201);
                  });

  });

});

module.exports = router;
