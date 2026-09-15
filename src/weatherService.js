import clearPath from "./assets/clearBG.jpg";
import cloudyPath from "./assets/cloudyBG.jpg";
import rainPath from "./assets/rainBG.jpg";
import snowPath from "./assets/snowBG.jpg";
import stormPath from "./assets/stormBG.jpg";
import {addDays} from 'date-fns';

export class weatherService {  
    #api;
    baseURL = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";
    
    constructor(apiKey){
        this.#api = apiKey;
    }

    // fetch raw weather object
    async fetchCurr(location) {
        const currURL = `${this.baseURL + location}?key=${this.#api}&include=current`;
        const response = await fetch(currURL);
        if (!response.ok) throw new Error(`API Request fails for fetching current: ${response.status}`);
        return response.json();
    }

    async fetch7days(location) {
        const start = (new Date()).getTime();
        const end = addDays(new Date(), 6).getTime();
        const currURL = `${this.baseURL + location}/${start}/${end}?key=${this.#api}&include=current,days&elements=datetime,temp,conditions,icon`;
        const response = await fetch(currURL);
        if (!response.ok) throw new Error(`API Request fails for fetching 7 days: ${response.status}`);
        return response.json();
    }

    async fetch15days(location) {
        const start = (new Date()).getTime();
        const end = addDays(new Date(), 14).getTime();
        const currURL = `${this.baseURL + location}/${start}/${end}?key=${this.#api}&include=current,days&elements=datetime,temp,conditions,icon`;
        const response = await fetch(currURL);
        if (!response.ok) throw new Error(`API Request fails for fetching 15 days: ${response.status}`);
        return response.json();
    }
    
    // extract essential weather info
    async filterWeather(objPromise) {
        let weatherObj;
        try {
            weatherObj = await objPromise;
        }
        catch (e) {
            alert(e.message);
            return;
        }
        const currCondition = weatherObj["currentConditions"];
        const daysArr = weatherObj?.days;
        const {resolvedAddress: addr} = weatherObj;
        const {datetime, temp, conditions, icon: stickerDes} = currCondition;

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

        return {addr, datetime, temp, stickerDes, BGImgPath, daysArr};
    }

}