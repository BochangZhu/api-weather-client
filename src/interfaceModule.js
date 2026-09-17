import { initForm } from "./formInit.js";
import cloudyIcon from "./assets/cloudyIcon.svg";
import rainyIcon from "./assets/rainyIcon.svg";
import snowyIcon from "./assets/snowyIcon.svg";
import stormyIcon from "./assets/stormyIcon.svg";
import sunnyIcon from "./assets/sunnyIcon.svg";

function previewInit() {
    const tempCont = document.createElement('div');
    tempCont.className = 'preview';
    const date = document.createElement('div');
    date.className = 'date';
    date.textContent = "-- / --";
    const previewIcon = document.createElement('img');
    previewIcon.className = 'previewIcon';
    previewIcon.src = sunnyIcon;
    const previewTemp = document.createElement('div');
    const value = document.createElement('div');
    value.className = 'tempValue';
    value.textContent = '--';
    const unit = document.createElement('div');
    unit.className = 'unit';
    unit.textContent = ' °';
    previewTemp.append(value, unit);

    tempCont.append(date, previewIcon, previewTemp);
    return tempCont;
}

export function boardInit() {
    const mainCont = document.createElement('div');
    mainCont.className = 'mainCont';

    const form = initForm();

    const submain = document.createElement('div');
    submain.className = "submain";
    const location = document.createElement('div');
    location.className = 'location';
    location.textContent = 'Test Location';    
    const conditions = document.createElement('p');
    conditions.className = 'conditions';
    conditions.textContent = 'Unknown Condition';
    const temperatureCont = document.createElement('div');
    temperatureCont.className = 'tempCont';
    const temperature = document.createElement('div');
    temperature.className = "tempValue";
    temperature.textContent = '--';
    const unit = document.createElement('span');
    unit.className = "unit";
    unit.textContent = '°';
    temperatureCont.append(temperature, unit);
    const dateTime = document.createElement('div');
    dateTime.className = 'dateTime';
    dateTime.textContent = '00:00';
    const weatherImg = document.createElement('img');
    weatherImg.className = "weatherImg";
    weatherImg.src = sunnyIcon;
    const toggle = document.createElement('label');
    toggle.className = "toggle";
    const tempInput = document.createElement('input');
    tempInput.type = 'checkbox';
    tempInput.className = 'unitInput';
    const slider = document.createElement('div');
    slider.className = 'slider';
    const celsius = document.createElement('span');
    celsius.textContent = '°C';
    celsius.className = 'celsius';
    const faren = document.createElement('span');
    faren.textContent = '°F';
    faren.className = 'faren';
    toggle.append(tempInput, slider, faren, celsius);

    submain.append(temperatureCont,dateTime,location, weatherImg, conditions, toggle);

    const weeklyPanel = document.createElement('div');
    weeklyPanel.className = "weeklyPanel";
    const weeklyTitle = document.createElement('div');
    weeklyTitle.textContent = "~ DAY FORECAST";
    weeklyTitle.className = 'weeklyTitle';
    const previewCont = document.createElement('div');
    previewCont.className = 'previewCont';
    // prefill seven placeholder previews;
    for (let day = 0; day < 7; day++) {
        previewCont.appendChild(previewInit());
    }
    weeklyPanel.append(weeklyTitle, previewCont);

    mainCont.append(submain, form, weeklyPanel);

    document.body.appendChild(mainCont);

}


const boardInfo = {
    mode: -1,
    tempArr: Array.from({length: 16}, () => ['unknown', 'unknown']),
    location: '',
    condition: '',
    time: '',
    weekly_panel: Array.from({length: 15}, () => ['unknown', 'unknown']),
    weatherIMGPath: '',
    bgIMGPath: '',
};

export function boardInfoUpdate(weatherObj) {
    const {weeklyPanel, tempArr} = boardInfo;
    const {daysArr} = weatherObj;

    boardInfo.mode = weatherObj.mode;
    tempArr[0] = [weatherObj.temp, Math.round((weatherObj.temp - 32) * 5 / 9)];
    boardInfo.location = weatherObj.addr;
    boardInfo.condition = weatherObj.conditions;
    boardInfo.time = weatherObj.datetime;
    boardInfo.weatherIMGPath = weatherObj.stickerPath;
    boardInfo.bgIMGPath = weatherObj.BGImgPath;

    if (daysArr) {
        daysArr.forEach((day, i) => {
            weeklyPanel[i] = [day.datetime, day.iconPath];
            tempArr[i+1] = [day.temp, Math.round((day.temp - 32) * 5 / 9)];
        });
    } 

    // store in localStorage
    localStorage.setItem('prevData', JSON.stringify(boardInfo));
};

export function UILoad() {
    const unitCode = document.querySelector('.unitInput').checked ? 1 : 0;
    document.querySelector('.location').textContent = boardInfo.location;
    document.querySelector('.conditions').textContent = boardInfo.location;
    document.querySelector('.dateTime').textContent = boardInfo.time;
    document.querySelector('.weatherImg').textContent = boardInfo.weatherIMGPath;
    document.querySelector('.tempValue').textContent = boardInfo.tempArr[0][unitCode];

    const weeklyCont = document.querySelector('.previewCont');
    weeklyCont.replaceChildren();
    // alter weekly panel display based on mode
    switch (boardInfo.mode) {
        case 0:
            break;
        case 1: 
            document.querySelectorAll('.preview').forEach((preview, i) => {
                const date = `${boardInfo.weekly_panel[i][0].slice(5, 7)} / ${boardInfo.weekly_panel[i][0].slice(8, 10)}`;
                preview.querySelector('.date').textContent = date;
                preview.querySelector('.previewIcon').src = boardInfo.weekly_panel[i][1];
                preview.querySelector('.tempValue').textContent = boardInfo.tempArr[i+1][unitCode];
            });
            break;
        case 2: 
            break;
    }

}



export function bgIMGReplace(imgPath) {
    document.body.setAttribute('style', `--bg-image: url(${imgPath})`);    
}

export function unitToggle(unit) {
    if (boardInfo.mode == -1) return;
    const valArr = document.querySelectorAll(".tempValue");
    valArr.forEach((node, i) => {
        const val = +(node.textContent);
        if (Number.isNaN(val)) return;
        node.textContent = boardInfo.tempArr[i][unit];
    });
}