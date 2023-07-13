const apiKey = '4f7b5ba4e25cec2994ec2b36a75f5e56';
const cityInput = document.querySelector('#city-input');
const searchBtn = document.querySelector('#search');
const cityElement = document.querySelector('#city');
const tempElement = document.querySelector('#temperature span');
const descElement = document.querySelector('#description');
const weatherIconElement = document.querySelector('#weather-icon');
const countryElement = document.querySelector('#country');
const humidityElement = document.querySelector('#humidity span');
const windElement = document.querySelector('#wind span');
const weatherContainer = document.querySelector('#weather-data');
const fundoImg = document.getElementById('fundo');
const form = document.querySelector('.form');
const div = document.querySelector('.container');
const loader = document.querySelector('#loader');


const getUnsplashPhoto = async (city) => {
    const apiUnsplash = await fetch(`https://api.unsplash.com/search/photos?query=${city}&client_id=PB06Rfm2CpC7MAhfEfNZz6efx2i7l6ONtFg65HiX3aI`);

    if (apiUnsplash.status === 200) {
        const dados = await apiUnsplash.json();
        return dados;
    }
}

const getWeatherData = async (city) => {
    const apiWeatherURL = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`);

    if (apiWeatherURL.status === 200) {
        const data = await apiWeatherURL.json();
        return data;
    }
}

const showWeatherData = async (city) => {
    weatherContainer.classList.add('hide');
    form.classList.add('hide');
    loader.classList.remove('hide');
    div.classList.add('hide');
    fundoImg.style.background = 'linear-gradient(180deg, #5b4eef 0%, #8dd0f5 100%)';

    const data = await getWeatherData(city);
    const dados = await getUnsplashPhoto(city);

    if (data && dados) {
        cityElement.innerHTML = data.name;
        tempElement.innerHTML = parseInt(data.main.temp);
        descElement.innerHTML = data.weather[0].description;
        weatherIconElement.setAttribute('src', `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
        countryElement.setAttribute('src', `https://flagsapi.com/${data.sys.country}/flat/64.png`);
        humidityElement.innerHTML = `${data.main.humidity}%`;
        windElement.innerHTML = `${data.wind.speed}km/h`;
        cityInput.value = '';

        const urlImagem = dados.results[0].urls.full;
        const img = new Image();
        img.src = urlImagem;

        img.onload = function () {
            fundoImg.style.background = `url(${urlImagem})`;
            fundoImg.style.backgroundSize = 'cover';
            fundoImg.style.backgroundPosition = 'center';
            fundoImg.style.backgroundRepeat = 'no-repeat';
            weatherContainer.classList.remove('hide');
            form.classList.remove('hide');
            loader.classList.add('hide');
            div.classList.remove('hide');
        }
    } else {
        alert('Nenhuma cidade encontrada :(');
        cityInput.value = '';
        form.classList.remove('hide');
        loader.classList.add('hide');
        div.classList.remove('hide');
    }
}

searchBtn.addEventListener('click', (event) => {
    event.preventDefault();
    const city = cityInput.value;
    showWeatherData(city);
});

cityInput.addEventListener('keyup', (event) => {
    if (event.code === 'Enter') {
        const city = event.target.value;
        showWeatherData(city);
    }
});

loader.classList.add('hide');