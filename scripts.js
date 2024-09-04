function copyMainData() {
    let mainData = '';

    const post = document.getElementById("post").value;
    const settlement = document.getElementById("settlement").value;
    const time = document.getElementById("time").value;
    const date = document.getElementById("date").value;
    const targetNumber = document.getElementById("target-number").value;
    const targetName = document.getElementById("target-name").value;
    const azimuth = document.getElementById("azimuth").value;
    const course = document.getElementById("course").value;
    const altitude = document.getElementById("altitude").value;
    const distance = document.getElementById("distance").value;
    const results = document.getElementById("results").value;

    if (post) mainData += `Пост: ${post}\n`;
    if (settlement) mainData += `Населений пункт: ${settlement}\n`;
    if (time) mainData += `Час: ${time}\n`;
    if (date) mainData += `Дата: ${date}\n`;
    if (targetNumber) mainData += `Ном.цілі: ${targetNumber}\n`;
    if (targetName) mainData += `Назва цілі: ${targetName}\n`;
    if (azimuth) mainData += `Азимут: ${azimuth}°\n`;
    if (course) mainData += `Курс: ${course}°\n`;
    if (altitude) mainData += `Висота: ${altitude}\n`;
    if (distance) mainData += `Дистанція: ${distance}\n`;
    if (results) mainData += `Результати роботи: ${results}\n`;

    return mainData.trim();
}

function copyAKData() {
    let akData = '';

    const pm = document.getElementById("pm").value;
    const ts = document.getElementById("ts").value;
    const targetingAk = document.getElementById("targeting-ak").value;
    const shooterAk = document.getElementById("shooter-ak").value;

    if (pm || ts || targetingAk || shooterAk) {
        akData += "Расход БК АК-74/5.45:\n";
        if (pm) akData += `ПМ: ${pm}\n`;
        if (ts) akData += `ТС: ${ts}\n`;
        if (targetingAk) akData += `Цілевказівку дав: ${targetingAk}\n`;
        if (shooterAk) akData += `Стрільбу вів: ${shooterAk}\n`;
    }

    return akData.trim();
}

function copyIglaData() {
    let iglaData = '';

    const bkUsage = document.getElementById("bk-usage").value;
    const missile = document.getElementById("missile").value;
    const targeting = document.getElementById("targeting").value;
    const shooter = document.getElementById("shooter").value;

    if (bkUsage || missile || targeting || shooter) {
        iglaData += "Розхід Б.К. ПЗРК Игла-1:\n";
        if (bkUsage) iglaData += `НДЖ: ${bkUsage}\n`;
        if (missile) iglaData += `Ракета: ${missile}\n`;
        if (targeting) iglaData += `Цілевказівку дав: ${targeting}\n`;
        if (shooter) iglaData += `Стрілець: ${shooter}\n`;
    }

    return iglaData.trim();
}

function copySectionData(sectionId) {
    let dataString = '';

    switch (sectionId) {
        case 'main':
            dataString = copyMainData();
            break;
        case 'ak':
            dataString = copyAKData();
            break;
        case 'igla':
            dataString = copyIglaData();
            break;
    }

    if (dataString) {
        navigator.clipboard.writeText(dataString).then(() => {
            alert(`Дані ${sectionId} секції скопійовані!`);
        }).catch(error => console.error('Помилка при спробі скопіювати дані:', error));
    } else {
        alert(`Немає даних для копіювання в ${sectionId} секції.`);
    }
}

function shareAllData() {
    let dataString = '';

    const mainData = copyMainData();
    if (mainData) dataString += `${mainData}\n`;

    const akData = copyAKData();
    if (akData) dataString += `\n${akData}\n`;

    const iglaData = copyIglaData();
    if (iglaData) dataString += `\n${iglaData}\n`;

    if (dataString) {
        if (navigator.share) {
            navigator.share({
                title: 'Усі дані',
                text: dataString,
            }).catch(error => console.error('Помилка при спробі поділитися даними:', error));
        } else {
            alert('Ваш браузер не підтримує функцію поділитися.');
        }
    } else {
        alert("Немає даних для поділитися.");
    }
}

// Установка обработчиков событий для кнопок
document.getElementById("copy-main").addEventListener("click", () => copySectionData('main'));
document.getElementById("copy-ak").addEventListener("click", () => copySectionData('ak'));
document.getElementById("copy-igla").addEventListener("click", () => copySectionData('igla'));
document.getElementById("share-all").addEventListener("click", shareAllData);
