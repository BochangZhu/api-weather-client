import clearPath from './assets/clearBG.jpg';
import cloudyPath from './assets/cloudyBG.jpg';
import rainPath from './assets/rainBG.jpg';
import snowPath from './assets/snowBG.jpg';
import stormPath from './assets/stormBG.png';
import fallbackIMGPath from './assets/sunnyIcon.svg';

import cloudyIcon from './assets/cloudyIcon.svg';
import rainyIcon from './assets/rainyIcon.svg';
import snowyIcon from './assets/snowyIcon.svg';
import stormyIcon from './assets/stormyIcon.svg';
import sunnyIcon from './assets/sunnyIcon.svg';
import { format, addDays } from 'date-fns';

import { fetchStickerUrl } from './stickerService.js';

async function formatLocation(resolvedAddress) {
    const coordRegex = /^-?\d+(\.\d+)?\s*,\s*-?\d+(\.\d+)?$/;
    if (coordRegex.test(resolvedAddress)) {
        const [lat, lon] = resolvedAddress.split(',');

        try {
            const response = await fetch(
                `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
            );
            const data = await response.json();
            return `${data.city || data.locality || 'Unknown'}, ${data.countryName}`;
        } catch (e) {
            alert(e.message);
            return resolvedAddress;
        }
    }

    return resolvedAddress;
}

function getIconPath(conditions) {
    if (/cloudy/i.test(conditions)) {
        return cloudyIcon;
    } else if (/thunder/i.test(conditions)) {
        return stormyIcon;
    } else if (/rain|shower/i.test(conditions)) {
        return rainyIcon;
    } else if (/snow/i.test(conditions)) {
        return snowyIcon;
    } else {
        return sunnyIcon;
    }
}
export class weatherService {
    #api;
    baseURL =
        'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/';

    constructor(apiKey = 'PE63KRSTDBLPMV646VDZTT76K') {
        this.#api = apiKey;
    }

    // fetch raw weather object
    async fetchCurr(location) {
        const currURL = `${this.baseURL + location}/today?key=${this.#api}&include=current`;
        const response = await fetch(currURL);
        if (!response.ok)
            throw new Error(
                `API Request fails for fetching current: ${response.status}`
            );
        return response.json();
    }

    async fetch7days(location) {
        const start = format(new Date(), 'yyyy-MM-dd');
        const end = format(addDays(new Date(), 6), 'yyyy-MM-dd');
        const currURL = `${this.baseURL + location}/${start}/${end}?key=${this.#api}&include=current,days&elements=datetime,temp,conditions,icon`;
        const response = await fetch(currURL);
        if (!response.ok)
            throw new Error(
                `API Request fails for fetching 7 days: ${response.status}`
            );
        return response.json();
    }

    async fetch15days(location) {
        const start = format(new Date(), 'yyyy-MM-dd');
        const end = format(addDays(new Date(), 14), 'yyyy-MM-dd');
        const currURL = `${this.baseURL + location}/${start}/${end}?key=${this.#api}&include=current,days&elements=datetime,temp,conditions,icon`;
        const response = await fetch(currURL);
        if (!response.ok)
            throw new Error(
                `API Request fails for fetching 15 days: ${response.status}`
            );
        return response.json();
    }

    // extract essential weather info
    async filterWeather(objPromise) {
        let weatherObj;
        try {
            weatherObj = await objPromise;
        } catch (e) {
            alert(e.message);
            throw e;
        }
        const currCondition = weatherObj['currentConditions'];
        let daysArr = weatherObj?.days;
        let { resolvedAddress: addr = 'N/A' } = weatherObj;
        const {
            datetime = '-- / --',
            temp = '--',
            conditions = 'N/A',
            icon: stickerDes = 'unknown',
        } = currCondition;

        // background img
        let BGImgPath;
        let conditionSimp;
        if (/cloudy/i.test(conditions)) {
            BGImgPath = cloudyPath;
            conditionSimp = 'cloudy';
        } else if (/thunder/i.test(conditions)) {
            BGImgPath = stormPath;
            conditionSimp = 'storm';
        } else if (/rain|shower/i.test(conditions)) {
            BGImgPath = rainPath;
            conditionSimp = 'rain';
        } else if (/snow/i.test(conditions)) {
            BGImgPath = snowPath;
            conditionSimp = 'snow';
        } else {
            BGImgPath = clearPath;
            conditionSimp = 'sunny';
        }

        // weatherImg
        let stickerPath;
        try {
            stickerPath = await fetchStickerUrl(stickerDes);
        } catch {
            stickerPath = fallbackIMGPath;
        }

        if (daysArr.length > 1) {
            daysArr.forEach(
                (day) => (day.iconPath = getIconPath(day?.conditions))
            );
        } else {
            daysArr = undefined;
        }

        addr = await formatLocation(addr);

        return {
            addr,
            datetime,
            temp,
            BGImgPath,
            stickerPath,
            conditions,
            conditionSimp,
            daysArr,
        };
    }
}
