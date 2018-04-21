// Create a filtered tab from the JC Decaux data tab
function stationsTabBuilder(stationsLyon) {
    var stationsTab = [];
    stationsLyon.forEach(function (station) {
        
        var flagColor = "";
        if (station.status === "CLOSED") {
            flagColor = "yellow";
        } else if (station.available_bikes > 0) {
            flagColor = "blue";
        } else {
            flagColor = "red";
        }
        
        var newStation = {
            number: station.number,
            name: station.name,
            address: station.address,
            latitude: station.position.lat,
            longitude: station.position.lng,
            status: station.status,
            bike_stands: station.bike_stands,
            available_bikes: station.available_bikes,
            position: {
                lat: station.position.lat,
                lng: station.position.lng
            },
            flag_color: flagColor
        }
        stationsTab.push(newStation);
    });
    return stationsTab;
}

// Display a google map in the "map" div
function initMap(stationsLyon) {
    
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 11.8,
        center: {
            lat: 45.754424, 
            lng: 4.858030
        },
        fullscreenControl: false,
        mapTypeControl: false,
        streetViewControl: false
    });
    
    // Create a tab of marker objects to be displayed as elements of the marker cluster
    var markers = [];
    stationsLyon.forEach(function (station) {
        var marker = new google.maps.Marker({
            position: station.position,
            map: map,
            icon: {
                url: "images/markers/" + station.flag_color + "_flag.png",
                scaledSize: new google.maps.Size(40, 40)
            }
        });
        markers.push(marker);
    });
    
    var markerCluster = new MarkerClusterer(map, markers, {
        imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
    });
}

// Récupérer les données à exploiter de toutes les stations dans un format utilisable et les stocker dans un tableau
ajaxGet("https://cors-anywhere.herokuapp.com/https://api.jcdecaux.com/vls/v1/stations?contract=lyon&apiKey=699ee067b85c71a4f7ca9adfdcaaa5145b06a437", function (reponse) {
    // Récupération des données dans un tableau Javascript
    var stationsLyon = JSON.parse(reponse);
    stationsLyon = stationsTabBuilder(stationsLyon);
    initMap(stationsLyon);
});