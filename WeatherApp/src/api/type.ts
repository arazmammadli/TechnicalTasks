export interface ICurrentWeather {
    coord: {
        lon: number,
        lat: number
    }
    weather: IWeatherItem[];
    main: {
        temp: number,
        feels_like: number,
        temp_min: number,
        temp_max: number,
        pressure: number,
        humidity: number,
        sea_level: number,
        grnd_level: number
    }
    visibility: number;
    wind: {
        speed: number,
        deg: number,
        gust: number
    }
    sys: {
        type: number,
        id: number,
        country: string,
        sunrise: number,
        sunset: number
    }
    dt: number;
    timezone: number;
}

export interface IForecast {
    dt:number;
    weather: IWeatherItem[];
    main: {
        temp: number;
        temp_min: number,
        temp_max: number,
    };
    city:{
        timezone:number;
    }
    dt_txt:string;
}

interface IWeatherItem {
    id: number,
    main: string,
    description: string,
    icon: string
}

export interface ILocationData {
    name: string;
    lat: number;
    lon: number;
    country: string;
    state: string
}
