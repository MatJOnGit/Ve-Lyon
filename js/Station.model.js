class Station {
    constructor(name, address, latitude, longitude, status, bike_stands, available_bikes) {
        this.name = name;
        this.address = address;
        this.latitude = latitude;
        this.longitude = longitude;
        this.status = status;
        this.bike_stands = bike_stands;
        this.available_bikes = available_bikes;
        this.flag_color = status === 'CLOSED' ? 'red' : available_bikes > 0 ? 'blue' : 'yellow';
    }
    
    displayFlagURL() {
        return 'images/markers/' + this.flag_color + '_flag.png';
    }
}