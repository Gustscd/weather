const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.detail');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

const updateUI = data => {

    // const cityDets = data.cityDets;
    // const weather = data.weather;

    const { cityDets, weather } = data;

    details.innerHTML = `
    <h5 class="my-3">${cityDets.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
    <span>${weather.Temperature.Metric.Value}</span>
    <span>&deg;c</span>
    </div>
    `;

    icon.src = `img/icons/${weather.WeatherIcon}.svg`

    if (weather.IsDayTime)
    {
        time.src = `img/day.svg`
    }
    else 
    {
        time.src = `img/night.svg`
    }

    card.classList.remove('d-none')

};

const updateCity = async city => {
    const cityDets = await getCity(city)
    const weather = await getWeather(cityDets.Key);

    return {cityDets, weather};

}

cityForm.addEventListener('submit', e => {
    e.preventDefault();

    const city = cityForm.city.value.trim();
    cityForm.reset();

    updateCity(city)
        .then(data => updateUI(data))
        .catch(err => console.log(err));
})