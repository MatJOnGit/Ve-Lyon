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
}