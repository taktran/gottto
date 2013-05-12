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

var urlRegex = /^((https?):\/\/)?(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;

function isValidUrl(str) {
  return urlRegex.test(str);
}

function hasHttpPrefix(url) {
  return /^(https?):\/\//.test(url);
}

app.get('/', function(req, res) {
  var dataRef = new Firebase(firebaseUrl),
    url = req.query.url,
    reset = req.query.reset;

  if (reset) {
    var url = "";
    var dataRef = new Firebase(firebaseUrl);
    dataRef.set(url);

    res.redirect("/");
  } else {
    if (url) {
      if (isValidUrl(url)) {
        url = hasHttpPrefix(url) ? url : "http://" + url;
        console.log(url);

        var dataRef = new Firebase(firebaseUrl);
        dataRef.set(url);
      }

      res.redirect("/");
    } else {
      dataRef.once('value', function(data) {
        var url = data.val();

        res.render("index.html", {
          firebaseUrl: firebaseUrl,
          url: url
        });
      });
    }
  }
});

// Should be a `post` as it modifies state, but need a simple `get` for now
app.get('/url/*', function(req, res) {
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});