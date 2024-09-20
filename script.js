let img = new Image();
let frame = new Image();
let imgX = 0, imgY = 0, isDragging = false;
let imgAngle = 0;
let offsetX, offsetY;
let canvas = document.getElementById('photoCanvas');
let ctx = canvas.getContext('2d');


document.getElementById('imageUpload').addEventListener('change', handleImageUpload);
document.getElementById('rotateLeftBtn').addEventListener('click', () => rotateImage(-10));
document.getElementById('rotateRightBtn').addEventListener('click', () => rotateImage(10));
document.getElementById('downloadBtn').addEventListener('click', downloadImage);


canvas.addEventListener('mousedown', startDragging);
canvas.addEventListener('mousemove', dragImage);
canvas.addEventListener('mouseup', stopDragging);
canvas.addEventListener('mouseout', stopDragging);

function handleImageUpload(event) {
    img.src = URL.createObjectURL(event.target.files[0]);
    img.onload = function () {
        canvas.width = 1080;
        canvas.height = 1080;
        imgX = canvas.width / 2;
        imgY = canvas.height / 2;
        drawImage();
    };
}

frame.src = '/frame.png';
frame.onload = drawImage;

function drawImage() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    
    ctx.save();
    ctx.translate(imgX, imgY);
    ctx.rotate(imgAngle * Math.PI / 180);
    ctx.drawImage(img, -img.width / 2, -img.height / 2, img.width, img.height);
    ctx.restore();

    
    ctx.drawImage(frame, 0, 0, canvas.width, canvas.height);
}

function rotateImage(angle) {
    imgAngle += angle;
    drawImage();
}

function startDragging(e) {
    isDragging = true;
   
    offsetX = e.offsetX - imgX;
    offsetY = e.offsetY - imgY;
}

function dragImage(e) {
    if (isDragging) {
        
        imgX = e.offsetX - offsetX;
        imgY = e.offsetY - offsetY;
        drawImage();
    }
}

function stopDragging() {
    isDragging = false;
}

function downloadImage() {
    let downloadLink = document.createElement('a');
    downloadLink.download = 'imagem_com_moldura.png';
    downloadLink.href = canvas.toDataURL('image/png');
    downloadLink.click();
}
