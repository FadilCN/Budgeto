import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import axios from "axios";

const COLORS = ["#1E3A8A", "#64748B", "#059669", "#D97706"];

export default function ProfessionalPieChart(prop) {


    const data_modify = prop.data
        ? [
            { name: "Credit", value: prop.data[0].credit },
            { name: "Expense", value: prop.data[0].expense },
            { name: "Sales", value: prop.data[0].sales },
            { name: "Savings", value: prop.data[0].savings },
        ]
        : [];

    return (
        <ResponsiveContainer width="100%" height="100%">
            <PieChart margin={{ top: -100 }}>
                <Pie
                    data={data_modify}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="value"
                    cornerRadius={5}
                >
                    {data_modify.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Legend
                    verticalAlign="middle"
                    align="right"
                    layout="vertical"
                    iconType="circle"
                    wrapperStyle={{
                        fontSize: 12,
                        color: "#94A3B8",
                        lineHeight: "40px",
                        transform: "translateY(-50px)",
                    }}
                />
                <Tooltip />
            </PieChart>
        </ResponsiveContainer>
    );
}