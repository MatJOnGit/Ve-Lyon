class Booking {
    constructor(stationName) {
        this._bookedStationName = stationName;
    }
    
    get bookedStationName() {
        return this._bookedStationName;
    }
    
    displayBookingCancellation() {
        const cancelBookingButton = document.createElement('button');
        cancelBookingButton.textContent = 'Annuler ma réservation';
        cancelBookingButton.classList.add('footerButton', 'footerAlerts');
        
        cancelBookingButton.addEventListener('click', () => {
            footer.removeChild(cancelBookingButton);
            this.displayConfirmation();
        });
        
        footer.appendChild(cancelBookingButton);
    }

    displayConfirmation() {
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
            footer.removeChild(document.getElementsByClassName('footerAlerts')[1]);
            footer.removeChild(document.getElementsByClassName('footerAlerts')[0]);
            this.displayBookingCancellation();
        })
    }
    
    displayRebooking() {
        footer.innerHTML = '';
        
        const rebookingAlert = document.createElement('span')
        rebookingAlert.textContent = 'Votre réservation a expiré. Souhaitez-vous en faire une nouvelle ? (Cliquer sur "Oui" relancera la page)';
        rebookingAlert.style.width = '60%';
        
        const rebookingButton = document.createElement('button');
        rebookingButton.textContent = 'Oui';
        rebookingButton.classList.add('footerButton');
        
        rebookingButton.addEventListener('click', () => {
            window.location.reload();
        })
        
        footer.appendChild(rebookingAlert);
        footer.appendChild(rebookingButton);
    }
    
    resizeCanvas(canvas) {
        const ratio =  Math.max(window.devicePixelRatio || 1, 1);
        canvas.width = canvas.offsetWidth * ratio;
        canvas.height = canvas.offsetHeight * ratio;
        canvas.getContext("2d").scale(ratio, ratio);
    }
    
    displayCanvas(stations, stationNumber) {    
        stationInfo.innerHTML = '';

        const wrapper = document.createElement('div');
        wrapper.id = 'canvasWrapper';

        const introElt = document.createElement('p');
        introElt.textContent = 'Merci de bien vouloir signer dans le cadre ci-dessous';

        const cancelButton = document.createElement('div');
        cancelButton.id = 'cancelButton';

        const resetButton = document.createElement('div');
        resetButton.textContent = 'Réinitialiser';
        resetButton.classList.add('bookingButton', 'reset');

        const confirmButton = document.createElement('div');
        confirmButton.textContent = 'Valider';
        confirmButton.classList.add('bookingButton', 'confirm');
        confirmButton.id = 'confirmButton';

        const buttonsContainer = document.createElement('div');
        buttonsContainer.id = 'canvasButtonsDiv';

        stationInfo.appendChild(introElt);
        stationInfo.appendChild(cancelButton);
        stationInfo.appendChild(wrapper);
        stationInfo.appendChild(buttonsContainer);
        buttonsContainer.appendChild(resetButton);
        buttonsContainer.appendChild(confirmButton);

        const canvas = document.createElement('canvas');
        canvas.classList.add('signature-pad');
        canvas.id = 'signature-pad';

        wrapper.appendChild(canvas);

        window.onresize = this.resizeCanvas;
        this.resizeCanvas(canvas);

        const signaturePad = new SignaturePad(canvas, {
            backgroundColor: 'rgb(255, 255, 255)' // necessary for saving image as JPEG; can be removed is only saving as PNG or SVG
        });

        cancelButton.addEventListener("click", () => {
            displayStationData(stations, stationNumber);
        });

        resetButton.addEventListener("click", () => {
            signaturePad.clear();
        });

        confirmButton.addEventListener("click", () => {
            if (!signaturePad.isEmpty()) {
                sessionStorage.clear();
                // Store booking data into sessionStorage to be retrieved whenever it's necessary
                sessionStorage.setItem('bookingTime', new Date());
                sessionStorage.setItem('bookedStationName', stations[stationNumber].name);
                sessionStorage.setItem('bookedStationId', stationNumber); 
                sessionStorage.setItem('bookedStationLat', stations[stationNumber].latitude);
                sessionStorage.setItem('bookedStationLng', stations[stationNumber].longitude);
                sessionStorage.setItem('bookedStationBikes', stations[stationNumber].available_bikes);
                // Display a timer and elements to make another booking if necessary
                const TimerItem = new Timer(new Date());
                TimerItem.displayCountdown(stations, stationNumber, this);
                displayStationData(stations, stationNumber);
                return TimerItem;
            } else if (signaturePad.isEmpty) {
                return alert('Merci de bien vouloir signer votre réservation.');
            };
        });
    }
}