// Form Inputs
const searchBtn = document.querySelector("#search");
const inputValue = document.querySelector("#inputValue");

// Where to display
let cityName = document.querySelector("#cityName");
let weatherIcon = document.querySelector("#weather-icon");
let desc = document.querySelector("#desc");
let cityTemp = document.querySelector("#temp");
let cityHumidity = document.querySelector("#humidity")
let cityWind = document.querySelector("#wind");
let videoPath = document.querySelector(".videoBG");

let weather = {
    apiKey: "50a7aa80fa492fa92e874d23ad061374",
    fetchWeather: function (inputValue) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q="
            + inputValue
            + "&units=metric&appid="
            + this.apiKey
        ).then((response) => response.json())
            .then((data) => this.displayWeather(data))
            .catch((err) => alert("Please enter a valid city name"))
    },

    displayWeather: function (data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        console.log(data)
        cityName.innerText = name;
        weatherIcon.src = "https://openweathermap.org/img/wn/" + icon + ".png"
        desc.innerText = description;
        cityTemp.innerText = temp + "°C";
        cityHumidity.innerText = "Humidity: " + humidity + "%";
        cityWind, innerText = "Wind Speed: " + speed + "km/h";
        videoPath.src = getVideoSrc(data);
    },
    search: function () {
        this.fetchWeather(inputValue.value)
    }
}

searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    weather.search();
})

function getVideoSrc(data) {
    let path = "";

    switch(data.weather[0].main){
        case "Clear":
            path = "../videos/sunnyday.mp4";
            break;
        case "Clouds":
            path = "../videos/cloudyday.mp4"
            break;
        case "Rain":
            path = "../videos/rainyday.mp4"
            break;
        case "Snow":
            path = "../videos/snowyday1.mp4"
            break;
        case "Thunderstorm":
            path = "../videos/thunderstormday.mp4"
            break;
        case "Drizzle":
            path = "../videos/drizzle.mp4"
            break;
        default:
            path = "../videos/mist.mp4"
    }

    return path;
}


