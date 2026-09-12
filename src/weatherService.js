import clearPath from "./assets/clearBG.jpg";
import cloudyPath from "./assets/cloudyBG.jpg";
import rainPath from "./assets/rainBG.jpg";
import snowPath from "./assets/snowBG.jpg";
import stormPath from "./assets/stormBG.jpg";

export class weatherService {  
    #api;
    baseURL = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";
    
    constructor(apiKey){
        this.#api = apiKey;
    }

    // fetch raw weather object
    async fetchWeather(location) {
        const currURL = `${this.baseURL + location}?key=${this.#api}&include=current`;
        const response = await fetch(currURL);
        if (!response.ok) throw new Error(`API Request fails with status: ${response.status}`);
        return response.json();
    }

    // extract essential weather info
    async filterWeather(objPromise) {
        const weatherObj = await objPromise;
        const currCondition = weatherObj["currentConditions"];
        const {resolvedAddress: addr, queryCost: cost} = weatherObj;
        const {datetime, temp, feelslike, conditions, icon: stickerDes} = currCondition;

        let BGImgPath;
        if (/cloudy/i.test(conditions)) {
            BGImgPath = cloudyPath;
        }
        else if (/thunder/i.test(conditions)) {
            BGImgPath = stormPath;
        }
        else if (/rain|shower/i.test(conditions)) {
            BGImgPath = rainPath;
        }
        else if (/snow/i.test(conditions)) {
            BGImgPath = snowPath;
        }
        else{ 
            BGImgPath = clearPath;
        }

        return {addr, cost, datetime, temp, feelslike, stickerDes, BGImgPath};
    }

}