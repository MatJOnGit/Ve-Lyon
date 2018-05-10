function displayCanvas() {
    
    function draw(e) {
        // stop the function if they are not mouse down
        if(!isDrawing) return;
        // listen for mouse move event
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
        [lastX, lastY] = [e.offsetX, e.offsetY];
    }
    
    const canvasDiv = document.getElementById('canvasDiv');
    
    const canvas = document.createElement('canvas');
    canvas.id = 'canvas';
    canvas.width = parent.innerWidth;
    canvas.height = parent.innerHeight;
    
    const canvasTest = document.createElement('canvas');
    canvasTest.id = 'blankCanvas';
    canvasTest.width = parent.innerWidth;
    canvasTest.height = parent.innerHeight;
    canvasTest.style.display = 'none';
    
    canvasDiv.appendChild(canvas);
    canvasDiv.appendChild(canvasTest);
    
    const ctx = canvas.getContext('2d');
    

    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#ac0000';

    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;
    let isSigned = false;



    canvas.addEventListener('mousedown', (e) => {
        isDrawing = true;
        [lastX, lastY] = [e.offsetX, e.offsetY];
    });

    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', () => isDrawing = false);
    canvas.addEventListener('mouseout', () => isDrawing = false);
}