class Booking {
    constructor(stationID, stationName, bookingTime) {
        this._bookedStationID = stationID;
        this._bookedStationName = stationName;
        this._bookingTime = bookingTime;
    }
    
    get bookingTime() {
        return this._bookingTime;
    }
    
    displayBooking() {
        console.log('Un vélo a été réservé à la station ' + this._bookedStationName + ' à ' + this._bookingTime.getHours() + 'h' + this._bookingTime.getMinutes());
    }
}