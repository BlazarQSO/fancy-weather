let speechModule = {};
var stopSpeech = false;
speechModule.speech = function speech() {
    var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
    var recognition = new SpeechRecognition();

    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.continuous = true;    

    let speechLang = document.getElementById("select").value;
    if (speechLang === "en") {
        recognition.lang = 'en-US';
    } else if (speechLang === "ru") {
        recognition.lang = 'ru-RU';
    } else if (speechLang === "be") {
        recognition.lang = 'be-By';
    }


    if (!stopSpeech) {
        recognition.start();
        document.getElementById("speech").style.border = "2px solid crimson";
        document.getElementById("speech").classList.add("start-speech");
        stopSpeech = true;
    } else {
        document.getElementById("speech").style.border = "2px solid gold";
        document.getElementById("speech").style.borderLeft = "0";
        document.getElementById("speech").classList.remove("start-speech");
        stopSpeech = false;
        recognition.stop();
    }

    recognition.onresult = function (event) {
        let last = event.results[0][0].transcript;
        document.getElementById("input").value = last;
        document.getElementById("speech").style.border = "2px solid gold";
        document.getElementById("speech").style.borderLeft = "0";
        document.getElementById("speech").classList.remove("start-speech");
        stopSpeech = false;
        Controls.placeSearch();
    }
       
    recognition.onspeechend = function () {
        recognition.stop();
    }
}
