let controlsModule = {};
controlsModule.Controls = class Controls {

    // input text
    static placeSearch() {
        let lang = document.getElementById("select").value;
        let search = document.getElementById("input").value;  
        search = search.trim();
        if (ServiceClass.check(search)) {
            apiFanction.apiRequest(lang, search);
        } else {
            let elem = document.getElementById("validation");
            elem.style.display = "block";
            elem.textContent = translate["translate"]["input"][lang];
            setTimeout(() => {
                document.getElementById("validation").style.display = "none";
            }, 1000);
        }
    }
    
    static incorrectInput() {
        let lang = document.getElementById("select").value;
        let elem = document.getElementById("validation");
        elem.style.display = "block";
        elem.textContent = translate["translate"]["input2"][lang];
        setTimeout(() => {
            document.getElementById("validation").style.display = "none";
        }, 1000);
    }

    //change image
    static async btnSwitchBackground() {        
        let timeOfYear = sessionStorage.getItem("timeOfYear") || "winter";
        let night = sessionStorage.getItem("night") || "night";
        let weather = sessionStorage.getItem("weather") || "rain";        
        document.getElementById("btnSwitchBg").classList.add("loading");
        
        try {
            let targetUrl = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=579b6387375560558bb239ed6c53c948&nojsoncallback=1&tag_mode=all&tags=`
                + `${timeOfYear},${night},${weather}&extras=url_h&format=json`;
        
            let response = await fetch(targetUrl);
            let json = await response.json();
            
            let img = new Image();         
            img.crossOrigin = "Anonymous";

            if (json && json.photos.photo.length > 0) {
                let rand = Math.random() * (json.photos.photo.length + 1);
                rand = Math.floor(rand);
                
                if (json.photos.photo[rand] !== undefined && json.photos.photo[rand].url_h !== undefined) {
                    img.src = json.photos.photo[rand].url_h;
                    
                    img.onload = function () {         
                        document.getElementsByClassName("body")[0].classList.toggle("bg-animation");                
                        document.getElementsByClassName("body")[0].style.backgroundImage = "url(" + img.src + ")";    
                        setTimeout(() => {
                            document.getElementById("btnSwitchBg").classList.remove("loading");              
                        }, 1500);                
                    };             
                } else {
                    document.getElementsByClassName("body")[0].style.backgroundImage = "url(/src/img/default.jpg)"; 
                    document.getElementById("btnSwitchBg").classList.remove("loading");     
                    document.getElementById("btnSwitchBg").style.border = "2px solid red";
                    setTimeout(() => {
                        document.getElementById("btnSwitchBg").style.border = "2px solid gold";    
                    }, 1500);
                }
            } else {
                document.getElementById("btnSwitchBg").classList.remove("loading");              
                document.getElementById("btnSwitchBg").style.border = "2px solid red";
                document.getElementsByClassName("body")[0].style.backgroundImage = "url(/src/img/default.jpg)"; 
                setTimeout(() => {
                    document.getElementById("btnSwitchBg").style.border = "2px solid gold";    
                }, 1500);
            }
        } catch (error){
            document.getElementsByClassName("body")[0].style.backgroundImage = "url(/src/img/default.jpg)"; 
        }        
    }
        
    static changeLanguage() {
        let lang = document.getElementById("select").value;
        let placeName = sessionStorage.getItem("placeName") || "Minsk";
        apiFanction.apiRequest(lang, placeName, true);        
    }

    static changeTemperature(id, choose) {
        if (!choose) {
            if (id === "btnC") {
                buttons.btnC.choose = true;
                document.getElementById("btnC").classList.add("choose");
                buttons.btnF.choose = false;
                document.getElementById("btnF").classList.remove("choose");
                
                ServiceClass.changeC("temperature"); 
                ServiceClass.changeC("li2"); 
                ServiceClass.changeC("temperatureDay1"); 
                ServiceClass.changeC("temperatureDay2"); 
                ServiceClass.changeC("temperatureDay3"); 
            } else {
                buttons.btnC.choose = false;
                document.getElementById("btnC").classList.remove("choose");
                buttons.btnF.choose = true;
                document.getElementById("btnF").classList.add("choose");

                ServiceClass.changeF("temperature"); 
                ServiceClass.changeF("li2"); 
                ServiceClass.changeF("temperatureDay1"); 
                ServiceClass.changeF("temperatureDay2"); 
                ServiceClass.changeF("temperatureDay3");        
            }                
        }
    }
}