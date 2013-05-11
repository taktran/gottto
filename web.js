var express = require("express");
var Firebase = require('firebase'),
  firebaseUrl = 'https://gottto.firebaseIO.com/';
var app = express();
app.use(express.logger());

// views
app.set('views', __dirname + '/app/views');
app.engine('html', require('ejs').renderFile);

// serve static files
app.use(express.static(__dirname + '/app/public'));

app.get('/', function(req, res) {
  var dataRef = new Firebase(firebaseUrl);

  dataRef.once('value', function(data) {
    var url = data.val();

    res.render("index.html", {
      firebaseUrl: firebaseUrl,
      url: url
    });

  });
});

// Should be a `post` as it modifies state, but need a simple `get` for now
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