function displayCanvas(stations, stationNumber) {
    function resizeCanvas() {
        var ratio =  Math.max(window.devicePixelRatio || 1, 1);
        canvas.width = canvas.offsetWidth * ratio;
        canvas.height = canvas.offsetHeight * ratio;
        canvas.getContext("2d").scale(ratio, ratio);
    }
    
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
    
    wrapper.appendChild(canvas);
    
    window.onresize = resizeCanvas;
    resizeCanvas();
    
    var signaturePad = new SignaturePad(canvas, {
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
            displayCountdown(stations, stationNumber);
            displayStationData(stations, stationNumber);
        } else if (signaturePad.isEmpty) {
            return alert('Merci de bien vouloir signer votre réservation.');
        };
    });
}