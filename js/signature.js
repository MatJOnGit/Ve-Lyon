function displayCanvas(stations, stationNumber) {
    function resizeCanvas() {
        var ratio =  Math.max(window.devicePixelRatio || 1, 1);
        canvas.width = canvas.offsetWidth * ratio;
        canvas.height = canvas.offsetHeight * ratio;
        canvas.getContext("2d").scale(ratio, ratio);
    }
    
    const wrapper = document.getElementById('canvasWrapper');
    
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
    
    const confirmButton = document.getElementById('confirmButton');
    
    confirmButton.addEventListener("click", function () {
        if (!signaturePad.isEmpty()) {
            initCountdown(stations, stationNumber);
            displayStationData(stations, stationNumber);
        } else if (signaturePad.isEmpty) {
            return alert('Merci de bien vouloir signer votre réservation.');
        }
    })
}