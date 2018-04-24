class Station {
    constructor(number, name, address, latitude, longitude, status, bike_stands, available_bikes) {
        this.number = number;
        this.name = name;
        this.address = address;
        this.position = "{lat: " + latitude + ", lng: " + longitude + "}";
        this.status = status;
        this.bike_stands = bike_stands;
        this.available_bikes = available_bikes;
    }
    
    get position() {
        return this.position;
    }
    
//    get name() {
//        return this.name
//    }
//    
//    get address() {
//        return this.address
//    }
    
    displayStationInfo() {
        return '${this.name} et ${this.address}'
    }
}