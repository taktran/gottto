/*global $:false, Firebase:false, FIREBASE_URL:false */

(function() {
  "use strict";

  var myDataRef = new Firebase(FIREBASE_URL);

  myDataRef.on('value', function(snapshot) {
    var url = snapshot.val();
    renderUrl(url);
  });

  function renderUrl(url) {
    $("#url").html(url);
  }
})();
