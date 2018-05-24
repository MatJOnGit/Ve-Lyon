function displayCountdown(stations, stationNumber) {
    const bookingItem = new Booking (stationNumber, stations[stationNumber].name, new Date());
    bookingItem.displayBooking();
    
    const bookingTimer = new Timer(); // Create a Timer object when a booking has been signed
    
    // Store booking data into localStorage to be retrieved whenever it's necessary
    localStorage.setItem("bookingTime", new Date());
    localStorage.setItem("bookedStation", stations[stationNumber].name);
    
//    const bookingDate = new Date(localStorage.getItem("bookingTime"));
    
//    const dateTest1 = new Date('Thu May 10 2018 19:11:22 GMT+0200 (Paris, Madrid (heure d’été))');
//    const dateTest2 = new Date ('Thu May 10 2018 19:11:24 GMT+0200 (Paris, Madrid (heure d’été))')
//    console.log(dateTest2 - dateTest1); // return 2000 (différence de 2000 ms, soit 2s)
    
//    const bookingHour = bookingDate.getHours();
//    const bookingMinute = bookingDate.getMinutes();
//    const bookingSecond = bookingDate.getSeconds();

//    bookingTimer.bookingAlert();
    
    const footer = document.getElementsByTagName('footer')[0];
    footer.style.display = 'flex';
    footer.innerHTML= '';
    
    const countdownIntro = document.createElement('span');
    countdownIntro.textContent = 'Temps restant sur votre réservation :';
    
    const countdown = document.createElement('span');    
    countdown.id = 'timer1';
    // Set the booking timer (in milliseconds)
//    countdown.textContent = 1200000; // add a way to set countdown to "20 mins - (actual time - booking time)" if there's already a booked bike on this station
//    countdown.style.display = 'none';
    
    const formatedCountdown = document.createElement('div');
    formatedCountdown.id = 'timer2';
    
    const cancelBookingButton = document.createElement('button');
    cancelBookingButton.textContent = 'Annuler ma réservation';
    cancelBookingButton.classList.add('footerButton');
    
    cancelBookingButton.addEventListener('click', () => {
        const cancelAlert = document.createElement('span')
        cancelAlert.textContent = 'Êtes-vous sûr(e) de vouloir annuler votre réservation ?';
        
        const cancelBookingButtonContainer = document.createElement('div');
        
        const confirmBookingClearing = document.createElement('button');
        confirmBookingClearing.textContent = 'Oui';
        confirmBookingClearing.classList.add('footerButton');
        
        const cancelBookingClearing = document.createElement('button');
        cancelBookingClearing.textContent = 'Non';
        cancelBookingClearing.classList.add('footerButton');
        
        footer.removeChild(cancelBookingButton);
        
        footer.appendChild(cancelAlert);
        footer.appendChild(cancelBookingButtonContainer);
        cancelBookingButtonContainer.appendChild(confirmBookingClearing);
        cancelBookingButtonContainer.appendChild(cancelBookingClearing);
        
        confirmBookingClearing.addEventListener('click', () => {
            console.log('Reinit de la page');
        })
        cancelBookingClearing.addEventListener('click', () => {
            console.log('Réaffichage du bouton cancel');
        })
    });
    
    footer.appendChild(countdownIntro);
    footer.appendChild(countdown);
    footer.appendChild(formatedCountdown);
    footer.appendChild(cancelBookingButton);
    
    // Call decreaseCountdown every second
    intervalId = setInterval( () => {
        bookingTimer.remainingTime(bookingTimer.remainingTime());
    }, 1000);
    
//    if (countdown.textContent >= 0) {
//        // Display a formated timer if there's remaining time on the booking 
//        formatedCountdown.textContent = formatRemainingTime(countdown.textContent);
//    } else {
//        // clear the existing booking if the booking time is up
//        localStorage.clear();
//        // Display an alert to the user to inform the booking is now empty
//        // Set the elements to their initial state
//    }
}