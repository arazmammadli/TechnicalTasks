import axios from "axios";
import { IoLocationOutline } from "react-icons/io5";
import { FaCalendarAlt } from "react-icons/fa";
import { ICurrentWeather } from "../../api/type";
import { getDate } from "../../utils";
import { useEffect, useState } from "react";
import { url } from "../../api/api";

type ICurrentWeatherProps = {
    data: ICurrentWeather;
    openTab:number;
}

function CurrentWeather({ data,openTab }: ICurrentWeatherProps) {
    const [cityName,setCityName] = useState<string>("");

    const getCityName = async (lat:number,lon:number) => {
        const request = await axios.get(url.reverseGeo(lat,lon));
        const [{name,country}] = request.data;
        setCityName(`${name}, ${country}`)
    }

    useEffect(() => {
        if(data) {
            getCityName(data.coord.lat,data.coord.lon);
        }
    },[data])

    return (
        <div className="bg-[#1d1c1f] bg-[linear-gradient(to_right_bottom,#2a2c30,#2a2f36,#2a323c,#283542,#253948,#233847,#203746,#1e3645,#1d313d,#1c2b36,#1b262e,#192127)] rounded-3xl px-5 pb-5 pt-10">
            <div className="mb-3">
                <img src={`/images/weather_icons/${data.weather[0].icon}.png`} className='max-w-[100px] object-cover' alt="Rainy Weather" />
                <p className='text-[#f2f2f2] text-6xl leading-[1.1]'>{Math.round(data.main.temp)}<sup>{openTab === 1 ? "°C" : "°F"}</sup></p>
            </div>
            <p className='text-lg'>{data.weather[0].description}</p>
            <ul className='mt-4 pt-4 border-t border-solid border-gray-700'>
                <li className='flex items-center gap-2 mb-3'>
                    <span>
                        <IoLocationOutline />
                    </span>
                    <p>{cityName}</p>
                </li>
                <li className='flex items-center gap-2'>
                    <span>
                        <FaCalendarAlt />
                    </span>
                    <p>{getDate(data.dt, data.timezone)}</p>
                </li>
            </ul>
        </div>
    )
}

export default CurrentWeather;