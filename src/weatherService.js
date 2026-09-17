import clearPath from "./assets/clearBG.jpg";
import cloudyPath from "./assets/cloudyBG.jpg";
import rainPath from "./assets/rainBG.jpg";
import snowPath from "./assets/snowBG.jpg";
import stormPath from "./assets/stormBG.png";
import fallbackIMGPath from "./assets/sunnyIcon.svg";

import cloudyIcon from "./assets/cloudyIcon.svg";
import rainyIcon from "./assets/rainyIcon.svg";
import snowyIcon from "./assets/snowyIcon.svg";
import stormyIcon from "./assets/stormyIcon.svg";
import sunnyIcon from "./assets/sunnyIcon.svg";
import {addDays} from 'date-fns';

import { fetchStickerUrl } from "./stickerService.js";

function getIconPath(conditions) {
    if (/cloudy/i.test(conditions)) {
        return cloudyIcon;
    }
    else if (/thunder/i.test(conditions)) {
        return stormyIcon;
    }
    else if (/rain|shower/i.test(conditions)) {
        return rainyIcon;
    }
    else if (/snow/i.test(conditions)) {
        return snowyIcon;
    }
    else{ 
        return fallbackIMGPath;
    }
}
export class weatherService {  
    #api;
    baseURL = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";
    
    constructor(apiKey = ''){
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
            throw e;
        }
        const currCondition = weatherObj["currentConditions"];
        const daysArr = weatherObj?.days;
        const {resolvedAddress: addr = 'unknown'} = weatherObj;
        const {datetime = 'unknown', temp = 'unknown', conditions = 'unknown', icon: stickerDes = 'unknown'} = currCondition;

        // background img
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

        // weatherImg
        let stickerPath;
        try {
            stickerPath = await fetchStickerUrl(stickerDes);
        }
        catch {
            stickerPath = fallbackIMGPath;
        }

        if (daysArr) {
            daysArr.forEach(day => day.iconPath = getIconPath(day?.conditions));
        }

        return {addr, datetime, temp, BGImgPath, stickerPath, conditions, daysArr};
    }

}