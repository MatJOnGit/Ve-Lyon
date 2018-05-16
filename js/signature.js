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
    
    // create a button to come back to previous screen
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
    
    stationInfo.appendChild(cancelButton);
    stationInfo.appendChild(wrapper);
    stationInfo.appendChild(buttonsContainer);
    buttonsContainer.appendChild(resetButton);
    buttonsContainer.appendChild(confirmButton);
        
    const canvas = document.createElement('canvas');
    canvas.classList.add('signature-pad');
    canvas.id = 'signature-pad';
    
    const canvasTest = document.createElement('canvas');
    canvasTest.classList.add('signature-pad');
    canvasTest.id = 'blankCanvas';
    canvasTest.style.display = 'none';
    
    wrapper.appendChild(canvas);
    wrapper.appendChild(canvasTest);
    
    window.onresize = resizeCanvas;
    resizeCanvas();
    
    var signaturePad = new SignaturePad(canvas, {
        backgroundColor: 'rgb(255, 255, 255)' // necessary for saving image as JPEG; can be removed is only saving as PNG or SVG
    });
    
    cancelButton.addEventListener("click", function () {
        displayStationData(stations, stationNumber);
    })

    resetButton.addEventListener("click", function () {
        signaturePad.clear();
    })
    
    confirmButton.addEventListener("click", function () {
        if (!signaturePad.isEmpty()) {
            displayCountdown(stations, stationNumber);
            displayStationData(stations, stationNumber);
        } else if (signaturePad.isEmpty) {
            return alert('Merci de bien vouloir signer votre réservation.');
        }
    })
}