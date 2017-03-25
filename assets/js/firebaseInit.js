var config = {
  apiKey: "AIzaSyA1g2zHte-oWy_n2r_BQCGZ7ydZnAaEK3k",
  authDomain: "careerfantastic-e91d7.firebaseapp.com",
  databaseURL: "https://careerfantastic-e91d7.firebaseio.com",
  storageBucket: "careerfantastic-e91d7.appspot.com",
  messagingSenderId: "389453357831"
};
firebase.initializeApp(config);
var database = firebase.database();
var jobsAppliedDB = database.ref("/test");
var appliedMarkers = [];
/*
$( document ).ready(function() {
	 // Handler for .ready() called.
	 database.ref("/test").on("value", function(snapshot){
	     // storing the snapshot.val() in a variable for convenience
	  	 var sv = snapshot.val();
	  	 // Getting an array of each key In the snapshot object
	  	 var svArr = Object.keys(sv);

	  	svArr.forEach(function (index) {

	    var marker = [];
	    marker.push(sv[svArr[index]].company);
	    marker.push(sv[svArr[index]].latitude);
	    marker.push(sv[svArr[index]].longitude);
	    appliedMarkers.push(marker);
		});
		console.log("appliedMarkers>>>" + appliedMarkers[3]);
	})
});
*/

