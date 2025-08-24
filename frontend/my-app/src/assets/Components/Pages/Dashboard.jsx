import React, { useEffect, useState } from 'react';
import { ChartColumnBig, CircleDollarSign, ShoppingCart, PiggyBank, CreditCard } from "lucide-react";
import axios from 'axios';
import Card from "../Props/Card.jsx";
import Bars from "../Props/Bars.jsx";
import Pie from "../Props/Pie.jsx";
import TranTable from "../Props/TranTable.jsx";
import CreditUtilization from "../Props/AnalyticsProps/CreditUtilization.jsx";
import CreditDependency from "../Props/AnalyticsProps/CreditDependency.jsx";
import {setValue} from "../Props/Store.jsx";

function Dashboard(props) {
    const [data, setData] = useState(null);
    const [predata, setPreData] = useState(null);
    const [graph, setGraph] = useState(null);
    const [shopData, setShopData] = useState(null);
    const [transactions, setTransactions] = useState([]);
    const [shopId, setShopId] = useState(2);

    useEffect(() => {
        axios.get('http://localhost:8080/business')
            .then(res => setShopData(res.data))
            .catch(console.error);




    }, []);

    useEffect(() => {
        axios.get(`http://localhost:8080/expense/summary?shopId=${shopId}&year=2025&month=7`)
            .then(res => setData(res.data))
            .catch(console.error);

        axios.get(`http://localhost:8080/expense/summary?shopId=${shopId}&year=2025`)
            .then(res => setGraph(res.data))
            .catch(console.error);

        axios.get(`http://localhost:8080/expense/${shopId}`)
            .then(res => setTransactions(res.data))
            .catch(console.error);


        axios.get(`http://localhost:8080/expense/summary?shopId=${shopId}&year=2025&month=6`)
            .then(res => setPreData(res.data))
            .catch(console.error);


    }, [shopId]);

    const expense = data ? data[0].expense : 0;
    const preexpense = predata ? predata[0].expense : 0;
    const sales = data ? data[0].sales : 0;
    const presales = predata ? predata[0].sales : 0;
    const profit = sales - expense;
    const preprofit = presales - preexpense;
    const savings = data ? data[0].savings : 0;
    const presavings = predata ? predata[0].savings : 0;
    const credit = data ? data[0].credit : 0;
    const precredit = predata ? predata[0].credit : 0;

    const profitdata = graph ? graph.slice(0, 5).map(item => ({ value: item.sales - item.expense })) : [{ value: 0 }];
    const savingsdata = graph ? graph.slice(0, 5).map(item => ({ value: item.savings })) : [{ value: 0 }];
    const creditdata = graph ? graph.slice(0, 5).map(item => ({ value: item.credit })) : [{ value: 0 }];
    const expensedata = graph ? graph.slice(0, 5).map(item => ({ value: item.expense })) : [{ value: 0 }];

    const shopList = shopData && shopData.length > 0 ? shopData.map(shop => (
        <div
            key={shop.id}
            className={`cursor-pointer justify-center inline-flex min-w-[5rem] text-gray-900 text-center border font-normal text-xs rounded-md p-2 items-center
            ${shopId === shop.id ? 'bg-blue-500 text-white border-blue-500' : 'bg-white border-gray-300 hover:bg-blue-100'}`}
            onClick={() => {setShopId(shop.id); setValue(shop.id)}}
        >
            {shop.name}
        </div>
    )) : <div className="text-gray-500">No shops available</div>;

    return (
        <>
            <div className="m-5 flex felx-row gap-2 justify-between">
                <div className="flex flex-row gap-2">
                    {shopList}

                </div>
                <div className="bg-blue-500 inline-flex min-w-5 text-white font-normal text-xs rounded-md p-2 items-center"> Add Business + </div>
            </div>

            <div className="grid grid-cols-4 gap-3 mb-5 ml-5 mt-2 mr-5">
                <Card icon={CircleDollarSign} category="Total Profit" amount={profit} preamount={preprofit} data={profitdata} />
                <Card icon={ShoppingCart} category="Total Expense" amount={expense} preamount={preexpense} data={expensedata} />
                <Card icon={PiggyBank} category="Total Savings" amount={savings} preamount={presavings} data={savingsdata} />
                <Card icon={CreditCard} category="Total Credits" amount={credit} preamount={precredit} data={creditdata} />
            </div>

            <div className="grid grid-cols-[3fr_1fr] gap-4 pl-4 pr-4 pb-4 h-80">
                <div className="rounded-md border border-gray-200 bg-white hover:scale-101 transition-transform duration-100 flex flex-col">
                    <div className="pl-5 font-medium p-4 text-gray-900 flex flex-row gap-2">
                        <ChartColumnBig className="w-6 h-6 text-blue-500" />Money Flow
                    </div>
                    <Bars data={graph} />
                </div>
                <div className="rounded-md border border-gray-200 bg-white hover:scale-101 transition-transform duration-100">
                    <div className="flex flex-row gap-2 pl-5 font-medium pt-4 pb-6 text-gray-900">
                        <ChartColumnBig className="w-6 h-6 text-blue-500" />Budget Spending
                    </div>
                    <Pie data={data} />
                </div>
            </div>

            <div className="grid grid-cols-[1fr_2fr] gap-4 pl-4 pr-4 h-80">
                <div className="flex flex-col gap-4 h-80">
                    <CreditUtilization used={4500} limit={10000} preUsed={4000} preLimit={10000} />
                    <CreditDependency credits={credit} income={sales} precredits={precredit} preincome={presales} />
                </div>

                <div className="rounded-md h-80 border border-gray-200 bg-white pl-4 pr-4 pb-1 pt-1 hover:scale-101 transition-transform duration-100">
                    <div className="flex flex-col h-full">
                        <div className="font-medium pt-4 pb-4 text-gray-900 flex flex-row gap-2">
                            <ChartColumnBig className="w-6 h-6 text-blue-500" />Recent Transactions
                        </div>
                        <TranTable data={transactions} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Dashboard;
