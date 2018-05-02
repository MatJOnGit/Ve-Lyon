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
        zoom: 11.7,
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
        
        const marker = new google.maps.Marker({
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
    stationInfo.style.display = "flex";
    stationInfo.style.flexDirection = "column";
    stationInfo.style.justifyContent = "center";
    
    const stationName = document.createElement('p');
    stationName.textContent = 'La station "' + stations[stationNumber].name + '" est actuellement';
    stationName.style.textAlign = "center";

    const stationStatus = document.createElement('div');
    stationStatus.textContent = stations[stationNumber].status === 'CLOSED' ? 
        'FERMEE' :
        stations[stationNumber].available_bikes > 0 ?
            'OUVERTE' :
            "ouverte, mais il n'y a pas de vélo disponible actuellement";
    stationStatus.style.backgroundColor = stations[stationNumber].status_color;
    stationStatus.style.color = "white";
    stationStatus.style.textAlign = "center";

    const dataTable = document.createElement('table');
    dataTable.style.margin = "16px 0";

    const address = document.createElement('tr');
    
    const addressTitle = document.createElement('td');
    addressTitle.textContent = "Adresse";
    
    const addressContent = document.createElement('td');
    addressContent.textContent = stations[stationNumber].address.toLowerCase();

    const availableBikes = document.createElement('tr');
    
    const availableBikesTitle = document.createElement('td');
    availableBikesTitle.textContent = "Nombre de vélo(s) disponible(s)";
    
    const availableBikesContent = document.createElement('td');
    availableBikesContent.textContent = stations[stationNumber].available_bikes;
    
    const availableStands = document.createElement('tr');
    
    const availableStandsTitle = document.createElement('td');
    availableStandsTitle.textContent = "Nombre d'emplacement(s) disponible(s)";
    
    const availableStandsContent = document.createElement('td');
    availableStandsContent.textContent = stations[stationNumber].bike_stands - stations[stationNumber].available_bikes;

    stationInfo.appendChild(stationName);
    stationInfo.appendChild(stationStatus);
    
    address.appendChild(addressTitle);
    address.appendChild(addressContent);
    dataTable.appendChild(address);
    
    availableBikes.appendChild(availableBikesTitle);
    availableBikes.appendChild(availableBikesContent);
    dataTable.appendChild(availableBikes);
    
    availableStands.appendChild(availableStandsTitle);
    availableStands.appendChild(availableStandsContent);
    dataTable.appendChild(availableStands);
    
    stationInfo.appendChild(dataTable);
    
    if (stations[stationNumber].flag_color === 'blue') {
        var bookingButton = document.createElement('button');
        bookingButton.textContent = "Je réserve un vélo'v";
        bookingButton.style.margin = '16px 90px';
        
        stationInfo.appendChild(bookingButton);
        
        bookingButton.addEventListener("click", function () {
            initBooking(stations[stationNumber]);
        });
    }
}

function initBooking(station) {
    console.log(station.name);
}

const stationInfo = document.getElementById('infosStation');

fetch('https://cors-anywhere.herokuapp.com/https://api.jcdecaux.com/vls/v1/stations?contract=lyon&apiKey=699ee067b85c71a4f7ca9adfdcaaa5145b06a437')
    .then(response => response.json())
    .then(data => stationsTabBuilder(data))
    .then(data => initMap(data))
    .catch(error => console.log(error));