import React, { useState, useEffect } from "react"
import { IUser } from "../../App";
import { IForecast } from "../../api/type";
import axios from "axios";
import { url } from "../../api/api";
import { v4 as uuidv4 } from "uuid";
import { getMonth } from "../../utils";

type ITodayAtProp = {
    user: IUser | null;
    openTab:number;
}

function TodayAt({ user,openTab }: ITodayAtProp) {
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
    }, [user,openTab])

    return (
        <div className="bg-[linear-gradient(to_bottom,#1a1c20,#1c2128,#1e2731,#1e2d39,#1d3342)] flex flex-col justify-between rounded-3xl p-4">
            <div className="w-full">
                <h3 className='text-[#f2f2f2] text-lg font-medium'>Today at</h3>
            </div>
            <div className="grid grid-cols-7 gap-3">
                {
                    data ? data.splice(0, 7).map((d) => (
                        <div key={uuidv4()} className="bg-[#1B1B1D] p-4 rounded-3xl">
                            <div className="text-[#f2f2f2] text-center mb-3">
                                <span className="text-xl font-semibold">{getMonth(d.dt_txt)}</span>
                            </div>
                            <div className="flex flex-col items-center gap-4 py-6 border-t border-solid border-[#333]">
                                <div className="">
                                    <img src={`/images/weather_icons/${d.weather[0].icon}.png`} width={50} alt="Cloud" />
                                </div>
                                <p className="text-2xl font-semibold">{d.main.temp}<sup>{openTab === 1 ? "°C" : "°F"}</sup></p>
                            </div>
                        </div>
                    )) : null
                }
            </div>
        </div>
    )
}

const TodayAtMemo = React.memo(TodayAt);

export default TodayAtMemo;