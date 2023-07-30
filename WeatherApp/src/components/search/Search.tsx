import { useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { IoLocationOutline } from "react-icons/io5";
import { url } from "../../api/api";
import { ILocationData } from "../../api/type";
import { IUser } from "../../App";
import Loader from "../loader/Loader";

type ISearchProps = {
    userLocationSet: React.Dispatch<React.SetStateAction<IUser | null>>;
}

function Search({ userLocationSet }: ISearchProps) {
    const [isSearch, setIsSearch] = useState<boolean>(false);
    const [locations, setLocations] = useState<ILocationData[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    let timer: number;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setLoading(true);
        
        if (timer) {
            clearTimeout(timer);
        }

        timer = setTimeout(async () => {
            if (value.length > 0) {
                setIsSearch(true);
                const req = await axios.get(url.geo(e.target.value));
                if (req.data) {
                    setLocations(req.data);
                    setLoading(false);
                }
            } else {
                setIsSearch(false);
                setLoading(false);
            }
        }, 500);
    };

    return (
        <div className={`search_view relative min-w-[400px] ${!isSearch ? "rounded-3xl" : "rounded-t-3xl"} bg-[#222]`}>
            <div className="search_wrapper relative overflow-hidden rounded-3xl before:absolute before:top-1/2">
                <div className="absolute inset-y-0 left-0 flex items-center pl-5 pointer-events-none">
                    <svg className="w-4 h-4 text-[#f2f2f2]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                </div>
                <input type="text" onChange={handleChange} className="block w-full p-4 pl-12 text-lg text-[#f2f2f2] outline-none bg-[#222] placeholder:font-medium" placeholder="Search city..." name="search" id="search" />
                {
                    loading ? <div className="absolute inset-y-0 right-0 flex items-center pr-5 pointer-events-none">
                        <Loader />
                    </div> : null
                }
            </div>
            {
                isSearch && <div className="absolute bg-[#222] w-full rounded-b-3xl border-t border-solid border-[#444]">
                    <ul className="pt-2 pb-4 flex flex-col gap-2">
                        {
                            locations ? locations.map((location) => (
                                <li key={uuidv4()} onClick={() => {
                                    userLocationSet((prev) => ({ ...prev, latitude: location.lat, longitude: location.lon }));
                                    setIsSearch(false);
                                }} className="flex gap-4 py-2 justify-start items-center cursor-pointer pl-4 pr-6 min-h-14 hover:bg-[#333] transition-colors">
                                    <span>
                                        <IoLocationOutline size={22} />
                                    </span>
                                    <div className="">
                                        <p className="text-lg font-medium">{location.name}</p>
                                        <p className="text-[#888]">{location.state || ""} {location.country}</p>
                                    </div>
                                </li>
                            )) : null
                        }
                    </ul>
                </div>
            }
        </div>
    )
}

export default Search;