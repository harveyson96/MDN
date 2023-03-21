const myHeading = document.querySelector("h1");
myHeading.textContent = "Hello World!";
//eventlistener with anonymous function
// document.querySelector("html").addEventListener("click", ()=>{
//         alert("Click detected");
//     });

//change image by click
const myImage = document.querySelector("img");

myImage.onclick= () => {
    const mySrc = myImage.getAttribute("src")
    if (mySrc === "image/FreeShipping_M.png"){
        myImage.setAttribute("src", "image/Gluck_J1.png")
    } else{
        myImage.setAttribute("src", "image/FreeShipping_M.png")
    }
}