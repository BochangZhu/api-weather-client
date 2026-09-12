import { initForm } from "./formInit";
export function boardInit() {
    const mainCont = document.createElement('div');
    mainCont.className = 'main';

    const form = initForm();
    form.className = 'form';

    const submain = document.createElement('div');
    submain.className = "submain";
    const temperature = document.createElement('div');
    temperature.className = "temperature";
    const unit = document.createElement('span');
    unit.className = "unit";
    const toggle = document.createElement('label');
    toggle.className = "toggle";
    const tempInput = document.createElement('input');
    tempInput.type = 'checkbox';
    const slider = document.createElement('span');
    slider.className = 'slider';
    const celsius = document.createElement('span');
    celsius.textContent = '°C';
    celsius.className = 'celsius';
    const faren = document.createElement('span');
    faren.textContent = '°F';
    faren.className = 'faren';
    toggle.append(tempInput, slider, celsius, faren);
    const weatherImg = document.createElement('img');
    weatherImg.className = "weatherImg";
    const conditions = document.createElement('p');
    conditions.className = 'conditions';
    submain.append(temperature, unit, weatherImg, conditions, toggle);

    const weeklyPanel = document.createElement('div');
    weeklyPanel.className = "weeklyPanel";
    const weeklyTitle = "~ DAY FORECAST";
    weeklyTitle.className = 'weeklyTitle';
    const previewCont = document.createElement('div');
    function previewInit() {
        const tempCont = document.createElement('div');
        tempCont.className = 'preview';
        const date = document.createElement('div');
        date.className = 'date';
        date.textContent = "~~/~~";
        const previewIcon = document.createElement('img');
        previewIcon.className = 'previewIcon';
        previewIcon.src = '#';
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


    
}

export function boardUpdate() {

};