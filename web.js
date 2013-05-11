var express = require("express");
var app = express();
app.use(express.logger());

app.set('views', __dirname + '/app/views');
app.engine('html', require('ejs').renderFile);

app.get('/', function(req, res) {
  res.render("index.html");
});

app.get('/url/*', function(req, res) {
  var url = req.params[0];
  console.log(url);
  res.redirect("/");
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});