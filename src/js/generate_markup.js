(function () {

    let page = document.createElement("div");
    page.className = "wrapper";

    // block 1------------------------------------
    let block1 = document.createElement("div");
    block1.className = "block1";

    let wrapControl = document.createElement("div");
    wrapControl.className = "wrap-control";
    let btnSwitchBg = document.createElement("button");
    btnSwitchBg.className = "btn-switch-bg";
    btnSwitchBg.id = "btnSwitchBg";

    let select = document.createElement("select");
    select.className = "select";
    select.id = "select";
    let opt1 = document.createElement("option");
    opt1.text = "en";
    opt1.id = "opt1";
    let opt2 = document.createElement("option");
    opt2.text = "ru";
    opt2.id = "opt2";
    let opt3 = document.createElement("option");
    opt3.text = "be";
    opt3.id = "opt3";
    select.appendChild(opt1);
    select.appendChild(opt2);
    select.appendChild(opt3);

    let btnC = document.createElement("button");
    btnC.className = "btnC";
    btnC.id = "btnC";
    btnC.innerHTML = "&#8451;";
    let btnF = document.createElement("button");
    btnF.className = "btnF";
    btnF.id = "btnF";
    btnF.innerHTML = "&#8457;";

    let wrapInput = document.createElement("div");
    wrapInput.className = "wrap-input";
    let input = document.createElement("input");
    input.attributes = "type=text";
    input.setAttribute("placeholder", "Search City");
    input.className = "search-input";
    input.id = "input";
    let btnSpeech = document.createElement("button");
    btnSpeech.id = "speech";
    btnSpeech.className = "speech";    
    let btnSearch = document.createElement("button");
    btnSearch.className = "search-btn";
    btnSearch.id = "search";
    btnSearch.textContent = "Search";
    let validation = document.createElement("div");
    validation.className = "validation";
    validation.id = "validation";

    wrapControl.appendChild(btnSwitchBg);
    wrapControl.appendChild(select);
    wrapControl.appendChild(btnC);
    wrapControl.appendChild(btnF);
    wrapInput.appendChild(input);
    wrapInput.appendChild(btnSpeech);
    wrapInput.appendChild(validation);
    wrapInput.appendChild(btnSearch);
    block1.appendChild(wrapControl);
    block1.appendChild(wrapInput);

    // block 2------------------------------------
    let block2 = document.createElement("div");
    block2.className = "block2";

    let nameLocation = document.createElement("div");
    nameLocation.className = "name-location";
    nameLocation.textContent = "MINSK, BELARUS";
    nameLocation.id = "nameLocation";

    let time = document.createElement("div");
    time.className = "time";
    time.id = "time";
    time.textContent = "Mon 09 December 19:26";

    let wrapInfo = document.createElement("div");
    wrapInfo.className = "wrap-info";

    let temperature = document.createElement("div");
    temperature.className = "temperature";
    temperature.id = "temperature";
    temperature.innerHTML = "10&#176;";

    let wrapImg = document.createElement("div");
    wrapImg.className = "wrap-img";

    let weatherImg = document.createElement("div");
    weatherImg.className = "weather-img";
    weatherImg.id = "weatherImg";
    let canvas1 = document.createElement("canvas");
    canvas1.id = "canvas1";
    canvas1.className = "canvas1";
    weatherImg.appendChild(canvas1);

    let info = document.createElement("ul");
    info.className = "info";
    let li1 = document.createElement("li");
    li1.id = "li1";
    li1.textContent = "OVERCAST";
    info.appendChild(li1);
    let li2 = document.createElement("li");
    li2.id = "li2";
    li2.innerHTML = "FEELS LIKE: 7&#176;";
    info.appendChild(li2);
    let li3 = document.createElement("li");
    li3.id = "li3";
    li3.textContent = "WIND: 2 m/s";
    info.appendChild(li3);
    let li4 = document.createElement("li");
    li4.id = "li4";
    li4.textContent = "HUMIDITY: 83%";
    info.appendChild(li4);

    wrapImg.appendChild(temperature);
    wrapImg.appendChild(weatherImg);    
    wrapInfo.appendChild(wrapImg);
    wrapInfo.appendChild(info);

    block2.appendChild(nameLocation);
    block2.appendChild(time);
    block2.appendChild(wrapInfo);

    // block 3------------------------------------
    let block3 = document.createElement("div");
    block3.className = "block3";

    let firstDay = document.createElement("div");
    firstDay.className = "day-info";

    let day1 = document.createElement("div");
    day1.id = "firstDay";
    day1.textContent = "TUESDAY";
    let wrapInfoDay1 = document.createElement("div");
    wrapInfoDay1.className = "wrap-info-day";
    let temperDay1 = document.createElement("div");
    temperDay1.id = "temperatureDay1";
    temperDay1.innerHTML = "7&#176;";
    let imgDay1 = document.createElement("canvas");
    imgDay1.id = "imgDay1";
    imgDay1.className = "img-day";
    wrapInfoDay1.appendChild(temperDay1);
    wrapInfoDay1.appendChild(imgDay1);

    firstDay.appendChild(day1);
    firstDay.appendChild(wrapInfoDay1);


    let secondDay = document.createElement("div");
    secondDay.className = "day-info";

    let day2 = document.createElement("div");
    day2.id = "secondDay";
    day2.textContent = "WEDNESDAY";
    let wrapInfoDay2 = document.createElement("div");
    wrapInfoDay2.className = "wrap-info-day";
    let temperDay2 = document.createElement("div");
    temperDay2.id = "temperatureDay2";
    temperDay2.innerHTML = "6&#176;";
    let imgDay2 = document.createElement("canvas");
    imgDay2.id = "imgDay2";
    imgDay2.className = "img-day";
    wrapInfoDay2.appendChild(temperDay2);
    wrapInfoDay2.appendChild(imgDay2);

    secondDay.appendChild(day2);
    secondDay.appendChild(wrapInfoDay2);


    let thirdDay = document.createElement("div");
    thirdDay.className = "day-info";

    let day3 = document.createElement("div");
    day3.id = "thirdDay";
    day3.textContent = "THURSDAY";
    let wrapInfoDay3 = document.createElement("div");
    wrapInfoDay3.className = "wrap-info-day";
    let temperDay3 = document.createElement("div");
    temperDay3.id = "temperatureDay3";
    temperDay3.innerHTML = "3&#176;";
    let imgDay3 = document.createElement("canvas");
    imgDay3.id = "imgDay3";
    imgDay3.className = "img-day";
    wrapInfoDay3.appendChild(temperDay3);
    wrapInfoDay3.appendChild(imgDay3);

    thirdDay.appendChild(day3);
    thirdDay.appendChild(wrapInfoDay3);

    block3.appendChild(firstDay);
    block3.appendChild(secondDay);
    block3.appendChild(thirdDay);

    // block 4------------------------------------
    let block4 = document.createElement("div");
    block4.className = "block4";

    let map = document.createElement("div");
    map.id = "map";
    map.className = "map";
    let latitude = document.createElement("div");
    latitude.id = "latitude";
    latitude.className = "latitude";
    latitude.innerHTML = "latitude: 53&#176;54'";
    let longitude = document.createElement("div");
    longitude.id = "longitude";
    longitude.className = "longitude";
    longitude.innerHTML = "longitude: 27&#176;34'";

    block4.appendChild(map);
    block4.appendChild(latitude);
    block4.appendChild(longitude);

    let wrapb2b3 = document.createElement("div");
    wrapb2b3.className = "wrapb2b3";
    let wrapb2b4 = document.createElement("div");
    wrapb2b4.className = "wrapb2b4";

    wrapb2b3.appendChild(block2);
    wrapb2b3.appendChild(block3);
    wrapb2b4.appendChild(wrapb2b3);
    wrapb2b4.appendChild(block4);

    let btnDevTest = document.createElement("button");
    btnDevTest.id = "devTest";    
    btnDevTest.classList.add("dev-test");
    btnDevTest.classList.add("noCheck");
    btnDevTest.textContent = "dev test";

    let mochaTest = document.createElement("div");
    mochaTest.id = "mocha";
    mochaTest.className = "mocha";    

    page.appendChild(block1);
    page.appendChild(wrapb2b4);
    page.appendChild(btnDevTest);
    page.appendChild(mochaTest);
    
    document.body.appendChild(page);

})();
