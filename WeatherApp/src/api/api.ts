export const BASE_URL = "https://api.openweathermap.org/data/2.5";
export const API_KEY = "333c205dabe381c7967c24deb0fabb63";

export const url = {
    currentWeather(lat:number, lon:number, unit:string) {
        return `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${unit}`
    },
    forecast(lat:number, lon:number, unit:string) {
        return `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${unit}`
    },
    reverseGeo(lat:number,lon:number) {
        return `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=5&appid=${API_KEY}`
    },
    geo(query:string) {
        return `http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${API_KEY}`
    }
}