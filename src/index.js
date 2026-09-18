import {
    boardInit,
    boardInfoUpdate,
    UILoad,
    unitToggle,
    boardInfoReplace,
} from './interfaceModule.js';
import { weatherService } from './weatherService.js';
import './style.css';
import loadingPath from './assets/loading.gif';

// board init along with loading component
const loading = document.createElement('img');
loading.src = loadingPath;
loading.className = 'loading hidden';
document.body.append(loading);

boardInit();

// init weatherService Obj
const weatherServiceObj = new weatherService();

// get form node
const form = document.querySelector('form.form');
// update handler
form.addEventListener('submit', async (e) => {
    loading.classList.remove('hidden');
    form.querySelector('button').textContent = 'loading';
    e.preventDefault();
    const formData = new FormData(form);
    const locStr = formData.get('location');
    const modeNum = +formData.get('mode');

    let weatherPromise;
    switch (modeNum) {
        case 0:
            weatherPromise = weatherServiceObj.filterWeather(
                weatherServiceObj.fetchCurr(locStr)
            );
            break;
        case 1:
            weatherPromise = weatherServiceObj.filterWeather(
                weatherServiceObj.fetch7days(locStr)
            );
            break;
        case 2:
            weatherPromise = weatherServiceObj.filterWeather(
                weatherServiceObj.fetch15days(locStr)
            );
            break;
    }
    let weatherDetail;
    try {
        weatherDetail = await weatherPromise;
        weatherDetail.mode = modeNum;
        boardInfoUpdate(weatherDetail);
        UILoad();
    } catch (e) {
        console.error(e.message);
    } finally {
        loading.classList.add('hidden');
        form.querySelector('button').textContent = 'update';
    }
});

// unit toggle
const unitInput = document.querySelector('.unitInput');
unitInput.addEventListener('change', () =>
    unitToggle(unitInput.checked ? 1 : 0)
);

// load prev data
const prevData = localStorage.getItem('prevData');
const prevUnit = localStorage.getItem('prevUnit');

if (prevUnit == 1) {
    unitInput.checked = true;
}

if (prevData) {
    boardInfoReplace(JSON.parse(prevData));
    UILoad();
}
