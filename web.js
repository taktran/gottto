var express = require("express");
var Firebase = require('firebase'),
  firebaseUrl = 'https://gottto.firebaseIO.com/';
var app = express();
app.use(express.logger());

app.set('views', __dirname + '/app/views');
app.engine('html', require('ejs').renderFile);

app.get('/', function(req, res) {
  var dataRef = new Firebase(firebaseUrl);

  dataRef.once('value', function(data) {
    var url = data.val();

    res.render("index.html", {
      url: url
    });

  });
});

app.get('/url/*', function(req, res) {
  var url = req.params[0];
  console.log(url);

  // TODO: url validation
  var dataRef = new Firebase(firebaseUrl);
  dataRef.set(url);

  res.redirect("/");
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});