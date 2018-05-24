class Timer {
    constructor() {
        this._duration = 1200000;
        this._remainingTime = this._duration;
        this._formatedRemainingTime = this.formatRemainingTime(this._remainingTime);
    }
    
    get remainingTime() {
        return this._remainingTime;
    }
        
    set remainingTime(remainingTimeValue) {
//        this._remainingTime = remainingTimeValue - 1000;
        this._remainingTime = 3;
    }

    formatRemainingTime(countdown) {
        let minutes = Math.floor(countdown / 60000);
        let seconds = ((countdown % 60000) / 1000).toFixed(0);
        return minutes + ' : ' + (seconds < 10 ? '0' : '') + seconds;
    }

    bookingAlert() {
        console.log("Un vélo a été réservé à la station " + localStorage.getItem("bookedStation") + " à " + this.realTime.getHours() + "h" + this.realTime.getMinutes());
    } 
        
//        countdown.textContent = Number(countdown.textContent) - 1000;
//        formatedCountdown.textContent = formatRemainingTime(countdown.textContent);
//        
//        // Cancel the countdown if the timer has come to 0
//        if (Number(countdown.textContent) <= 0) {
//            clearInterval(intervalId);
//        } else if ((Number(countdown.textContent) <= 600000) && (Number(countdown.textContent) > 300001)) {
//            formatedCountdown.style.backgroundColor = 'orange';
//        } else if (Number(countdown.textContent) <= 300000) {
//            formatedCountdown.style.backgroundColor = 'red';
//        };
        
        // Cancel the countdown if the timer has come to 0
//        if (Number(countdownElt.textContent) <= 0) {
//            clearInterval(intervalId);
//        } else if ((Number(countdownElt.textContent) <= 600000) && (Number(countdownElt.textContent) > 300001)) {
//            formatedCountdownElt.style.backgroundColor = 'orange';
//        } else if (Number(countdownElt.textContent) <= 300000) {
//            formatedCountdownElt.style.backgroundColor = 'red';
//        };
    
    
    
}