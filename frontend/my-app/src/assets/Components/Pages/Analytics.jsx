import React, {useEffect, useState} from 'react';
import Card from "../Props/Card.jsx";
import {ChartColumnBig, DollarSign,
    TrendingUp,
    BarChart,
    PieChart,
    List,
    Clock,
    Shield,
    AlertCircle,
    CreditCard,
    CircleDollarSign,
    User,
    Activity} from "lucide-react";
import CardArea from "../Props/CardArea.jsx";
import CardBar from "../Props/CardBar.jsx";
import CardRing from "../Props/CardRing.jsx";
import HBar from "../Props/HBar.jsx";
import ExpenseBreakdown from "../Props/AnalyticsProps/ExpenseBreakdown.jsx";
import NetProfit from "../Props/AnalyticsProps/NetProfit.jsx";
import ProfitMargin from "../Props/AnalyticsProps/ProfitMargin.jsx";
import SavingsRatio from "../Props/AnalyticsProps/SavingsRatio.jsx";
import CreditDependency from "../Props/AnalyticsProps/CreditDependency.jsx";
import ExpenseRatio from "../Props/AnalyticsProps/ExpenseRatio.jsx";
import DebitCoverageRatio from "../Props/AnalyticsProps/DebitCoverageRatio.jsx";
import CreditUtilization  from "../Props/AnalyticsProps/CreditUtilization.jsx";
import {getValues} from "../Props/Store.jsx";
import axios from "axios";
import RiskCard from "../Props/AnalyticsProps/RiskCard.jsx";
import EmergencyFund from "../Props/AnalyticsProps/EmergencyFund.jsx";



function Analytics(props) {
    const [data, setData] = useState(null);
    const [predata, setPreData] = useState(null);
    const [graph, setGraph] = useState(null);




    useEffect(() => {

        const id = getValues();

        axios.get(`http://localhost:8080/expense/summary?shopId=${id}&year=2025&month=7`)
            .then(res => setData(res.data))
            .catch(console.error);

        axios.get(`http://localhost:8080/expense/summary?shopId=${id}&year=2025&month=6`)
            .then(res => setPreData(res.data))
            .catch(console.error);

        axios.get(`http://localhost:8080/expense/summary?shopId=${id}&year=2025`)
            .then(res => setGraph(res.data))
            .catch(console.error);

    }, []);



    const profitdata = graph
        ? graph.slice(0, 5).map((item) => ({
            value: (item.sales-item.expense)
        }))
        : [{ value: 0 }];

    const gdata = graph
        ? graph.slice(0, 5).map((item) => ({
            value: (item.credit)
        }))
        : [{ value: 0 }];

    const profittrend = graph
        ? graph.map(item => ({
            value: item.sales - item.expense
        }))
        : [];

    const expensetrend = graph
        ? graph.map(item => ({
            value: item.expense
        }))
        : [];

    const breakdown = data
        ? [
            { name: "Expense", value: data[0].expense },
            { name: "Savings", value: data[0].savings },
            { name: "Sales",   value: data[0].sales },
            { name: "Credit",  value: data[0].credit }
        ]
        : [];

    const runway = graph
        ? graph.slice(0, 3).map(item => ({
            name: " ",
            value: item.savings / item.expense
        }))
        : [];







    const expense =data? data[0].expense: 0;
    const preexpense =predata? predata[0].expense: 0;

    const sales = data ? data[0].sales:0;
    const presales = predata ? predata[0].sales:0;


    const profit=  sales-expense;
    const preprofit =presales- preexpense;

    const savings =data? data[0].savings: 0;
    const presavings =predata? predata[0].savings: 0;

    const credit =data? data[0].credit: 0;
    const precredit =predata? predata[0].credit: 0;

    const monthavg= graph? graph.slice(0,3).map(item => (item.expense)).reduce((a, b) => a + b, 0) / 3 : 0;
    const premonthavg= graph? graph.slice(1,3).map(item => (item.expense)).reduce((a, b) => a + b, 0) / 3 : 0;

    const fund = graph ? graph.slice(0, 5).map(item => ({value: item.savings / monthavg })) : [];






    return (
        <div className=" p-4 h-225">
            <div className="grid grid-rows-4 h-full gap-4">

                <div className=" flex flex-col ">
                   < div className="pb-2 text- text-gray-700 flex flex-row gap-2">
                       <div >Trends</div>
                </div>

                    <div className="grid w-full gap-4  grid-cols-2">

                        <CardArea
                            category="Profit Trend"
                            amount={profit}
                            preamount={preprofit}
                            data={profittrend}

                        />

                        <CardBar
                            category="Expense Growth Rate"
                            amount={expense}
                            preamount={preexpense}
                            data={expensetrend}
                        />


                    </div>

                </div>


                <div className=" flex flex-col ">
                    <div className="grid grid-cols-2 w-full gap-4">

                        {/* Left Column */}
                        <div className="flex flex-col ">
                            < div className="pb-2 text- text-gray-700 flex flex-row gap-2">
                                <div >Profitability</div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <Card
                                    icon={CircleDollarSign}
                                    category="Net Profit"
                                    amount={profit}
                                    preamount={preprofit}
                                    data={profitdata}
                                />
                                <ProfitMargin
                                    profit={profit}
                                    income={sales}
                                    preprofit={preprofit}
                                    preincome={sales}
                                />



                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="flex flex-col ">
                            < div className="pb-2 text- text-gray-700 flex flex-row gap-2">
                                <div >Expense Management</div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <ExpenseBreakdown
                                    data={breakdown}
                                />

                                <ExpenseRatio
                                    expense={expense}
                                    income={sales}
                                    preexpense={preexpense}
                                    preincome={presales}
                                />

                            </div>
                        </div>

                    </div>

                </div>
                <div className=" flex flex-col ">
                    < div className="pb-2 text- text-gray-700 flex flex-row gap-2">
                        Liquidity & Savings
                    </div>
                    <div className="grid w-full gap-4  grid-cols-3">

                        <HBar
                            category="Cash Runway"
                            amount={savings/expense}
                            preamount={presavings/ preexpense}
                            data={runway}

                        />

                        <SavingsRatio

                            income={sales}
                            savings={savings}
                            preincome={presales}
                            presavings={presavings}
                        />
                        <EmergencyFund
                            icon={AlertCircle}
                            category="Emergency Fund Adequacy"
                            amount={savings / monthavg}         // ratio
                            preamount={presavings / premonthavg} // ratio
                            monthavg={monthavg}                 // base value to convert back
                            premonthavg={premonthavg}           // base value to convert back
                            data={fund}
                        />



                    </div>
                    </div>

                    <div className="grid w-full gap-4  grid-cols-[75%_25%]">

                        <div className=" flex flex-col ">
                            < div className="pb-2 text- text-gray-700 flex flex-row gap-2">
                                Debit & Credit Impact
                            </div>
                        <div className="grid w-full gap-4  grid-cols-3">
                            <DebitCoverageRatio
                                profit={profit}
                                creditObligation={15000}
                                preProfit={preprofit}
                                preCreditObligation={14000}
                            />

                            <CreditUtilization
                                used={4500}
                                limit={10000}
                                preUsed={4000}
                                preLimit={10000}
                            />

                            <CreditDependency
                                credits={credit}
                                income={sales}
                                precredits={precredit}
                                preincome={presales}
                            />

                        </div>
                        </div>
                        <div className=" flex flex-col ">
                            < div className="pb-2 text- text-gray-700 flex flex-row gap-2">
                                Overall
                            </div>
                        <div> <RiskCard
                            sales={sales}
                            expense={expense}
                            savings={savings}
                            credit={credit}
                            category="Credit Risk Score"
                        />

                            </div>
                            </div>

                    </div>
                </div>



                   </div>
    );
}

export default Analytics;