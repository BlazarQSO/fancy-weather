let assert = chai.assert;

describe("function changeC (button °C)", function () {
    document.getElementById("temperature").innerHTML = "32&#176;";
    it("Change °F to °C (32 °F == 0 °C)", function () {
        assert.equal(ServiceClass.changeC("temperature"), 0);
    });
});

describe("function changeC (button °C)", function () {
    document.getElementById("temperatureDay1").innerHTML = "-4&#176;";
    it("Change °F to °C (-4 °F == -20 °C)", function () {
        assert.equal(ServiceClass.changeC("temperatureDay1"), -20);
    });
});

describe("function changeF (button °F)", function () {
    document.getElementById("temperatureDay2").innerHTML = "0&#176;";
    it("Change °C to °F (0 °C == 32 °F)", function () {
        assert.equal(ServiceClass.changeF("temperatureDay2"), 32);
    });
});

describe("function changeF (button °F)", function () {
    document.getElementById("temperatureDay3").innerHTML = "-20&#176;";
    it("Change °C to °F (-20 °C == -4 °F)", function () {
        assert.equal(ServiceClass.changeF("temperatureDay3"), -4);
    });
});

describe("function check (text input)", function () {
    it("check for validation: 'Ростов-на-Дону' == true", function () {
        assert.equal(ServiceClass.check("Ростов-на-Дону"), true);
    });    
});

describe("function check (text input)", function () {    
    it("check for validation: 'Madrid2' == false", function () {
        assert.equal(ServiceClass.check("Madrid2"), false);
    });    
});

describe("function check (text input)", function () {
    it("check for validation: 'Ростов--на-Дону' == false", function () {
        assert.equal(ServiceClass.check("Ростов--на-Дону"), false);
    });
});

describe("function check (text input)", function () {
    it("check for validation: 'Los Angeles' == true", function () {
        assert.equal(ServiceClass.check("Los Angeles"), true);
    });
});

describe("function check (text input)", function () {
    it("check for validation: 'МосКвА' == true", function () {
        assert.equal(ServiceClass.check("МосКвА"), true);
    });
});

describe("function initMap ()", function () {    
    it("Map loaded from mapbox:", function () {
        assert.equal(ServiceClass.initMap(53.90, 27.56, "en"), true);
    });
});

describe("function storage ()", function () {
    ServiceClass.storage("Minsk", "rain", "24", "12");
    it("Сheck weather in storage: Minsk == Minsk", function () {
        let city = sessionStorage.getItem("placeName");
        assert.equal(city, "Minsk");
    });
    it("Сheck weather in storage: rain == rain", function () {
        let weather = sessionStorage.getItem("weather");
        assert.equal(weather, "rain");
    });
    it("check night or day in storage: 24 == night", function () {
        let night = sessionStorage.getItem("night");
        assert.equal(night, "night");
    });
    it("Сheck season in storage: 12 == winter", function () {
        let timeOfYear = sessionStorage.getItem("timeOfYear");
        assert.equal(timeOfYear, "winter");
    });
});