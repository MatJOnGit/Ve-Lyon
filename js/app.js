// Create a filtered tab from the JC Decaux data tab
function stationsTabBuilder(stations) {
    let stationsTab = [];

    stations.forEach(station => {
        
        const stationArray = new Station(station.name, station.address, station.position.lat, station.position.lng, station.status, station.bike_stands, station.available_bikes);
        
        stationsTab.push(stationArray);
    });
    return stationsTab;
}

// Display a google map in the "map" div
function initMap(stations) {
    
    const map = new google.maps.Map(document.getElementById('map'), {
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
    let markers = [];
    stations.forEach(station => {
        
        let marker = new google.maps.Marker({
            position: {
                lat: station.latitude,
                lng: station.longitude
            },
            map: map,
            icon: {
                url: station.displayFlagURL(),
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

// Display station data into "infosStation" div
function displayData(stations, stationNumber) {
    stationInfo.innerHTML = '';
    
    let stationTitle = document.createElement('p');
    stationTitle.textContent = 'Informations sur la station';

    let stationAddress = document.createElement('p');
    stationAddress.textContent = 'Adresse : ' + stations[stationNumber].address.toLowerCase();

    let stationStatus = document.createElement('p');
    stationStatus.textContent = 'Status de la station : ' + (stations[stationNumber].status === 'CLOSED' ? 'Fermée' : 'Ouverte');

    let stationAvailableBikes = document.createElement('p');
    stationAvailableBikes.textContent = "Nombre de vélo disponible : " + stations[stationNumber].available_bikes;

    let stationAvailableSlots = document.createElement('p');
    stationAvailableSlots.textContent = "Nombre d'emplacement disponible : " + (stations[stationNumber].bike_stands - stations[stationNumber].available_bikes);

    stationInfo.appendChild(stationTitle);
    stationInfo.appendChild(stationAddress);
    stationInfo.appendChild(stationStatus);
    stationInfo.appendChild(stationAvailableBikes);
    stationInfo.appendChild(stationAvailableSlots);
}

let stationInfo = document.getElementById('infosStation');

fetch('https://cors-anywhere.herokuapp.com/https://api.jcdecaux.com/vls/v1/stations?contract=lyon&apiKey=699ee067b85c71a4f7ca9adfdcaaa5145b06a437')
    .then(response => response.json())
    .then(data => stationsTabBuilder(data))
    .then(data => initMap(data))
    .catch(error => console.log(error));