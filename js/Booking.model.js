class Booking {
    constructor(name, bike_stands, available_bikes, booking_time) {
        this.station = name;
        this.bike_stands = bike_stands;
        this.available_bikes = available_bikes;
        this.booking_time = booking_time;
        this.booking_isActive = true;
    }
}