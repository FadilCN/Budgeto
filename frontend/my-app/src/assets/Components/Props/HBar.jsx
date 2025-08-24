import React from "react";
import { CircleDollarSign, TrendingUp, TrendingDown } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

function HBar(props) {
    // Calculate if current runway is less than previous
    const key = props.amount < props.preamount ? 1 : 0;
    const diff = Math.abs(props.amount - props.preamount).toFixed(2); // months difference
    const percent = props.preamount ? Math.round((diff / props.preamount) * 100) : 0;

    return (
        <div className="rounded-md h-[175px] min-w-[350px] border border-gray-200 bg-white p-3 hover:scale-101 transition-transform duration-100">
            <div className="grid grid-cols-2 gap-2 h-full">
                {/* Left side info */}
                <div className="flex flex-col justify-between">
                    <div className="flex flex-row pb-1 gap-1.5 items-center">
                        <CircleDollarSign className="w-5 h-5 text-blue-500" />
                        <div className="text-sm font-medium text-gray-800">Cash Runway</div>
                    </div>

                    <div className="mb-1">
                        <div className="text-lg text-gray-800 mb-2 font-bold">{props.amount.toFixed(2)} months</div>

                        <div className="mb-1 text-xs text-gray-900 flex flex-cols items-center gap-1">
                            <div
                                className={`pl-2 pr-2 h-5 ${
                                    key === 1 ? "bg-red-300" : "bg-green-300"
                                } rounded-2xl flex flex-row items-center gap-1`}
                            >
                                {key === 1 ? (
                                    <TrendingDown className="h-4 w-4 text-red-500" />
                                ) : (
                                    <TrendingUp className="h-4 w-4 text-green-500" />
                                )}
                                <span className={`${key === 1 ? "text-red-700" : "text-green-700"} font-medium text-xs`}>
                                    {percent}%
                                </span>
                            </div>
                            <div className="flex-1 whitespace-nowrap text-xs">&nbsp;vs Last month</div>
                        </div>

                        <div className="text-xs font-semibold text-gray-600">
                            {key === 1 ? "Less by" : "More by"} <span
                            className={`${key === 1 ? "text-red-700" : "text-green-700"} text-xs`}
                        >
                                {diff} months
                            </span>{" "}
                            than last month
                        </div>
                    </div>
                </div>

                {/* Right side horizontal bar chart */}
                <div className="h-36 w-full flex items-center rounded-md p-2">
                    <ResponsiveContainer height={150}>
                        <BarChart
                            data={props.data}
                            layout="vertical"
                            margin={{ top: 10, right: 0, left: -60, bottom: -10 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis type="number" tick={{ fontSize: 10 }} />
                            <YAxis type="category" dataKey="name" tick={{ fontSize: 10 }} />
                            <Tooltip wrapperStyle={{ fontSize: '10px' }} />
                            <Bar dataKey="value" fill="#1E3A8A" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}

export default HBar;
