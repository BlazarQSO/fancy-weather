let serviceClassModule = {};
serviceClassModule.ServiceClass = class ServiceClass {

    static devTest() {
        let btnDevTest = document.getElementById("devTest");
        if (btnDevTest.classList.length > 1) {
            document.getElementById("mocha").style.display = "block";
            btnDevTest.classList.remove("noCheck");
        } else {
            document.getElementById("mocha").style.display = "none";
            btnDevTest.classList.add("noCheck");
        }
    }

    static initMap(latitude, longitude, lang) {
        mapboxgl.accessToken = "pk.eyJ1IjoiYmxhemFycXNvIiwiYSI6ImNrNDJraGI3dTAxYTMzbHFpZXA5ZTN0b3IifQ.MNNE20R0ZfNS1EuSVEcs1g";
        let map = new mapboxgl.Map({
            container: "map",
            style: "mapbox://styles/mapbox/streets-v11",
            center: [longitude, latitude],
            zoom: 9
        });

        let name_lang = document.getElementById("select").value;
        if (name_lang === "ru" || name_lang === "be") {
            name_lang = "name_ru";
        } else {
            name_lang = "name_en";
        }

        map.on('load', function () {
            map.setLayoutProperty('country-label', 'text-field', [
                'format',
                ['get', name_lang],
                { 'font-scale': 1.2 },             
            ]);            
        });

        return map !== undefined || map !== null;
    }

    static changeC(id) {
        let fahrenheit = document.getElementById(id).textContent;
        fahrenheit = fahrenheit.substr(0, fahrenheit.length - 1);
        let li2context = "";
        if (id === "li2") {
            li2context = fahrenheit.split(":")[0] + ": ";
            fahrenheit = fahrenheit.split(":")[1].trim();
        }
        let celsius = Math.round((fahrenheit - 32) * 5 / 9);
        document.getElementById(id).innerHTML = li2context + celsius + "&#176;";
        return celsius;
    }

    static changeF(id) {
        let celsius = document.getElementById(id).textContent;
        celsius = celsius.substr(0, celsius.length - 1);
        let li2context = "";
        if (id === "li2") {
            li2context = celsius.split(":")[0] + ": ";
            celsius = celsius.split(":")[1].trim();
        }
        let fahrenheit = Math.round(celsius * 9 / 5 + 32);
        document.getElementById(id).innerHTML = li2context + fahrenheit + "&#176;";
        return fahrenheit;
    }

    static check(search) {
        let pattern = /^[a-zA-Zа-яА-ЯЁіІЎў]+((?:[- ][a-zA-Zа-яА-ЯЁіІЎў]+)*)+$/;
        search.trim();
        return pattern.test(search);
    }

    static timer() {
        let lang = document.getElementById("select").value;
        let time = sessionStorage.getItem("time");
        sessionStorage.setItem("time", Number(time) + 1);
        let date = new Date(time * 1000 + 1000);
        let day = date.getUTCDay();
        let dateY = date.getUTCFullYear();
        let dateM = date.getUTCMonth() + 1;
        let dateD = date.getUTCDate();
        let dateH = date.getUTCHours();
        let dateMin = date.getUTCMinutes();
       
        dateH = this.zeroFormat(dateH);
        dateMin = this.zeroFormat(dateMin);        

        let dateRes = `${translate["shortDays"][day][lang]} ${dateD} ${translate["month"][dateM][lang]} ${dateH}:${dateMin}`;
        document.getElementById("time").textContent = dateRes;
        return [day, dateH, dateM];
    }

    static zeroFormat(value) {
        if (value < 10) {
            value = "0" + value;
        }
        return value;
    }

    static storage(placeName, weather, dateH, dateM) {
        sessionStorage.setItem("placeName", placeName);        
        if (weather.includes("-") || weather === "cloudy") {
            weather = "overcast";
        }
        
        sessionStorage.setItem("weather", weather);
        
        if (dateH[0] === "0") {
            dateH = dateH.replace(1, 1);
        }

        if (dateH > 22 || dateH < 8) {
            sessionStorage.setItem("night", "night");
        } else if (dateH >= 8 && dateH <= 12) {
            sessionStorage.setItem("night", "morning"); 
        } else if (dateH > 12 && dateH <= 18) {
            sessionStorage.setItem("night", "day");
        } else {
            sessionStorage.setItem("night", "evening");
        }

        if (dateM < 3 || dateM > 11) {
            sessionStorage.setItem("timeOfYear", "winter");
        } else if (dateM > 2 && dateM < 6) {
            sessionStorage.setItem("timeOfYear", "spring");
        } else if (dateM > 5 && dateM < 9) {
            sessionStorage.setItem("timeOfYear", "summer");
        } else {
            sessionStorage.setItem("timeOfYear", "autumn");
        }
    }
}