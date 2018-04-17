// Récupérer les données à exploiter de toutes les stations dans un format utilisable et les stocker dans un tableau
ajaxGet("https://cors-anywhere.herokuapp.com/https://api.jcdecaux.com/vls/v1/stations?contract=lyon&apiKey=699ee067b85c71a4f7ca9adfdcaaa5145b06a437", function (reponse) {
    // Récupération des données dans un tableau Javascript
    var stationsLyon = JSON.parse(reponse);
    //console.log(stationsLyon);
    
    stationsLyon.forEach(function (station) {
        var latitudeStation = station.position.lat;
        var longitudeStation = station.position.lng;
        var nomStation = station.name;
        
        setMarker(latitudeStation, longitudeStation, nomStation);
    });

});

// Générer un marqueur dépendant du fait qu'il soit possible de réserver un vélo ou non (dépendant lui-même du status de la station et du nombre de vélo dispo)