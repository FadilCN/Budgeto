import React from "react";
import { TrendingUp, TrendingDown, CreditCard } from "lucide-react";
import { PieChart, Pie, Cell } from "recharts";

function DebitCoverageRatio({ profit = 0, creditObligation = 1, preProfit = 0, preCreditObligation = 1 }) {
    const ratio = creditObligation ? (profit / creditObligation)  : 0;
    const preRatio = preCreditObligation ? (preProfit / preCreditObligation) : 0;

    const diff = Math.abs(ratio - preRatio);
    const key = ratio < preRatio ? 1 : 0;
    const percentage = Math.round(ratio);

    const data = [
        { name: "Filled", value: percentage },
        { name: "Remaining", value: Math.max(100 - percentage, 0) },
    ];

    const COLORS = [key === 1 ? "#C53030" : "#4CAF50", "#E0E0E0"];

    return (
        <div className="rounded-md h-[175px] min-w-[350px] border border-gray-200 bg-white p-4 hover:scale-101 transition-transform duration-100">
            <div className="grid grid-cols-2 gap-4 h-full">
                {/* Left */}
                <div className="flex flex-col justify-between">
                    <div className="flex flex-row pb-1 gap-2">
                        <CreditCard className="w-6 h-6 text-blue-500" />
                        <div className="text-[16px] font-medium text-gray-800">
                            Debit Coverage Ratio
                        </div>
                    </div>

                    <div className="mb-1">
                        <div className="text-xl text-gray-800 mb-3 font-bold">
                            {ratio.toFixed(1)}%
                        </div>

                        <div className="mb-1 text-xs text-gray-900 flex flex-cols">
                            <div
                                className={`pl-3 pr-3 ${
                                    key === 1 ? "bg-red-300" : "bg-green-300"
                                } rounded-2xl flex flex-rows gap-1`}
                            >
                                {key === 1 ? (
                                    <TrendingDown className="h-4 w-4 text-red-500" />
                                ) : (
                                    <TrendingUp className="h-4 w-4 text-green-500" />
                                )}
                                <span className={`${key === 1 ? "text-red-700" : "text-green-700"} font-medium`}>
                                    {percentage}%
                                </span>
                            </div>
                            <div className={"flex-1  whitespace-nowrap "} >&nbsp;vs Last month</div>
                        </div>

                        <div className="text-xs font-semibold text-gray-600 pb-1">
                            {key === 1 ? "Less by" : "More by"}{" "}
                            <span className={`${key === 1 ? "text-red-700" : "text-green-700"}`}>
                                {diff.toFixed(1)}%
                            </span>{" "}
                            than last month
                        </div>
                    </div>
                </div>

                <div className="flex justify-center items-center relative">
                    <PieChart width={120} height={120}>
                        <Pie
                            data={data}
                            innerRadius={40}
                            outerRadius={55}
                            startAngle={90}
                            endAngle={-270}
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index]} />
                            ))}
                        </Pie>
                        <text
                            x={60}
                            y={60}
                            textAnchor="middle"
                            dominantBaseline="middle"
                            fontSize={18}
                            fontWeight="bold"
                            fill={key === 1 ? "#C53030" : "#2F855A"}
                        >
                            {percentage}%
                        </text>
                    </PieChart>
                </div>
            </div>
        </div>
    );
}

export default DebitCoverageRatio;
