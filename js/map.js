function initMap() {
	var coords = {lat: 45.752008, lng: 4.866884};

	var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 12,
		fullscreenControl: false,
		center: coords
	});
}