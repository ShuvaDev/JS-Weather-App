const condition = document.getElementById('condition')
const city = document.getElementById('city')
const country = document.getElementById('country')
const mainText = document.getElementById('main')
const description = document.getElementById('description')
const temp = document.getElementById('temp')
const pressure = document.getElementById('pressure')
const humidity = document.getElementById('humidity')

const cityInput = document.getElementById('city-input')
const historyElm = document.getElementById('history')
const masterHistory = document.getElementById('master-history')

const API_KEY = 'b00999df5971e744832010cb5d006a14'
const BASE_URL = `https://api.openweathermap.org/data/2.5/weather?&appid=${API_KEY}`
const ICON_URL = `http://openweathermap.org/img/wn/`
const DEFAULT_CITY = 'chittagong,bd'

window.onload = function () {
    // Handle location
    navigator.geolocation.getCurrentPosition(s => {
        getWeatherData(null, s.coords)
    }, () => {
        getWeatherData()
    })

    // Get History
    axios.get('/api/history')
    .then(({data}) => {
        if(data.length > 0) {
            updateHistory(data)
        } else {
            historyElm.innerHTML = 'There is No History'
        }
    }) 
    .catch((e) => {
        console.log(e)
        alert('Get Error Occured')       
    })

    // Handle Search
    cityInput.addEventListener('keypress', (e) => {
        if(e.key === 'Enter') {
            if(e.target.value) {
                getWeatherData(e.target.value, null,  (weather) => {
                    e.target.value = ''
                    axios.post('/api/history', weather)
                        .then(({data}) => updateHistory(data))
                        .catch(err => {
                            console.log(err)
                            alert('Error Occurred')
                        })
                    
                })
            } else {
                alert('Please enter your city name')
            }
        }
    })
}

function updateHistory(history) {
    historyElm.innerHTML = ''
    history = history.reverse()

    history.forEach(h => {
        let tempHistory = masterHistory.cloneNode(true)
        tempHistory.id = ''

        tempHistory.getElementsByClassName('condition')[0].src = `${ICON_URL}${h.icon}.png`
        tempHistory.getElementsByClassName('city')[0].innerHTML = h.name
        tempHistory.getElementsByClassName('country')[0].innerHTML = h.country
        tempHistory.getElementsByClassName('main')[0].innerHTML = h.main
        tempHistory.getElementsByClassName('description')[0].innerHTML = h.description
        tempHistory.getElementsByClassName('temp')[0].innerHTML = h.description
        tempHistory.getElementsByClassName('pressure')[0].innerHTML = h.pressure
        tempHistory.getElementsByClassName('humidity')[0].innerHTML = h.humidity

        historyElm.appendChild(tempHistory)
    })
}

function getWeatherData(city=DEFAULT_CITY, coords, cb) {
    let url = BASE_URL
    city ? 
        url = `${url}&q=${city}` :
        url = `${url}&lat=${coords.latitude}&lon=${coords.longitude}` 
        
    axios.get(url)
    .then(({data}) => {
        let weather = {
            icon: data.weather[0].icon,
            name: data.name,
            country: data.sys.country,
            main: data.weather[0].main,
            description: data.weather[0].description,
            temp: data.main.temp,
            pressure: data.main.pressure,
            humidity: data.main.humidity
        }
        if(cb) cb(weather)
        setWeather(weather)
    })
    .catch(err => {
        console.log(err)
        alert('City Not Found!')
    })
}

function setWeather(weather) {
    condition.src = `${ICON_URL}${weather.icon}.png`
    city.innerText = weather.name
    country.innerText = weather.country
    mainText.innerText = weather.main
    description.innerText = weather.description
    temp.innerText = weather.temp
    pressure.innerText = weather.pressure
    humidity.innerText = weather.humidity
}