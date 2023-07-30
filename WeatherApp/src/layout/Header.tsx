import {FC} from "react";
import Search from "../components/search/Search";
import { IUser } from "../App";

type IHeaderProp = {
    openTab:number
    openTabSet:React.Dispatch<React.SetStateAction<number>>;
    userLocationSet:React.Dispatch<React.SetStateAction<IUser | null>>
}

const Header:FC<IHeaderProp> = ({openTab,openTabSet,userLocationSet}) => {
    
    return (
        <header className="w-full">
            <div className="max-w-[1490px] mx-auto flex justify-between items-center p-4">
                <div className="">
                    <h1 className="text-2xl font-bold">Weather App</h1>
                </div>

                <Search userLocationSet={userLocationSet} />

                <div className="block">
                    <div className="flex flex-row gap-2">
                        <button type="button" onClick={() => openTabSet(1)} className={`${openTab === 1 ? "bg-[#111]" : "bg-[#444]"} w-12 h-12 rounded-[50%] text-lg font-semibold`}>C&deg;</button>
                        <button type="button" onClick={() => openTabSet(2)} className={`${openTab === 2 ? "bg-[#111]" : "bg-[#444]"} w-12 h-12 rounded-[50%] text-lg font-semibold`}>F&deg;</button>
                    </div>
                </div>
            </div>
        </header>
    )
};

export default Header;