import React, { useEffect, useState } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import axios from "axios";

function Bars(props) {


    const data_map = props.data ? props.data.map(item => ({
        month: `Month ${item.month}`,
        sales: item.sales,
        expense: item.expense,
    })) : [];

    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart
                width={500}
                height={300}
                data={data_map}
                margin={{ top: 5, right: 0, left: 0, bottom: 0 }}
            >
                <CartesianGrid vertical={false} stroke="#e0e0e0" />
                <XAxis dataKey="month" axisLine={false} tick={{ fontSize: 10 }} />
                <YAxis axisLine={false} tick={{ fontSize: 10 }} />
                <Tooltip />
                <Legend verticalAlign="top" align="right" wrapperStyle={{ fontSize: 10 }} />
                <Bar radius={[4, 4, 0, 0]} dataKey="sales" fill="#3b82f6" />
                <Bar radius={[4, 4, 0, 0]} dataKey="expense" fill="#1e40af" />
            </BarChart>
        </ResponsiveContainer>
    );
}

export default Bars;
