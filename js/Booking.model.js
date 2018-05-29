class Booking {
    constructor(stations, stationID, stationName, bookingTime) {
        this._bookedStationName = stationName;
    }
    
    get bookedStationName() {
        return this._bookedStationName;
    }
}