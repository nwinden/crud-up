var express = require('express');
var app = express ();
var bodyParser = require('body-parser');
var path = require('path');
var pg = require('pg');
var owners = require('./routes/owners');
var pets = require('./routes/pets');
var connectionString = 'postgres://localhost:5432/mu';

app.use(bodyParser.urlencoded({extended:true}));

app.set('port', (process.env.PORT || 3000));


app.use('/owners', owners);

app.use('/pets' , pets);


app.get('/*', function(req, res) {
  var file = req.params[0] || 'views/index.html';
  res.sendFile(path.join(__dirname, "./public", file));
});

app.listen(app.get('port'), function() {
  console.log('server is ready on port: ' + app.get('port'));
});
