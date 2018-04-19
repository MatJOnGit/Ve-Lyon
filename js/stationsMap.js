// Initialize a google map in the map div
function initMap(stationsLyon) {
    
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 11.8,
        center: {lat: 45.762324, lng: 4.852030} 
    });
    
    var flagColor = "";
    
    stationsLyon.forEach(function (station) {
        if (station.status === "CLOSED") {
            flagColor = "yellow";
        } else if (station.available_bikes > 0) {
            flagColor = "blue";
        } else {
            flagColor = "red";
        }
        
        var marker = new google.maps.Marker({
            position: {
                lat: station.position.lat, 
                lng: station.position.lng
            },
            map: map,
            icon: {
                //url: "images/markers/blue_flag.png",
                url: "images/markers/" + flagColor + "_flag.png",
                scaledSize: new google.maps.Size(25, 25)
            }
        });
    });
    
    //var markerCluster = new MarkerClusterer(map, marker, {
        //imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
    //});
}

// Récupérer les données à exploiter de toutes les stations dans un format utilisable et les stocker dans un tableau
ajaxGet("https://cors-anywhere.herokuapp.com/https://api.jcdecaux.com/vls/v1/stations?contract=lyon&apiKey=699ee067b85c71a4f7ca9adfdcaaa5145b06a437", function (reponse) {
    // Récupération des données dans un tableau Javascript
    var stationsLyon = JSON.parse(reponse);
    initMap(stationsLyon);
});

// Générer un marqueur dépendant du fait qu'il soit possible de réserver un vélo ou non (dépendant lui-même du status de la station et du nombre de vélo dispo)