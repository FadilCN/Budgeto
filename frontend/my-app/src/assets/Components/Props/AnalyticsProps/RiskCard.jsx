import React from 'react';
import { ShieldCheck, AlertCircle, AlertOctagon, Award } from "lucide-react";

function BusinessRiskCard({ sales, expense, savings, credit, category = "Business Risk Score" }) {

    const calculateRiskScore = (sales, expense, savings, credit) => {
        if (!sales || sales === 0) return 0;

        const creditRatio = credit / sales;
        const savingsRatio = savings / expense;
        const profitMargin = (sales - expense) / sales;

        const creditScore = Math.max(0, Math.min(100, 100 - creditRatio * 100));
        const savingsScore = Math.max(0, Math.min(100, savingsRatio * 100));
        const profitScore = Math.max(0, Math.min(100, profitMargin * 100));

        return Math.round(0.4 * creditScore + 0.3 * savingsScore + 0.3 * profitScore);
    };

    const score = calculateRiskScore(sales, expense, savings, credit);

    let Icon, color, label, message;
    if (score >= 70) {
        Icon = ShieldCheck;
        color = "text-blue-500";
        label = "Low Risk";
        message = "Business is healthy";
    } else if (score >= 40) {
        Icon = AlertCircle;
        color = "text-yellow-500";
        label = "Medium Risk";
        message = "Monitor carefully";
    } else {
        Icon = AlertOctagon;
        color = "text-red-500";
        label = "High Risk";
        message = "Take action soon";
    }

    return (
        <div className="rounded-md h-[185px] min-w-[350px] border border-gray-200 bg-white p-4 hover:scale-101 transition-transform duration-100">
            <div className="grid grid-cols-2 gap-4 h-full">


                <div className="flex flex-col justify-between">
                    <div className="flex items-center gap-2">
                        <Award className="w-5 h-5 text-blue-500" />
                        <div className="text-[16px] font-medium text-gray-800">{category}</div>
                    </div>

                    <div className="mt-4">
                        <div className="text-xl text-gray-800 font-bold">{score}</div>
                        <div className={`text-sm font-semibold ${color}`}>{label}</div>
                        <div className="text-xs text-gray-500 mt-1">{message}</div>
                    </div>
                </div>

                {/* Right side icon */}
                <div className="flex justify-center items-center">
                    <Icon className={`w-20 h-20 ${color}`} />
                </div>
            </div>
        </div>
    );
}

export default BusinessRiskCard;
