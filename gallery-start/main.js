const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* Declaring the array of image filenames */
const imgList = ['pic1.jpg','pic2.jpg', 'pic3.jpg','pic4.jpg', 'pic5.jpg' ]
/* Declaring the alternative text for each image file */
const altList = {'pic1.jpg': 'Eye',
                 'pic2.jpg':'Stone',
                'pic3.jpg': 'Flower',
                'pic4.jpg': 'Wall Art',
                 'pic5.jpg': 'Butterfly' }
/* Looping through images */
for(const img of imgList){
    const thumbImage = document.createElement('img');
    thumbImage.setAttribute('src', `images/${img}`)
    thumbImage.setAttribute('alt', altList[img])
    thumbBar.appendChild(thumbImage)
    thumbImage.addEventListener('click', ()=>{
        displayedImage.setAttribute('src', `images/${img}`);
        displayedImage.setAttribute('alt', altList[img])
    } )
}
// const newImage = document.createElement('img');
// newImage.setAttribute('src', xxx);
// newImage.setAttribute('alt', xxx);
// thumbBar.appendChild(newImage);

/* Wiring up the Darken/Lighten button */
btn.addEventListener('click', (event)=>{

    if(event.target.textContent === 'Darken'){
        overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
        event.target.textContent =  'Lighten'
    }
    else {
        overlay.style.background = 'rgba(0,0,0,0)';
        event.target.textContent =  'Darken'
    }
})
