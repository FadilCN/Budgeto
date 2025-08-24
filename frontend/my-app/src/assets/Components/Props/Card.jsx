
import React from 'react';
import UpIcon from '../Icons/trending_down.svg';
import Sales from '../Icons/sales.png';


import { CircleDollarSign ,TrendingUp , TrendingDown} from "lucide-react";

import { LineChart, Line, ResponsiveContainer  ,XAxis,YAxis} from "recharts";





function Card(props) {


    let key= props.amount<props.preamount ? 1 : 0

    let diff = Math.abs(props.amount - props.preamount);

    let percent = Math.round((diff / props.preamount) * 100);

    const { icon: Icon } = props;

    return (
        <div className=" rounded-md  h-[175px] min-w-[350px] border border-gray-200  bg-white p-4 hover:scale-101 transition-transform duration-100 " >
            <div className="grid grid-cols-2 gap-4 h-full">

                <div className="flex flex-col justify-between">
                    <div className="flex flex-row  pb-1  gap-2">
                        <div>    <Icon  className="w-6 h-6 text-blue-500" /> </div>
                        <div className={`text-[16px] font-medium  text-gray-800`}>{props.category}
                        </div>
                    </div>
                    <div className="mb-1">
                        <div className="text-xl text-gray-800 mb-3 font-bold">${props.amount.toLocaleString()}</div>

                            <div className="mb-1 text-xs text-gray-900 flex flex-cols">
                                <div className={`pl-3 pr-3  ${
                                    key === 1 ? " bg-red-300" : "bg-green-300"
                                } rounded-2xl flex h-4 flex-rows gap-1`}>

                                    {key === 1 ? (
                                        <TrendingDown className="h-4 w-4 text-red-500" />
                                    ) : (
                                        <TrendingUp className="h-4 w-4 text-green-500" />
                                    )}

                                <span
                                    className={`${
                                    key === 1 ? "text-red-700" : "text-green-700"
                                }  font-medium`}>{percent}%</span></div>
                                <div className={"flex-1  whitespace-nowrap "}>&nbsp;vs Last month</div>
                            </div>
                            <div className="text-xs font-semibold text-gray-600 pb-1">{key===1? "Less by" : "More by" } <span
                                className={`${
                                    key === 1 ? "text-red-700" : "text-green-700"
                                }  `}>${diff.toLocaleString()}</span> than last month
                            </div>


                    </div>
                </div>
                <div className="h-38 w-full flex align-middle  rounded-md p-3 ">
                    <ResponsiveContainer height={150}>
                        <LineChart
                            data={props.data}
                            margin={{ top: 10, right: 5, left: 5, bottom: 5 }} // smaller margins
                        >
                            <XAxis dataKey="value" tick={false} axisLine={false} hide />


                            <YAxis
                                domain={[0, (dataMax) => dataMax * 1.2]} // 20% padding above lin
                                width={20}
                                hide// shrink Y-axis width
                                axisLine={false}                         // hide axis line
                                tickLine={false}                         // hide small tick marks
                            />
                            <Line
                                type="monotone"
                                dataKey="value"
                                stroke="#1E3A8A"
                                strokeWidth={2}
                                dot={false}
                            />
                        </LineChart>
                    </ResponsiveContainer>

                </div>

            </div>
        </div>
    );
}



export default Card;