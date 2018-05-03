class Booking {
    //constructor(name, address, latitude, longitude, status, bike_stands, available_bikes) {
    constructor(name, bike_stands, available_bikes) {
        this.station = name;
        this.bike_stands = bike_stands;
        this.available_bikes = available_bikes;
    }
}