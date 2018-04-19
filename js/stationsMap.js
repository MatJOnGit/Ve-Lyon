// Initialize a google map in the map div
function initMap(stationsLyon) {
    var coordsLyon = {lat: 45.752008, lng: 4.866884};

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: coordsLyon
    });
    
    stationsLyon.forEach(function (station) {
        //setMarker(station.position.lat, station.position.lng, station.name);
        var marker = new google.maps.Marker({
            position: {
                lat: station.position.lat, 
                lng: station.position.lng
            },
            setMap: map,
            title: station.name
        });
        
        console.log("La station nommée " + station.name + " a bien été ajoutée à la carte aux coordonnées suivantes ... lat.: " + station.position.lat + "° N / long.: " + station.position.lng + "° E.");
    });
}


// Récupérer les données à exploiter de toutes les stations dans un format utilisable et les stocker dans un tableau
ajaxGet("https://cors-anywhere.herokuapp.com/https://api.jcdecaux.com/vls/v1/stations?contract=lyon&apiKey=699ee067b85c71a4f7ca9adfdcaaa5145b06a437", function (reponse) {
    // Récupération des données dans un tableau Javascript
    var stationsLyon = JSON.parse(reponse);
    
    initMap(stationsLyon);
});

// Générer un marqueur dépendant du fait qu'il soit possible de réserver un vélo ou non (dépendant lui-même du status de la station et du nombre de vélo dispo)