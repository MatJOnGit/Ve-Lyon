function displayCountdown(stations, stationNumber) {
    function decreaseCountdown() {
        countdown.textContent = Number(countdown.textContent) - 1000;
        formatedCountdown.textContent = formatRemainingTime(countdown.textContent);
        
        // Cancel the countdown if the timer has come to 0
        if (Number(countdown.textContent) <= 0) {
            clearInterval(intervalId);
        } else if ((Number(countdown.textContent) <= 600000) && (Number(countdown.textContent) > 300001)) {
            formatedCountdown.style.backgroundColor = 'orange';
        } else if (Number(countdown.textContent) <= 300000) {
            formatedCountdown.style.backgroundColor = 'red';
        };
    }
    
    function formatRemainingTime(countdown) {
        let minutes = Math.floor(countdown / 60000);
        let seconds = ((countdown % 60000) / 1000).toFixed(0);
        return minutes + ' : ' + (seconds < 10 ? '0' : '') + seconds;
    }
    
    localStorage.clear();
    
    localStorage.setItem("bookingTime", new Date());
    localStorage.setItem("bookedStation", stations[stationNumber].name);
    
    const bookingDate = new Date(localStorage.getItem("bookingTime"));
    
//    const dateTest1 = new Date('Thu May 10 2018 19:11:22 GMT+0200 (Paris, Madrid (heure d’été))');
//    const dateTest2 = new Date ('Thu May 10 2018 19:11:24 GMT+0200 (Paris, Madrid (heure d’été))')
//    console.log(dateTest2 - dateTest1); // return 2000 (différence de 2000 ms, soit 2s)
    
    const bookingHour = bookingDate.getHours();
    const bookingMinute = bookingDate.getMinutes();
    const bookingSecond = bookingDate.getSeconds();

    console.log("Un vélo a été réservé à la station " + localStorage.getItem("bookedStation") + " à " + bookingHour + "h" + bookingMinute);
    
    const footer = document.getElementsByTagName('footer')[0];
    footer.style.display = 'flex';
    footer.innerHTML= '';
    
    const countdownIntro = document.createElement('p');
    countdownIntro.textContent = 'Temps restant sur votre réservation :';
    
    const countdown = document.createElement('span');    
    // Fix the booking timer (in milliseconds)
    countdown.textContent = 1200000; // add a way to set countdown to "20 mins - (actual time - booking time)" if there's already a booked bike on this station
    countdown.style.display = 'none';
    
    const formatedCountdown = document.createElement('div');
    
    // Display a formated timer if there's remaining time on the booking    
    if (countdown.textContent >= 0) {
        formatedCountdown.textContent = formatRemainingTime(countdown.textContent);
    } else {
        // clear the existing booking
    }
        
    // Call decreaseCountdown every one second
    intervalId = setInterval(decreaseCountdown, 1000);
    
    footer.appendChild(countdownIntro);
    footer.appendChild(countdown);
    footer.appendChild(formatedCountdown);
}