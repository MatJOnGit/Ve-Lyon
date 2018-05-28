function displayCountdown(stations, stationNumber) {
    function displayBookingCancellation() {
        const cancelBookingButton = document.createElement('button');
        cancelBookingButton.textContent = 'Annuler ma réservation';
        cancelBookingButton.classList.add('footerButton', 'footerCancelOption');
        
        cancelBookingButton.addEventListener('click', () => {
            document.getElementsByTagName("footer")[0].removeChild(cancelBookingButton);
            displayConfirmation();
        });
        
        footer.appendChild(cancelBookingButton);
    }
    
    function displayConfirmation() {
        const cancelAlert = document.createElement('span')
        cancelAlert.textContent = 'Êtes-vous sûr(e) de vouloir annuler votre réservation ?';
        cancelAlert.classList.add('footerCancelOption');

        const cancelBookingButtonContainer = document.createElement('div');
        cancelBookingButtonContainer.classList.add('footerCancelOption');

        const confirmBookingClearing = document.createElement('button');
        confirmBookingClearing.textContent = 'Oui';
        confirmBookingClearing.classList.add('footerButton');

        const cancelBookingClearing = document.createElement('button');
        cancelBookingClearing.textContent = 'Non';
        cancelBookingClearing.classList.add('footerButton');

        footer.appendChild(cancelAlert);
        footer.appendChild(cancelBookingButtonContainer);
        cancelBookingButtonContainer.appendChild(confirmBookingClearing);
        cancelBookingButtonContainer.appendChild(cancelBookingClearing);

        confirmBookingClearing.addEventListener('click', () => {
            localStorage.clear();
            window.location.reload();
        })

        cancelBookingClearing.addEventListener('click', () => {
            document.getElementsByTagName("footer")[0].removeChild(document.getElementsByClassName('footerCancelOption')[1]);
            document.getElementsByTagName("footer")[0].removeChild(document.getElementsByClassName('footerCancelOption')[0]);
            displayBookingCancellation();
        })
    }
    
    const bookingItem = new Booking (stationNumber, stations[stationNumber].name, new Date());
    bookingItem.displayBooking();
    
    const bookingTimer = new Timer(); // Create a Timer object when a booking has been signed
    
    // Add static elements in the footer

    const footer = document.getElementsByTagName('footer')[0];
    const countdownIntro = document.createElement('span');
    const formatedCountdown = document.createElement('div');
    
    footer.style.display = 'flex';
    footer.innerHTML= '';

    countdownIntro.textContent = 'Temps restant sur votre réservation :';

    formatedCountdown.id = 'timer';
    formatedCountdown.textContent = bookingTimer._formatedRemainingTime;
    
    // Store booking data into localStorage to be retrieved whenever it's necessary
    localStorage.setItem("bookingTime", new Date());
    localStorage.setItem("bookedStation", stations[stationNumber].name);
    
    footer.appendChild(countdownIntro);
    footer.appendChild(formatedCountdown);
    
    displayBookingCancellation();
    
    // display the timer in the clock div and change its content and style every second
    intervalId = setInterval(() => {
        if (bookingTimer.remainingTime <= 0) {
            clearInterval(intervalId);
        } else if (bookingTimer.remainingTime === bookingTimer._duration / 2) {
            formatedCountdown.style.backgroundColor = 'orange';
        } else if (bookingTimer.remainingTime === bookingTimer._duration / 4) {
            formatedCountdown.style.backgroundColor = 'red';
        };
        
        formatedCountdown.textContent = bookingTimer._formatedRemainingTime
        bookingTimer.decreaseRemainingTime()

    }, 1000);
    
    if (bookingTimer._remainingTime <= 0) {
        // clear the existing booking if the booking time is up
        localStorage.clear();
        // Display an alert to the user to inform the booking is now empty
        // Set the elements to their initial state
    }
}