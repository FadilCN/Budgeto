import React from 'react';
import {Calendar, ChevronDown} from "lucide-react";
import Avatar from "../Icons/avatar.jpg";

function NavTop(props) {
    return (
        <div className="bg-gray-100 text-xl font-medium  pt-1 pr-5 text-gray-900 flex flex-row justify-between items-center">

            <div className="flex flex-col"><div>Welcome back, Mohammed Fadil !</div> <div className="text-xs font-normal text-gray-600">Effortlessly manage your finance with real-time insights</div> </div>

            <div className="flex items-center gap-4">

                <div>
                </div>


                <div className="flex items-center gap-3 p-1">

                    <button className="  border border-gray-300  bg-white text-gray-900 font-normal text-sm rounded-md flex flex-row gap-3 p-2 items-center">
                        <Calendar className="h-4 w-4" />
                        Month
                        <ChevronDown className="h-4 w-4" />
                    </button>

                    <div >
                        <img className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center" src={Avatar} alt=""></img>
                    </div>


                    <div className="flex flex-col">
                        <div className="text-sm font-medium text-gray-900">Mohammed Fadil</div>
                        <div className="text-xs text-gray-500">mohammedfadilcb@gmail.com</div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default NavTop;