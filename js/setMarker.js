function setMarker (latitude, longitude, name) {
    
    var marker = new google.maps.Marker({
        position: {lat: latitude, lng: longitude},
        setMap: map,
        title: name
    });
    
    console.log("La station nommée " + name + " a bien été ajoutée à la carte aux coordonnées suivantes ... lat.: " + latitude + "° N / long.: " + longitude + "° E.");
}