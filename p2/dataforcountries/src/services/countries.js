import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'
const weatherUrl= 'http://api.openweathermap.org/data/2.5/weather?q='

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => {
        const countries = response.data.map(country => {
            const name = country.name.common
            const capital = country.capital === undefined
                ? ''
                : country.capital[0]
            const area = country.area
            const languages = 
                country.languages === undefined
                ? []
                : Object.keys(country.languages).map(index => country.languages[index]) 
            const flags = country.flags
            return ({ name , capital, area, languages, flags })
        })
        return countries
    })
}

const getWeather = city => {
    console.log('getWeather')
    const req = axios.get(`${weatherUrl}${city}&appid=${process.env.REACT_APP_API_KEY}&units=metric`)
    return req.then(res => {
        const temp = res.data.main.temp
        const icon = `https://openweathermap.org/img/wn/${res.data.weather[0].icon}@2x.png`
        const wind = res.data.wind.speed
        console.log('temp', temp)
        console.log('icon', icon)
        console.log('wind', wind)
        return ({ temp, icon, wind })})
}

// eslint-disable-next-line
export default { getAll, getWeather }