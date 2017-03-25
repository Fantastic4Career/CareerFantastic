var geocoder;
var infowindow;
var map;
var address;

function initMap() {

	var mapProp= {
	    center: new google.maps.LatLng(37.773972,-122.431297),
	    zoom: 12,
	};

	var map =new google.maps.Map(document.getElementById("googleMap"),mapProp);
	var bounds = new google.maps.LatLngBounds();

	// Multiple Markers testing
	var markers = [
	    ['Life 360', 37.780197,-122.396812],
	    ['Drop Box', 37.7810361,-122.3948917],
	    ['Twilio', 37.7879277,-122.3937508],
	    ['LinkedIn', 37.7866023,-122.4004687],
	];

	var geocoder = new google.maps.Geocoder;
  	var infowindow = new google.maps.InfoWindow;

	var marker;


	address = getAddress(geocoder, map, markers[0][1], markers[0][2]);
	console.log("address>>>" + address);

    // Loop through our array of markers & place each one on the map  
    for( var i = 0; i < markers.length; i++ ) {
        var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
        bounds.extend(position);
        marker = new google.maps.Marker({
            position: position,
            map: map,
            title: markers[i][0]
        });

     	// Allow each marker to have an info window    
        google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
                infoWindow.setContent("<h6>" + markers[i][0] + "</h6>");
                infoWindow.open(map, marker);
            }
        })(marker, i));

        // Automatically center the map fitting all markers on the screen
        map.fitBounds(bounds);

    }

    jobsAppliedDB.on("value", function(snapshot){
      console.log("map here is>>>", map);
      var appliedJobs = snapshot.val() || {};
      _.forEach(appliedJobs, function(job, key){
        console.log("job is>>>", job);
        if (job && job.latitude && job.longitude) {
          console.log("we are here>>>");
          var newmarker = new google.maps.Marker({
            position: new google.maps.LatLng(job.latitude,job.longitude),
            map: map,
            title: job.company
          });
          function setContent(marker) {

          }
          newmarker.addListener('click', function() {
            infowindow.setContent("<h6>" + newmarker.title + "</h6>");
            infowindow.open(map, newmarker);
          });
        }
      })
    })
}

function getAddress(geocoder, map, lat, long) {
  var latlng = {lat: lat, lng: long};
  geocoder.geocode({'location': latlng}, function(results, status) {
  	console.log("googleMap");
  	console.log(geocoder);
    if (status === 'OK') {
      if (results[1]) {
      	var address = results[1].formatted_address;
      	console.log(results[1].formatted_address);
   
      } else {
        window.alert('No results found');
      }
    } else {
      window.alert('Geocoder failed due to: ' + status);
    }
  });

}



