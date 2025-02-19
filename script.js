const canvas = document.getElementById('meme-canvas');
const ctx = canvas.getContext('2d');
const topText = document.getElementById('top-text');
const bottomText = document.getElementById('bottom-text');
const imageUpload = document.getElementById('image-upload');

let image;

imageUpload.addEventListener('change', (event) => {
  const rander = new FileReader();
  rander.onload = (event) => {
    image = new Image();
    image.src = event.target.result;
    image.onload = () => {
      drawMeme();
    };
  };
  rander.readAsDataURL(event.target.files[0]);
});

topText.addEventListener('input', drawMeme);
bottomText.addEventListener('input', drawMeme);

function drawMeme() {
  console.log('draw');  
  if(!image) return;

//   resize canvas to image width
    const aspectRatio = image.width / image.height;
    canvas.width = 500;
    canvas.height = canvas.width;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

    ctx.font = `${canvas.height / 10}px Impact`;
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'black';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';

    //TOP-TEXT
    ctx.lineWidth = 3;
    ctx.strokeText(topText.value.toUpperCase(), canvas.width/2, 10);
    ctx.fillText(topText.value.toUpperCase(), canvas.width / 2, 10);

    //BOTTOM-TEXT
    ctx.lineWidth = 3;
    ctx.strokeText(bottomText.value.toUpperCase(), canvas.width/2, canvas.height - 60);
    ctx.fillText(bottomText.value.toUpperCase(), canvas.width / 2, canvas.height - 60);

};

function generateMeme() {
    console.log('generate');
    drawMeme();
};

function downloadMeme() {
    console.log('download');
    const dataURL = canvas.toDataURL('image/jpeg');
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'meme.jpg';
    link.click();

};