import React from "react";
import { PieChart, Pie, Cell } from "recharts";
import { PieChart as PieIcon } from "lucide-react";

function ExpenseBreakdown(props) {
    const { data: chartData, amount = 0, preamount = 0 } = props;

    const COLORS = ["#4CAF50", "#FFB74D", "#E57373", "#64B5F6", "#E0E0E0"];
    const total = preamount || amount;

    const data = chartData || [
        { name: "Used", value: amount },
        { name: "Remaining", value: Math.max(total - amount, 0) },
    ];

    return (
        <div className="rounded-md h-[175px] min-w-[350px] border border-gray-200 bg-white p-4 hover:scale-101 transition-transform duration-100">
            <div className="flex flex-col h-full">
                <div className="flex items-center gap-2 mb-2">
                    <PieIcon className="w-6 h-6 text-blue-500" />
                    <div className="text-[16px] font-medium text-gray-800">Expense Breakdown</div>
                </div>

                <div className="flex flex-1 items-center justify-center gap-6">
                    <PieChart width={120} height={120}>
                        <Pie
                            data={data}
                            innerRadius={35}
                            outerRadius={55}
                            startAngle={90}
                            endAngle={-270}
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                    </PieChart>

                    <div className="flex flex-col gap-2 text-xs text-gray-500">
                        {data.map((entry, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <div
                                    className="w-3 h-3 rounded-full"
                                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                                ></div>
                                <span>{entry.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ExpenseBreakdown;
