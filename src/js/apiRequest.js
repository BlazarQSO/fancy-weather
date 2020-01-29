let translate = translateModule.translate;
let speech = speechModule.speech;
let ServiceClass = serviceClassModule.ServiceClass;
let Controls = controlsModule.Controls;

let buttons = {
    "btnSwitchBg": {
        onClickHandler: function () {    
            return () => Controls.btnSwitchBackground();
        }   
    },
    "select": {            
        onClickHandler: function () {
            return () => Controls.changeLanguage();
        }        
    },                  
    "btnC": {
        title: "C",
        choose: true,
        onClickHandler: function () {
            return () => Controls.changeTemperature("btnC", this.choose);
        }        
    },
    "btnF": {
        title: "F",
        choose: false,
        onClickHandler: function () {
            return () => Controls.changeTemperature("btnF", this.choose);
        }        
    },
    "search": {
        onClickHandler: function () {          
            return () => Controls.placeSearch();
        }           
    },
    "speech": {
        onClickHandler: function () {
            return () => speech();
        }
    },
    "devTest": {
        onClickHandler: function () {          
            return () => ServiceClass.devTest();
        }   
    }
}

let apiFanction = {};
apiFanction.interval = false;

apiFanction.apiRequest = async function apiRequest(lang, searchCity, loadMap) {

    const targetUrl1 = 'https://ipinfo.io/json?token=f7fa4c8f7d2011';
    let response1 = await fetch(targetUrl1);
    let json1 = await response1.json();
      
    let coord = json1.loc.split(",");        
    latitude = coord[0];
    longitude = coord[1];
    city = json1.city;           

    let placeName = city;
    if (searchCity != undefined) {
        placeName = searchCity;
    }

    let targetUrl2 = 'https://api.opencagedata.com/geocode/v1/json?q=' + placeName 
        + '&key=88e71f2356084469ac5864f1cd0cbe35&language=' + lang;
    let response2 = await fetch(targetUrl2);
    let json2 = await response2.json();        
                                 
    let time = json2.timestamp.created_unix;
    if (json2.results.length !== 0) {
        if (json2.results[0].annotations && json2.results[0].annotations.timezone) {
            if (json2.results[0].annotations.timezone !== undefined) {
                time = time + json2.results[0].annotations.timezone.offset_sec;
            }
        }
    } else {
        Controls.incorrectInput();
        return;
    }
       
    let res = [];
    sessionStorage.setItem("time", time);
    res = ServiceClass.timer();
    
    if (apiFanction.interval === false) {
        apiFanction.interval = setInterval(function () {        
            ServiceClass.timer();
        }, 1000);        
    } else {
        clearInterval(apiFanction.interval);
        apiFanction.interval = setInterval(function () {        
            ServiceClass.timer();
        }, 1000);
    }   
        
    let day =   res[0];
    let dateH = res[1];
    let dateM = res[2];

    let nameLocation;    
    for (let i = 0; i < json2.results.length; i++){
        if (json2.results[i].components.city !== undefined && json2.results[i].components.city.length < 20) {
            nameLocation = `${json2.results[i].components.city}, ${json2.results[i].components.country}`;            
        } else if (json2.results[i].components.town !== undefined){
            nameLocation = `${json2.results[i].components.town}, ${json2.results[i].components.country}`;            
        } else if (json2.results[i].components.village !== undefined) {
            nameLocation = `${json2.results[i].components.village}, ${json2.results[i].components.country}`;            
        } else if (json2.results[i].components.suburb !== undefined) {
            nameLocation = `${json2.results[i].components.suburb}, ${json2.results[i].components.country}`;
        } else if (json2.results[i].components.state !== undefined) {        
            nameLocation = `${json2.results[i].components.state}, ${json2.results[i].components.country}`;            
        } else {
            continue;
        }
            
        if (!(nameLocation.indexOf("Region") !== -1 && i < json2.results.length - 1)) {
            break;
        }
    }

    latitude = json2.results[0].geometry.lat;
    longitude = json2.results[0].geometry.lng;
       
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const targetUrl3 = 'https://api.darksky.net/forecast/0ddb8cdebf7804e58bc15bc8699a2692/' 
        + latitude + ',' + longitude + '?units=si&lang=' + lang;
    let response3 = await fetch(proxyUrl + targetUrl3);
    let json3 = await response3.json();  

    if (loadMap === undefined) {
        ServiceClass.initMap(latitude, longitude, lang);
    }   
    
    let decNumber =  latitude % 1;
    latitude = latitude - latitude % 1 + "&#176;" + Math.round(Math.abs(decNumber) * 60) + "'";
    decNumber =  longitude % 1;
    longitude = longitude - longitude % 1 + "&#176;" + Math.round(Math.abs(decNumber) * 60) + "'";

    document.getElementById("nameLocation").textContent = nameLocation.toUpperCase();    
    document.getElementById("latitude").innerHTML = translate["translate"]["LATITUDE"][lang] + ": " + latitude;
    document.getElementById("longitude").innerHTML = translate["translate"]["LONGITUDE"][lang] + ": " + longitude;
    document.getElementById("firstDay").textContent = translate["days"][(day + 1) % 7][lang];
    document.getElementById("secondDay").textContent = translate["days"][(day + 2) % 7][lang]; 
    document.getElementById("thirdDay").textContent = translate["days"][(day + 3) % 7][lang];
    document.getElementById("input").setAttribute("placeholder", translate["translate"]["placeholder"][lang]);            
    document.getElementById("search").textContent = translate["translate"]["Search"][lang];

    if (document.getElementById("btnF").classList.length === 2) {
        document.getElementById("temperature").innerHTML = Math.round(json3.currently.temperature * 9 / 5 + 32) + "&#176;";
        document.getElementById("li2").innerHTML = `${translate["translateDSky"]["feels"][lang]} `
            + `${Math.round(json3.currently.apparentTemperature  * 9 / 5 + 32)}&#176;`;            
        let middle = Math.round((json3.daily.data[1].temperatureHigh + json3.daily.data[1].temperatureLow) / 2);
        middle = Math.round(middle * 9 / 5 + 32);
        document.getElementById("temperatureDay1").innerHTML = middle + "&#176;";
        middle = Math.round((json3.daily.data[2].temperatureHigh + json3.daily.data[2].temperatureLow) / 2);
        middle = Math.round(middle * 9 / 5 + 32);
        document.getElementById("temperatureDay2").innerHTML = middle + "&#176;";
        middle = Math.round((json3.daily.data[3].temperatureHigh + json3.daily.data[3].temperatureLow) / 2);
        middle = Math.round(middle * 9 / 5 + 32);
        document.getElementById("temperatureDay3").innerHTML = middle + "&#176;";
    } else {
        document.getElementById("temperature").innerHTML = Math.round(json3.currently.temperature) + "&#176;";
        document.getElementById("li2").innerHTML = `${translate["translateDSky"]["feels"][lang]} ${Math.round(json3.currently.apparentTemperature)}&#176;`;            
        let middle = Math.round((json3.daily.data[1].temperatureHigh + json3.daily.data[1].temperatureLow) / 2);
        document.getElementById("temperatureDay1").innerHTML = middle + "&#176;";
        middle = Math.round((json3.daily.data[2].temperatureHigh + json3.daily.data[2].temperatureLow) / 2);
        document.getElementById("temperatureDay2").innerHTML = middle + "&#176;";
        middle = Math.round((json3.daily.data[3].temperatureHigh + json3.daily.data[3].temperatureLow) / 2);
        document.getElementById("temperatureDay3").innerHTML = middle + "&#176;";
    }

    let icons = new Skycons({"color": "orange"});    
    icons.set("canvas1", json3.currently.icon);
    icons.set("imgDay1", json3.daily.data[1].icon);
    icons.set("imgDay2", json3.daily.data[2].icon);
    icons.set("imgDay3", json3.daily.data[3].icon);  
    icons.play();
    
    document.getElementById("li1").textContent = json3.currently.summary.toUpperCase();    
    document.getElementById("li3").innerHTML = `${translate["translateDSky"]["wind"][lang]} ${parseFloat(json3.currently.windSpeed.toFixed(1))} ${translate["translateDSky"]["ms"][lang]}`;
    document.getElementById("li4").innerHTML = `${translate["translateDSky"]["humidity"][lang]} ${Math.round(json3.currently.humidity * 100)} %`;

    if (loadMap === undefined) {
        ServiceClass.storage(placeName, json3.currently.icon, dateH, dateM);
    }    
}   

window.onload = function () {

    let latitude = 0;
    let longitude = 0;
    let city = "Minsk";
    let lang = document.getElementById("select").value;
    document.getElementById("btnC").classList.add("choose");
    
    for (let key in buttons) {
        if (key !== "select") {
            document.querySelector("#" + key).addEventListener("click", buttons[key].onClickHandler(event), false);
        } else {
            document.querySelector("#" + key).addEventListener("change", buttons[key].onClickHandler(event), false);
        }
    }
    document.getElementById("input").addEventListener("keydown", (e) => {
        if (e.code === "Enter") { 
            Controls.placeSearch(); 
        }
    }, false);
    
    apiFanction.apiRequest(lang);
    Controls.btnSwitchBackground();    
    
    setTimeout(function() {        
        document.getElementsByClassName("body")[0].style.backgroundSize = "cover";
        document.getElementsByClassName("body")[0].style.visibility = "visible";        
    }, 3000);
}
