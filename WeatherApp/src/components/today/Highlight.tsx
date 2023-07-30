import { ICurrentWeather } from "../../api/type";
import { getTime, mps_to_kmph } from "../../utils";

type IHighlightProps = {
    data: ICurrentWeather;
    openTab:number;
}

function Highlight({ data,openTab }: IHighlightProps) {
    return (
        <div className="bg-[linear-gradient(to_bottom,#1a1c20,#1c2128,#1e2731,#1e2d39,#1d3342)] max-h-[360px] rounded-3xl p-4">
            <div className="w-full mb-5">
                <h3 className='text-[#f2f2f2] font-medium'>Today's Highlight</h3>
            </div>
            <div className="grid grid-cols-3 gap-3">
                <div className="p-5 bg-[linear-gradient(to_left_bottom,#171b1d,#192124,#1b272b,#1c2d33,#1d333a)] rounded-2xl">
                    <div className="w-full mb-4">
                        <h3 className='font-medium'>Wind Speed</h3>
                    </div>
                    <div className="block">
                        <p className="text-2xl font-medium">{mps_to_kmph(data.wind.speed).toFixed(3)} <span className='text-[#999] text-base'>km/h</span></p>
                    </div>
                </div>
                <div className="p-5 bg-[linear-gradient(to_right,#171b1d,#192124,#1b272b,#1c2d33,#1d333a)] rounded-2xl">
                    <div className="w-full mb-4">
                        <h3 className='font-medium'>Pressure</h3>
                    </div>
                    <div className="flex flex-row justify-between items-end">
                        <div className="block">
                            <span className="text-3xl font-medium">{data.main.pressure}</span><span className="text-[#999] ml-1">hPa</span>
                        </div>
                        <div className="block">
                            <img src="/images/pressure.png" alt="Pressure" />
                        </div>
                    </div>
                </div>
                <div className="p-5 bg-[linear-gradient(to_right,#232a25,#212925,#202824,#1e2624,#1d2523)] rounded-2xl">
                    <div className="w-full mb-4">
                        <h3 className='font-medium'>Sunrise & Sunset</h3>
                    </div>
                    <div className="flex justify-between items-end">
                        <div className="block">
                            <h4 className='text-[#C29E2B] text-sm font-medium'>Sunrise</h4>
                            <span className='text-sm'>{getTime(data.sys.sunrise,data.timezone)}</span>
                        </div>
                        <div className="block">
                            <h4 className='text-[#C29E2B] text-sm font-medium'>Sunset</h4>
                            <span className='text-sm'>{getTime(data.sys.sunset,data.timezone)}</span>
                        </div>
                    </div>
                </div>
                <div className="p-5 bg-[#10181F] rounded-2xl">
                    <div className="w-full mb-4">
                        <h3 className='font-medium'>Humidity</h3>
                    </div>
                    <div className="flex flex-row justify-between items-end">
                        <div className="">
                            <span className="text-3xl font-medium">{data.main.humidity}</span><span className="text-[#999] ml-1">%</span>
                        </div>
                        <div className="">
                            <img src="/images/humidity.png" alt="Humidity" />
                        </div>
                    </div>
                </div>
                <div className="p-5 bg-[#10181F] rounded-2xl">
                    <div className="w-full mb-4">
                        <h3 className='font-medium'>Visibility</h3>
                    </div>
                    <div className="flex flex-row justify-between items-end">
                        <div className="block">
                            <span className="text-3xl font-medium">{data.visibility / 1000}</span><span className="text-[#999] ml-1">km</span>
                        </div>
                        <div className="block">
                            <img src="/images/eye.png" alt="Visibility" />
                        </div>
                    </div>
                </div>
                <div className="p-5 bg-[#10181F] rounded-2xl">
                    <div className="w-full mb-4">
                        <h3 className='font-medium'>Feels Like</h3>
                    </div>
                    <div className="flex flex-row justify-between items-end">
                        <div className="">
                            <p className="text-3xl">{Math.round(data.main.feels_like)}<sup>{openTab === 1 ? "°C" : "°F"}</sup></p>
                        </div>
                        <div className="">
                            <img src="/images/temperature.png" alt="Temperature" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Highlight;