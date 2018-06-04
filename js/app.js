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
    if (sessionStorage.getItem('bookedStationName') === null) {
        const map = new google.maps.Map(document.getElementById('map'), {
            zoom: 11.55,
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
            });

            markers.push(marker);
        });

        // Add a cluster container all markers previously created
        var markerCluster = new MarkerClusterer(map, markers, {
            imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
        });
        
    } else {
        // display a map zoomed in the booked station in sessionStorage if there is any
        const map = new google.maps.Map(document.getElementById('map'), {
            zoom: 18,
            center: {
                lat: Number(sessionStorage.getItem('bookedStationLat')),
                lng: Number(sessionStorage.getItem('bookedStationLng'))
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
            });

            markers.push(marker);
        });

        // Add a cluster container all markers previously created
        var markerCluster = new MarkerClusterer(map, markers, {
            imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
        });
        displayStationData(stations, sessionStorage.getItem('bookedStationId'));
    }
}

// Display station data into "infosStation" div
function displayStationData(stations, stationNumber) {
    stationInfo.innerHTML = '';
    stationInfo.style.display = "flex";
    
    const stationName = document.createElement('p');
    stationName.textContent = 'La station "' + stations[stationNumber].name.toLowerCase() + '" est actuellement';

    const stationStatus = document.createElement('span');
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
    availableBikesContent.id = 'availableBikes';
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
    
    const NewBooking = new Booking(stations, stationNumber, stations[stationNumber].name, new Date());
    
    
    // Display a button to create a new booking if there is no booking on the displayed station (if a booking is possible)
    if ((stations[stationNumber].flag_color === 'blue') && (sessionStorage.getItem('bookedStationName') != stations[stationNumber].name)) {
        const bookingButton = document.createElement('button');
        bookingButton.textContent = "Je réserve mon vélo'v";
        bookingButton.classList.add('bookingButton', 'booking');

        bookingButton.addEventListener("click", () => {
            NewBooking.displayCanvas(stations, stationNumber);
        });

        stationInfo.appendChild(bookingButton);
    }
    
    // Display the appropriate elements if there's already an active booking
    if (sessionStorage.getItem('bookedStationName') === stations[stationNumber].name) {
        const timerDuration = 1200000 - (new Date() - new Date(sessionStorage.getItem('bookingTime')));
        const TimerItem = new Timer(timerDuration, timerDuration, '20 : 00');
        TimerItem.displayCountdown(stations, stationNumber, NewBooking);
        availableBikesContent.textContent = stations[stationNumber].available_bikes - 1;
    }
}

const stationInfo = document.getElementById('infosStation');
const footer = document.getElementsByTagName('footer')[0];

window.addEventListener('load', () => {
    const ManualItem = new Manual();
    ManualItem.displaySlide(1);
    fetch('https://cors-anywhere.herokuapp.com/https://api.jcdecaux.com/vls/v1/stations?contract=lyon&apiKey=699ee067b85c71a4f7ca9adfdcaaa5145b06a437')
        .then(response => response.json())
        .then(data => stationsTabBuilder(data))
        .then(data => initMap(data))
        .catch(error => console.log(error));
})