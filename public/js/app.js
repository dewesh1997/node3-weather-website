//const { response } = require("reponse");
// const request = require("request");


// fetch("http://puzzle.mead.io/puzzle").then((response) =>{
//     response.json().then((data)=>{
//         console.log(data);
//     });

// });




const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");


messageOne.textContent="";
messageTwo.textContent="";

weatherForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    console.log("testing");
    console.log(search);
    console.log(search.value);
    messageOne.textContent="Loading";
    messageTwo.textContent = "";
    
    fetch("/weather?address="+encodeURIComponent(search.value)).then((response) =>{
        response.json().then((data)=>{
            console.log(data);
            if(data.error){
                console.log(data.error);
                messageOne.textContent=data.error;
                messageTwo.textContent="";
            } else {
                console.log(data);
                messageOne.textContent="";
                messageTwo.textContent = data.temprature + " " + data.rain + " " + data.location;
            }
        });

    });



});