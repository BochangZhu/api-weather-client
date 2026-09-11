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
        const {datetime, temp, feelslike, conditions, icon: iconDes} = currCondition;
        return {addr, cost, datetime, temp, feelslike, conditions, iconDes};
    }

}