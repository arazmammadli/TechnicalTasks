import React,{ useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { WEEK_DAYS } from "../../utils";
import { IUser } from "../../App";
import { IForecast } from "../../api/type";
import axios from "axios";
import { url } from "../../api/api";

type IForecastProps = {
    user: IUser | null;
    openTab:number;
}

function Forecast({ user,openTab }: IForecastProps) {
    const [data, setData] = useState<IForecast[]>([]);

    const getForecast = async () => {
        if (user) {
            try {
                const req = await axios.get(url.forecast(user.latitude, user.longitude, openTab === 1 ? "metric" : "imperial"));
                const res = req.data;
                setData(res.list);
            } catch (error) {
                console.log(error);
            }
        }
    };

    useEffect(() => {
        if (user) {
            getForecast();
        }
    }, [user,openTab]);

    return (
        <div className="bg-[#1d1c1f] bg-[linear-gradient(to_right_top,#26282c,#24282e,#22292f,#1f2931,#1c2a32)] rounded-3xl p-5">
            <ul>
                {
                    data ? data.splice(0, 7).map((d, index) => (
                        <li key={uuidv4()} className='flex flex-row justify-between items-center mb-4 last:mb-0'>
                            <div className="flex flex-row items-center gap-3">
                                <img src={`/images/weather_icons/${d.weather[0].icon}.png`} className='object-cover' width={36} height={36} alt="Overcast Cloud" />
                                <p className='min-w-[70px] text-lg font-medium'>{WEEK_DAYS[index]}</p>
                            </div>

                            <div className="">
                                <span className='text-xl font-semibold'>{Math.round(d.main.temp_max)}<sup>{openTab === 1 ? "°C" : "°F"}</sup> /</span> <span className='text-xl font-semibold text-[#808080]'>{Math.round(d.main.temp_min)}<sup>{openTab === 1 ? "°C" : "°F"}</sup></span>
                            </div>
                        </li>
                    )) : null
                }
            </ul>
        </div>
    )
}

const ForecastMemo = React.memo(Forecast);

export default ForecastMemo;