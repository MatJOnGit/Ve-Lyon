class Timer {
    constructor(duration, remainingTime, formatedRemainingTime) {
        this._duration = duration;
        this._remainingTime = remainingTime;
        this._formatedRemainingTime = formatedRemainingTime;
    }

    get remainingTime() {
        return this._remainingTime;
    }
    
    get formatedRemainingTime() {
        return this._formatedRemainingTime;
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
        // Add static elements in the footer
        const countdownIntro = document.createElement('span');
        const formatedCountdown = document.createElement('div');

        footer.style.display = 'flex';
        footer.innerHTML= '';

        countdownIntro.textContent = 'Temps restant sur votre réservation :';

        formatedCountdown.id = 'timer';
        formatedCountdown.textContent = this.formatedRemainingTime;

        footer.appendChild(countdownIntro);
        footer.appendChild(formatedCountdown);
        
        NewBooking.displayBookingCancellation();

        // display the timer in the clock div and change its content and style every second
        let intervalId = setInterval(() => {
            if (this.remainingTime <= 0) {
                clearInterval(intervalId);
                document.getElementById('availableBikes').textContent++;
                sessionStorage.clear();
                NewBooking.displayRebooking();
            } else if ((this.remainingTime <= 600000) && (this.remainingTime > 300000)) {
                formatedCountdown.style.backgroundColor = 'orange';
            } else if (this.remainingTime <= 300000) {
                formatedCountdown.style.backgroundColor = 'red';
            };

            formatedCountdown.textContent = this._formatedRemainingTime;
            this.decreaseRemainingTime();
        }, 1000);
    }
}