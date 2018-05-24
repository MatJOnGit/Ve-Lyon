class Booking {
    constructor(stationID, stationName, bookingTime) {
        this.bookedStationID = stationID;
        this.bookingTime = bookingTime;
        this.bookedStationName = stationName;
    }
    
    displayBooking() {
        console.log('Un vélo a été réservé à la station ' + this.bookedStationName + ' à ' + this.bookingTime.getHours() + 'h' + this.bookingTime.getMinutes());
    }
}