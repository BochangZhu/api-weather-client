import { initForm } from "./formInit";
import cloudyIcon from "./assets/cloudyIcon.svg";
import rainyIcon from "./assets/rainyIcon.svg";
import snowyIcon from "./assets/snowyIcon.svg";
import stormyIcon from "./assets/stormyIcon.svg";
import sunnyIcon from "./assets/sunnyIcon.svg";

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
    temperature.className = "temperature";
    temperature.textContent = '--';
    const unit = document.createElement('span');
    unit.className = "unit";
    unit.textContent = '°C';
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
    const slider = document.createElement('div');
    slider.className = 'slider';
    const celsius = document.createElement('span');
    celsius.textContent = '°C';
    celsius.className = 'celsius';
    const faren = document.createElement('span');
    faren.textContent = '°F';
    faren.className = 'faren';
    toggle.append(tempInput, slider, faren, celsius);

    submain.append(temperatureCont,dateTime,location, unit, weatherImg, conditions, toggle);

    const weeklyPanel = document.createElement('div');
    weeklyPanel.className = "weeklyPanel";
    const weeklyTitle = "~ DAY FORECAST";
    weeklyTitle.className = 'weeklyTitle';
    const previewCont = document.createElement('div');
    previewCont.className = 'previewCont';
    function previewInit() {
        const tempCont = document.createElement('div');
        tempCont.className = 'preview';
        const date = document.createElement('div');
        date.className = 'date';
        date.textContent = "~~/~~";
        const previewIcon = document.createElement('img');
        previewIcon.className = 'previewIcon';
        previewIcon.src = sunnyIcon;
        const previewTemp = document.createElement('div');
        const value = document.createElement('div');
        value.className = 'value';
        value.textContent = '~';
        const unit = document.createElement('span');
        unit.className = 'unit';
        previewTemp.append(value, unit);

        tempCont.append(date, previewIcon, previewTemp);
        return tempCont;
    }
    // prefill seven placeholder previews;
    for (let day = 0; day < 7; day++) {
        previewCont.appendChild(previewInit());
    }
    weeklyPanel.append(weeklyTitle, previewCont);

    mainCont.append(submain, form, weeklyPanel);

}

export function boardUpdate() {

};