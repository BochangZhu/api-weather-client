
export function initForm() {
    const form = document.createElement('form');

    const header = document.createElement('div');
    header.textContent = "Update Information";
    header.className = "header";
    // Mode
    const modeTitle = document.createElement('p');
    modeTitle.textContent = "Mode";
    const modeCont = document.createElement('div');
    const modeArr = ['current', 'weekly', 'fifteen'];
    modeArr.forEach((str, i) => {
        const label = document.createElement('label');
        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'mode';
        radio.value = str;
        if (!i) radio.checked = true;
        label.append(radio, str);
        modeCont.appendChild(label);
    });

    // location
    const locLabel = document.createElement('label');
    const locInput = document.createElement('input');
    locInput.required = true;
    locInput.type = "text";
    locInput.name = 'location';
    locInput.value = "London,UK";
    const question = document.createElement('img');
    question.className = "questionIcon";
    (async () => {
        try {
            const obj = await import('./assets/questionIcon.svg');
            question.src = obj.default;
        }
        catch {
            question.src = '#';
        }
    })();
    locLabel.append("Location", locInput, question);

    const tooltip = document.createElement('div');
    tooltip.className = "tooltip hidden";
    const title = document.createElement('p');
    title.textContent = 'Accepted Formats: ';
    const ul = document.createElement('ul');
    const liArr = ["City,Country: London,UK", "Latitude,Longitude: 40.7128,-74.0060", "Postal Code: 90210"];
    liArr.forEach(str => {
        const temp = document.createElement('li');
        temp.textContent = str;
        ul.appendChild(temp);
    });
    const para = document.createElement('a');
    para.textContent = "Use my location";
    para.addEventListener('click', () => {
        navigator.geolocation.getCurrentPosition((pos) => locInput.value = `${pos.coords.latitude},${pos.coords.longitude}`, (e) => {
            if (e.code != e.PERMISSION_DENIED) alert(`Fail to get location. Code: ${e.code}.`);
        });
    });
    tooltip.append(title, ul, para);
    question.addEventListener('click', () => {
        tooltip.classList.toggle('hidden');
    });
    document.addEventListener('click', e => {
        if (!tooltip.contains(e.target) && !question.contains(e.target)) {
            tooltip.classList.add('hidden');
        }
    })

    const confirm = document.createElement('button');
    confirm.textContent = "Access Weather";
    confirm.type = 'submit';

    form.append(header, modeTitle, modeCont, locLabel, tooltip, confirm);
    
    form.addEventListener('submit', () => {
        // handle display
    })

    return form;

}