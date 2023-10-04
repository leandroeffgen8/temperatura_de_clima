
const apiKey = '6155dbdd08418e5d8a94654e19a504fa'
const apiCountryURL = 'https://flagsapi.com/'
const apiUnsplash = "https://source.unsplash.com/1600x900/?";

const cityInput = document.querySelector('#city-input');
const searchBtn = document.querySelector('#search');

const cityElement = document.querySelector('#city');
const tempElement = document.querySelector('#temperature span');
const descElement = document.querySelector('#description');
const weatherIconElement = document.querySelector('#weather-icon');
const countryElement = document.querySelector('#country');
const umidityElement = document.querySelector('#umidity span');
const windElement = document.querySelector('#wind span');
const weatherContainer = document.querySelector('#weather-data');

const errorMessageContainer = document.querySelector("#error-message");
const loader = document.querySelector("#loader");

const suggestionContainer = document.querySelector("#suggestions");
const suggestionButtons = document.querySelectorAll("#suggestions button");


// Loader
const toggleLoader = () => {
    loader.classList.toggle("hide");
};

const getWeatherData = async(city) => {

    toggleLoader();

    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`

    const res = await fetch(apiWeatherURL)
    const data = await res.json();

    toggleLoader();

    return data;
}

// Tratamento de erro
const showErrorMessage = () => {
    errorMessageContainer.classList.remove("hide");
};

const hideInformation = () => {
    errorMessageContainer.classList.add("hide");
    weatherContainer.classList.add("hide");
  
    suggestionContainer.classList.add("hide");
};


const showWeatherData = async(city) => {

    hideInformation();

    const data = await getWeatherData(city);

    if (data.cod === "404") {
        showErrorMessage();
        return;
    }

    cityElement.textContent = data.name;
    tempElement.textContent = parseInt(data.main.temp);
    descElement.textContent = data.weather[0].description;
    weatherIconElement.setAttribute('src', `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
    countryElement.setAttribute('src', `${apiCountryURL}${data.sys.country}/shiny/64.png` );
    umidityElement.textContent = `${data.main.humidity}%`;
    windElement.textContent = `${data.wind.speed}km/h`;

    document.body.style.backgroundImage = `url("${apiUnsplash + city}")`;

    weatherContainer.classList.remove('hide');    

}

searchBtn.addEventListener('click', (e) => {

    e.preventDefault();
    const city = cityInput.value;

    showWeatherData(city)

});

cityInput.addEventListener('keyup', (e) => {
    if(e.code === 'Enter'){
        const city = e.target.value;

        showWeatherData(city);
    }
});

// Sugestões
suggestionButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const city = btn.getAttribute("id");
  
      showWeatherData(city);
    });
});