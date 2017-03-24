
function initMap() {

	var mapProp= {
	    center: new google.maps.LatLng(37.773972,-122.431297),
	    zoom: 12,
	};

	var map =new google.maps.Map(document.getElementById("googleMap"),mapProp);
	var bounds = new google.maps.LatLngBounds();

	// Multiple Markers
	// var markers = [
	//     ['Life 360', 37.780197,-122.396812],
	//     ['Drop Box', 37.7810361,-122.3948917],
	//     ['Twilio', 37.7879277,-122.3937508],
	//     ['LinkedIn', 37.7866023,-122.4004687],
	// ];


	var infoWindow = new google.maps.InfoWindow();
	var marker;

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
}
