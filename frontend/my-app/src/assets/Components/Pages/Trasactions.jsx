import React, { useEffect, useState, useMemo } from 'react';
import Card from "../Props/Card.jsx";
import TranTable from "../Props/TranTable.jsx";
import { ChartColumnBig, CircleDollarSign, ShoppingCart, PiggyBank, CreditCard } from "lucide-react";
import axios from "axios";
import Form from "../Props/Form.jsx";
import {getValues} from "../Props/Store.jsx";

const MemoCard = React.memo(Card);
const MemoTranTable = React.memo(TranTable);

function Trasactions() {
    const [transactions, setTransactions] = useState([]);
    const [data, setData] = useState(null);
    const [predata, setPreData] = useState(null);
    const [graph, setGraph] = useState(null);

    const id = getValues()

    const [form, setForm] = useState({
        amount: "",
        description: "",
        date: "",
        type: "",
        business: {id}
    });

    const fetchData = () => {


        axios.get(`http://localhost:8080/expense/summary?shopId=${id}&year=2025&month=7`)
            .then(res => setData(res.data))
            .catch(console.error);

        axios.get(`http://localhost:8080/expense/summary?shopId=${id}&year=2025&month=6`)
            .then(res => setPreData(res.data))
            .catch(console.error);

        axios.get(`http://localhost:8080/expense/summary?shopId=${id}&year=2025`)
            .then(res => setGraph(res.data))
            .catch(console.error);

        axios.get(`http://localhost:8080/expense/${id}`)
            .then(res => setTransactions(res.data))
            .catch(console.error);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8080/expense", form) // send form directly
            .then(() => {
                fetchData(); // refresh table after success
                setForm({ amount: "", description: "", date: "", type: "", business: { id: 1 } }); // clear form
            })
            .catch(console.error);
    };


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

    const profitdata = useMemo(() => graph ? graph.slice(0, 5).map(item => ({ value: item.sales - item.expense })) : [{ value: 0 }], [graph]);
    const savingsdata = useMemo(() => graph ? graph.slice(0, 5).map(item => ({ value: item.savings })) : [{ value: 0 }], [graph]);
    const creditdata = useMemo(() => graph ? graph.slice(0, 5).map(item => ({ value: item.credit })) : [{ value: 0 }], [graph]);
    const expensedata = useMemo(() => graph ? graph.slice(0, 5).map(item => ({ value: item.expense })) : [{ value: 0 }], [graph]);
    const creditTransactions = useMemo(
        () => transactions.filter(data => data.type === "credit"),
        [transactions]
    );

    return (
        <div className="p-4 h-225">
            <div className="grid grid-rows-[20%_15%_65%] h-full gap-4">

                {/* 🔹 Cards */}
                <div className="flex items-center justify-center">
                    <div className="grid grid-cols-4 gap-4">
                        <MemoCard icon={CircleDollarSign} category="Total Profit" amount={profit} preamount={preprofit} data={profitdata} />
                        <MemoCard icon={ShoppingCart} category="Total Expense" amount={expense} preamount={preexpense} data={expensedata} />
                        <MemoCard icon={PiggyBank} category="Total Savings" amount={savings} preamount={presavings} data={savingsdata} />
                        <MemoCard icon={CreditCard} category="Total Credits" amount={credit} preamount={precredit} data={creditdata} />
                    </div>
                </div>


                <Form form={form} setForm={setForm} handleSubmit={handleSubmit} />


                <div className="grid grid-cols-2 gap-4">
                    <div className="border border-gray-200 bg-white rounded-md p-4">
                        <div className="font-medium pb-4 text-gray-900 flex items-center gap-2">
                            <ChartColumnBig className="w-6 h-6 text-blue-500" />Recent Transactions
                        </div>
                        <div className="flex h-120"><MemoTranTable data={transactions} /></div>
                    </div>
                    <div className="border border-gray-200 bg-white rounded-md p-4">
                        <div className="font-medium pb-4 text-gray-900 flex items-center gap-2">
                            <ChartColumnBig className="w-6 h-6 text-blue-500" />Credit Transactions
                        </div>
                        <div className="flex h-120"><MemoTranTable data={creditTransactions} /></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Trasactions;
