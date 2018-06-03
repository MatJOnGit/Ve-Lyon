class Timer {
    constructor() {
        this._duration = 1200000;
        this._remainingTime = this._duration;
        this._formatedRemainingTime = this.formatRemainingTime(this._remainingTime);
    }
    
    get remainingTime() {
        return this._remainingTime;
    }

    formatRemainingTime(countdown) {
        let minutes = Math.floor(countdown / 60000);
        let seconds = ((countdown % 60000) / 1000).toFixed(0);
        return minutes + ' : ' + (seconds < 10 ? '0' : '') + seconds;
    }

    decreaseRemainingTime() {
        this._remainingTime = this._remainingTime - 1000;
        this._formatedRemainingTime = this.formatRemainingTime(this._remainingTime);
    }
    
    displayCountdown(stations, stationNumber, NewBooking) {
        let ActiveBooking = NewBooking;
        // Add static elements in the footer
        const countdownIntro = document.createElement('span');
        const formatedCountdown = document.createElement('div');

        footer.style.display = 'flex';
        footer.innerHTML= '';

        countdownIntro.textContent = 'Temps restant sur votre réservation :';

        formatedCountdown.id = 'timer';
        formatedCountdown.textContent = this._formatedRemainingTime;

        // Store booking data into sessionStorage to be retrieved whenever it's necessary
        sessionStorage.setItem('bookingTime', new Date());
        sessionStorage.setItem('bookedStationName', stations[stationNumber].name);
        sessionStorage.setItem('bookedStationId', stationNumber); 
        sessionStorage.setItem('bookedStationLat', stations[stationNumber].latitude);
        sessionStorage.setItem('bookedStationLng', stations[stationNumber].longitude);
        sessionStorage.setItem('bookedStationBikes', stations[stationNumber].available_bikes);

        footer.appendChild(countdownIntro);
        footer.appendChild(formatedCountdown);
        
        ActiveBooking.displayBookingCancellation();

        // display the timer in the clock div and change its content and style every second
        let intervalId = setInterval(() => {
            if (ActiveBooking.remainingTime <= 0) {
                clearInterval(intervalId);
                document.getElementById('availableBikes').textContent = sessionStorage.getItem('bookedStationBikes');
                sessionStorage.clear();
                NewBooking.displayRebooking();
            } else if ((this.remainingTime <= this._duration / 2) && (this.remainingTime > this._duration / 4)) {
                formatedCountdown.style.backgroundColor = 'orange';
            } else if (this.remainingTime <= this._duration / 4) {
                formatedCountdown.style.backgroundColor = 'red';
            };

            formatedCountdown.textContent = this._formatedRemainingTime;
            this.decreaseRemainingTime();
        }, 1000);
    }
}