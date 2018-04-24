// Create a filtered tab from the JC Decaux data tab
function stationsTabBuilder(stations) {
    var stationsTab = [];
    stations.forEach(function (station) {
        
//        const newStation = new Station(station.number, station.name, station.address, station.position.lat, station.position.lng, station.status, station.bike_stands, station.available_bikes);
        
//        var newStation = new Station(station.number, station.name, station.address);
        
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
            flag_color: station.status === 'CLOSED' ? 'red' : station.available_bikes > 0 ? 'blue' : 'yellow'
        }
        
        stationsTab.push(newStation);
    });
    return stationsTab;
}

// Display a google map in the "map" div
function initMap(stations) {
    
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
    stations.forEach(function (station) {
        
        var marker = new google.maps.Marker({
            position: station.position,
            map: map,
            icon: {
                url: "images/markers/" + station.flag_color + "_flag.png",
                scaledSize: new google.maps.Size(40, 40)
            }
        });
        
        marker.addListener('click', function () {
            // Center map on the selected item
            map.setZoom(18);
            map.setCenter(marker.getPosition());
            displayData(stations, markers.indexOf(this));
        })
        
        markers.push(marker);
    });
    
    var markerCluster = new MarkerClusterer(map, markers, {
        imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
    });
}

// Display station data into "infosStation" box
function displayData(stations, stationNumber) {
    stationInfo.innerHTML = "";
    
    var stationTitle = document.createElement("p");
    stationTitle.textContent = "Informations sur la station";
    
    var stationAddress = document.createElement("p");
    stationAddress.textContent = "Adresse : " + stations[stationNumber].address.toLowerCase();
    
    var stationStatus = document.createElement("p");
    stationStatus.textContent = "Status de la station : " + (stations[stationNumber].status === 'CLOSED' ? 'Fermée' : 'Ouverte');
    
    var stationAvailableBikes = document.createElement("p");
    stationAvailableBikes.textContent = "Nombre de vélo disponible : " + stations[stationNumber].available_bikes;
    
    var stationAvailableSlots = document.createElement("p");
    stationAvailableSlots.textContent = "Nombre d'emplacement disponible : " + (stations[stationNumber].bike_stands - stations[stationNumber].available_bikes);
    
    stationInfo.appendChild(stationTitle);
    stationInfo.appendChild(stationAddress);
    stationInfo.appendChild(stationStatus);
    stationInfo.appendChild(stationAvailableBikes);
    stationInfo.appendChild(stationAvailableSlots);
}

var stationInfo = document.getElementById("infosStation");

fetch('https://cors-anywhere.herokuapp.com/https://api.jcdecaux.com/vls/v1/stations?contract=lyon&apiKey=699ee067b85c71a4f7ca9adfdcaaa5145b06a437')
    .then(response => response.json())
    .then(data => stationsTabBuilder(data))
    .then(data => initMap(data))
    .catch(e => console.log(e));