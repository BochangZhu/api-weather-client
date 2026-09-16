import { boardInit, boardUpdate, unitToggle, bgIMGReplace } from "./interfaceModule.js";
import { weatherService } from "./weatherService.js";
import './style.css';

// board init along with form
boardInit();

// init weatherService Obj
const weatherServiceObj = new weatherService();

// get form node
const form = document.querySelector('form.form');
// update handler 
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const locStr = formData.get('location');
    const modeNum = +(formData.get('mode'));

    let weatherPromise;
    switch(modeNum) {
        case 0:
            weatherPromise = weatherServiceObj.filterWeather(weatherServiceObj.fetchCurr(locStr));
            break;
        case 1:
            weatherPromise = weatherServiceObj.filterWeather(weatherServiceObj.fetch7days(locStr));
            break;
        case 2:
            weatherPromise = weatherServiceObj.filterWeather(weatherServiceObj.fetch15days(locStr));
            break;
    }

    weatherPromise.then().catch()
});

// unit toggle