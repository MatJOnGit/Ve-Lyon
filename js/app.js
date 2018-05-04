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
            displayStationData(stations, markers.indexOf(this));
        })
        
        markers.push(marker);
    });
    
    // Add a cluster container all markers previously created
    var markerCluster = new MarkerClusterer(map, markers, {
        imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
    });
}

// Display station data into "infosStation" div
function displayStationData(stations, stationNumber) {
    stationInfo.innerHTML = '';
    stationInfo.style.display = "flex";
    
    const stationName = document.createElement('p');
    stationName.textContent = 'La station "' + stations[stationNumber].name.toLowerCase() + '" est actuellement ...';

    const stationStatus = document.createElement('p');
    stationStatus.textContent = stations[stationNumber].status === 'CLOSED' ? 
        'Fermée' :
        stations[stationNumber].available_bikes > 0 ?
            'Ouverte' :
            "Ouverte, mais il n'y a pas de vélo disponible actuellement";
    stationStatus.style.backgroundColor = stations[stationNumber].status_color;

    const dataTable = document.createElement('table');

    const address = document.createElement('tr');
    
    const addressTitle = document.createElement('td');
    addressTitle.textContent = "Localisation";
    
    const addressContent = document.createElement('td');
    addressContent.textContent = stations[stationNumber].address;

    const availableBikes = document.createElement('tr');
    
    const availableBikesTitle = document.createElement('td');
    availableBikesTitle.textContent = "Vélo(s) disponible(s)";
    
    const availableBikesContent = document.createElement('td');
    availableBikesContent.textContent = stations[stationNumber].available_bikes;
    
    const availableStands = document.createElement('tr');
    
    const availableStandsTitle = document.createElement('td');
    availableStandsTitle.textContent = "Emplacement(s) libre(s)";
    
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
        const bookingButton = document.createElement('button');
        bookingButton.textContent = "Je réserve mon vélo'v";
        bookingButton.classList.add("bookingButton");
        
        bookingButton.addEventListener("click", function () {            
            initBooking(stations, stationNumber);
        });
        
        stationInfo.appendChild(bookingButton);
    }
}

function initBooking(stations, stationNumber) {
        
    const bookedStation = new Booking(stations[stationNumber].name, stations[stationNumber].bike_stands, stations[stationNumber].available_bikes)
    
    stationInfo.innerHTML = '';
    
    // create a button to come back to previous screen
    const cancelButton = document.createElement('div');
    cancelButton.textContent = 'X';
    cancelButton.id = 'cancelButton';
    
    const canvasDiv = document.createElement('div');
    canvasDiv.id = 'canvasDiv';
    
    stationInfo.appendChild(cancelButton);
    stationInfo.appendChild(canvasDiv);
    
    displayCanvas();
    
    cancelButton.addEventListener("click", function () {
        displayStationData(stations, stationNumber);
    })
}

const stationInfo = document.getElementById('infosStation');

fetch('https://cors-anywhere.herokuapp.com/https://api.jcdecaux.com/vls/v1/stations?contract=lyon&apiKey=699ee067b85c71a4f7ca9adfdcaaa5145b06a437')
    .then(response => response.json())
    .then(data => stationsTabBuilder(data))
    .then(data => initMap(data))
    .catch(error => console.log(error));