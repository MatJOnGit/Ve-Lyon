function displayCountdown(stations, stationNumber) {
    function displayBookingCancellation() {
        const cancelBookingButton = document.createElement('button');
        cancelBookingButton.textContent = 'Annuler ma réservation';
        cancelBookingButton.classList.add('footerButton', 'footerAlerts');
        
        cancelBookingButton.addEventListener('click', () => {
            document.getElementsByTagName("footer")[0].removeChild(cancelBookingButton);
            displayConfirmation();
        });
        
        footer.appendChild(cancelBookingButton);
    }
    
    function displayConfirmation() {
        const cancelAlert = document.createElement('span')
        cancelAlert.textContent = 'Êtes-vous sûr(e) de vouloir annuler votre réservation ?';
        cancelAlert.classList.add('footerAlerts');

        const cancelBookingButtonContainer = document.createElement('div');
        cancelBookingButtonContainer.classList.add('footerAlerts');

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
            sessionStorage.clear();
            window.location.reload();
        })

        cancelBookingClearing.addEventListener('click', () => {
            document.getElementsByTagName("footer")[0].removeChild(document.getElementsByClassName('footerAlerts')[1]);
            document.getElementsByTagName("footer")[0].removeChild(document.getElementsByClassName('footerAlerts')[0]);
            displayBookingCancellation();
        })
    }
    
    function displayRebooking() {
        footer.innerHTML = '';
        
        const rebookingAlert = document.createElement('span')
        rebookingAlert.textContent = 'Votre réservation a expiré. Souhaitez-vous en faire une nouvelle ? (Cliquer sur "Oui" relancera la page)';
        rebookingAlert.style.width = '80%';
        
        const rebookingButton = document.createElement('button');
        rebookingButton.textContent = 'Oui';
        rebookingButton.classList.add('footerButton');
        
        rebookingButton.addEventListener('click', () => {
            window.location.reload();
        })
        
        footer.appendChild(rebookingAlert);
        footer.appendChild(rebookingButton);
    }
    
    const bookingItem = new Booking (stations, stationNumber, stations[stationNumber].name, new Date());
    
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
    
    // Store booking data into sessionStorage to be retrieved whenever it's necessary
    sessionStorage.setItem('bookingTime', new Date());
    sessionStorage.setItem('bookedStationName', stations[stationNumber].name);
    sessionStorage.setItem('bookedStationId', stationNumber); 
    sessionStorage.setItem('bookedStationLat', stations[stationNumber].latitude);
    sessionStorage.setItem('bookedStationLng', stations[stationNumber].longitude);
    sessionStorage.setItem('bookedStationBikes', stations[stationNumber].available_bikes);
    
    footer.appendChild(countdownIntro);
    footer.appendChild(formatedCountdown);
    
    displayBookingCancellation();
    
    // display the timer in the clock div and change its content and style every second
    intervalId = setInterval(() => {
        if (bookingTimer.remainingTime <= 0) {
            clearInterval(intervalId);
            document.getElementById('availableBikes').textContent = sessionStorage.getItem('bookedStationBikes');
            sessionStorage.clear();
            displayRebooking();
        } else if ((bookingTimer.remainingTime <= bookingTimer._duration / 2) && (bookingTimer.remainingTime > bookingTimer._duration / 4)) {
            formatedCountdown.style.backgroundColor = 'orange';
        } else if (bookingTimer.remainingTime <= bookingTimer._duration / 4) {
            formatedCountdown.style.backgroundColor = 'red';
        };
        
        formatedCountdown.textContent = bookingTimer._formatedRemainingTime;
        bookingTimer.decreaseRemainingTime();
    }, 1000);
}