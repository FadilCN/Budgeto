import React from 'react';
import { CircleDollarSign, TrendingUp, TrendingDown , ChartBar} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

function CardBar(props) {
    let key = props.amount < props.preamount ? 1 : 0;
    let diff = Math.abs(props.amount - props.preamount);
    let percent = Math.round((diff / props.preamount) * 100);

    return (
        <div className="rounded-md h-[175px] min-w-[350px] border border-gray-200 bg-white p-4 hover:scale-101 transition-transform duration-100">
            <div className="grid grid-cols-[22%_78%] gap-4 h-full">
                <div className="flex flex-col justify-between">
                    <div className="flex flex-row pb-1 gap-2">
                        <div>
                            <ChartBar className="w-6 h-6 text-blue-500" />
                        </div>
                        <div className="flex-1 text-[16px] font-medium text-gray-800 whitespace-nowrap  ">
                            {props.category}
                        </div>
                    </div>

                    <div className="mb-1">
                        <div className="text-xl text-gray-800 mb-3 font-bold">${props.amount.toLocaleString()}</div>

                        <div className="mb-1 text-xs text-gray-900 flex flex-cols">
                            <div className={`pl-3 pr-3 h-4 ${key === 1 ? "bg-red-300" : "bg-green-300"} rounded-2xl flex flex-rows gap-1`}>
                                {key === 1 ? (
                                    <TrendingDown className="h-4 w-4 text-red-500" />
                                ) : (
                                    <TrendingUp className="h-4 w-4 text-green-500" />
                                )}
                                <span className={`${key === 1 ? "text-red-700" : "text-green-700"} font-medium`}>{percent}%</span>
                            </div>
                            <div className={"flex-1  whitespace-nowrap "} >&nbsp;vs Last month</div>
                        </div>

                        <div className="text-xs font-semibold text-gray-600 pb-1">
                            {key === 1 ? "Less by" : "More by"}{" "}
                            <span className={`${key === 1 ? "text-red-700" : "text-green-700"}`}>
                                ${diff.toLocaleString()}
                            </span>{" "}
                            than last month
                        </div>
                    </div>
                </div>

                <div className="h-38 w-full flex align-middle rounded-md p-3">
                    <ResponsiveContainer height={150}>
                        <BarChart
                            data={props.data}
                            margin={{ top: 0, right: 0, left: -30, bottom: 0 }}
                        >
                            <CartesianGrid stroke="#d1d5db" strokeDasharray="3 3" />
                            <XAxis  tick={{ fontSize: 10, fill: "#6b7280" }} axisLine={{ stroke: "#6b7280" }} />
                            <YAxis hidden tick={{ fontSize: 0, fill: "#6b7280" }} axisLine={{ stroke: "#6b7280" }} tickLine={{ stroke: "#6b7280" }} />
                            <Tooltip contentStyle={{ fontSize: "10px", color: "#6b7280", backgroundColor: "#f9fafb" }} />
                            <Bar dataKey="value" fill="#1E40AF" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}

export default CardBar;
