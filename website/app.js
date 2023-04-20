//making a function to get the current date
let d = new Date();
//saving the current date to a variable so we can print it on the page
let newDate = d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear();
//getting the personal apikey from openweathermap so we can use it to access the weather data
const apiKey = "63b3585b829013733f4dac7b2bb2133a";
//selecting the html button and saving it to a variable so we can use it to call the function
const generateButton = document.querySelector("#generate");
//adding an event Listener to the generateButton and adding an async function that will be activated when the button is pressed
generateButton.addEventListener("click", async () => {
  //adding a try and catch method in case something went wront
  try {
    //getting the zipcode from the input field
    const zipCode = document.querySelector("#zip").value;
    //getting the user's current feeling from the input field
    const content = document.querySelector("#feelings").value;
    //making an if statement in case the user didn't enter a zipcode and pressed the generateButton
    if (!zipCode) {
      //the alert that will be made to the user
      alert("you must enter a ZipCode");
      //exit the function if the user didn't enter a zipcode
      return;
    }
    //structuring the url to get the weather data from openweathermap
    const fullApi = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&appid=${apiKey}&units=metric`;
    //saving the reply from the openweathermap api to a variable
    const res = await fetch(fullApi);
    //jsonifying the reply from the openweathermap api
    const weatherData = await res.json();
    //saving the weather data to a variable
    const temp = weatherData.main.temp;

    //awating for the post request from app.js
    await fetch("/saveData", {
      //making the type as post so that the data will be sent to the server
      method: "POST",
      //making the data to be sent to the server
      headers: {
        //making the data to be sent to the server to be jsonified
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        //saving the newDate as date
        date: newDate,
        //saving the temp as temp
        temp,
        //saving the content as content
        content,
      }),
    });
    //saving the fetched data from the getData request as a varaiable
    const nodeRes = await fetch("/getData");
    //awaiting the data to be jsonified
    const finalData = await nodeRes.json();
    //testing the data
    console.log(finalData);
    //making a variable to hold the html element that will be used to display the date
    const dateDisplay = document.querySelector("#date");
    //making a variable to hold the html element that will be used to display the temprature
    const tempDisplay = document.querySelector("#temp");
    //making a variable to hold the html element that will be used to display the current feelings
    const contentDisplay = document.querySelector("#content");
    //changing the dateDisplay to the date that was saved in the database
    dateDisplay.innerHTML = `today date is ${finalData.date}`;
    //changing the tempDisplay to the temp that was saved in the database
    tempDisplay.innerHTML = `and the weather today is ${finalData.temp}`;
    //changing the contentDisplay to the content that was saved in the database
    contentDisplay.innerHTML = `and today you are ${finalData.content}`;
    //the error that will be displayed in case something went wrong
  } catch (err) {
    console.log("EROOOOORRR:", err);
  }
});
