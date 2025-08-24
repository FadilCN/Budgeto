import React,{useState} from 'react';
import {
    LayoutDashboard,
    CreditCard,
    BarChart3,
    FileText,
    User,
    Settings,
    Wallet,
    HelpCircle,
    Mail,
    MessageCircle,
    Search
} from "lucide-react";

import { Link } from "react-router-dom";

import logo from '../Icons/logo.svg'


function Nav(props) {
    const[activeTab, setActiveTab] = useState(1);

    return (

            <div className="h-screen flex-col bg-gray-100 pl-5 pr-5 pt-7">
                <div className="flex items-center font-semibold text-xl mb-5 gap-2">
                    <img src={logo} alt="Logo" className="w-6 h-6" />
                    Budgeto
                </div>

                <div className="relative w-full mb-10">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Search size={16} className="text-gray-500" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search"
                        className="w-full pl-9 pr-3 py-2 rounded-md bg-gray-200 text-xs h-9
             focus:outline-none focus:ring-0 focus:border-transparent border-gray-100"
                    />
                </div>
                <div className="flex flex-col gap-5">

                    <div className="flex flex-col gap-1 text-sm">
                        <div className>Menu</div>
                        <Link
                            to="/"
                            onClick={() => setActiveTab(1)}
                            className={`pl-5 mt-1 flex flex-row items-center ${
                                activeTab === 1 ? "bg-blue-500 text-white" : "hover:bg-gray-200 hover:text-blue-600 bg-none text-black"
                            } gap-2  p-2 rounded-md `}
                        >
                            <LayoutDashboard size={16} /> Dashboard
                        </Link>

                        <Link
                            to="/transactions"
                            onClick={() => setActiveTab(2)}
                            className={`pl-5 flex flex-row items-center gap-2 p-2 rounded-md ${
                                activeTab === 2 ? "bg-blue-500 text-white" : " hover:bg-gray-200 hover:text-blue-600  bg-none text-black"
                            }`}
                        >
                            <CreditCard size={16} /> Transactions
                        </Link>

                        <Link
                            to="/analytics"
                            onClick={() => setActiveTab(3)}
                            className={`pl-5 flex flex-row items-center gap-2  p-2 rounded-md  ${
                                activeTab === 3 ? "bg-blue-500 text-white" : " hover:bg-gray-200 hover:text-blue-600 bg-none text-black"
                            }`}
                        >
                            <BarChart3 size={16} /> Analytics
                        </Link>

                        <div className="pl-5 flex flex-row items-center gap-2  hover:bg-gray-200 p-2 rounded-md hover:text-blue-600">
                            <FileText size={16} /> Reports
                        </div>
                    </div>

                    <div className="flex flex-col gap-1 text-sm">
                        <div className>Account</div>
                        <div className="pl-5 mt-1 flex flex-row items-center gap-2  hover:bg-gray-200 p-2 rounded-md hover:text-blue-600 ">
                            <User size={16} /> Profile
                        </div>
                        <div className="pl-5 flex flex-row items-center gap-2  hover:bg-gray-200 p-2 rounded-md hover:text-blue-600">
                            <Settings size={16} /> Settings
                        </div>
                        <div className="pl-5 flex flex-row items-center gap-2  hover:bg-gray-200 p-2 rounded-md hover:text-blue-600">
                            <Wallet size={16} /> Billing
                        </div>
                    </div>

                    <div className="flex flex-col gap-1 text-sm">
                        <div className>Support</div>
                        <div className="pl-5 mt-1 flex flex-row items-center gap-2  hover:bg-gray-200 p-2 rounded-md hover:text-blue-600">
                            <HelpCircle size={16} /> Help Center
                        </div>
                        <div className="pl-5 flex flex-row items-center gap-2 hover:bg-gray-200 p-2 rounded-md hover:text-blue-600  " >
                            <Mail size={16} /> Contact Us
                        </div>
                        <div className="pl-5 flex flex-row items-center gap-2 hover:bg-gray-200 p-2 rounded-md hover:text-blue-600">
                            <MessageCircle size={16} /> FAQ
                        </div>
                    </div>

                </div>
            </div> );

}

export default Nav;