import React, {useEffect} from 'react';
import { Trash2 } from "lucide-react";


function TranTable({ data, onDelete }) {


    const handleDelete = (id) => {
        if (onDelete) onDelete(id); // delegate delete to parent
    };

    return (
        <div className="flex-1 overflow-y-auto">
            <table className="w-full text-center font-normal text-xs">
                <thead>
                <tr className="bg-blue-50 h-10 text-gray-500 font-medium rounded-md">
                    <td>Transaction ID</td>
                    <td>Amount</td>
                    <td>Description</td>
                    <td>Type</td>
                    <td>Date</td>
                    <td></td>
                </tr>
                </thead>
                <tbody>
                {data && data.map(tx => (
                    <tr key={tx.id} className="border-b border-gray-200">
                        <td className="p-3"> TX000{tx.id}</td>
                        <td>${tx.amount}</td>
                        <td>{tx.description}</td>
                        <td>
                                <span
                                    className={`
                                        inline-block w-15 text-center rounded-full text-[11px] font-medium border-[0.12px] py-0.5
                                        ${tx.type === "credit"   ? "bg-blue-200   text-blue-700   border-blue-600"   : ""}
                                        ${tx.type === "savings"  ? "bg-green-200  text-green-700  border-green-600"  : ""}
                                        ${tx.type === "sales"    ? "bg-purple-200 text-purple-700 border-purple-600" : ""}
                                        ${tx.type === "expense"  ? "bg-red-200  text-red-700    border-red-600"    : ""}
                                    `}
                                >
                                    {tx.type}
                                </span>
                        </td>
                        <td>{new Date(tx.date).toLocaleDateString()}</td>
                        <td>
                            <Trash2
                                height={15}
                                color={"#cd1c18"}
                                className={"cursor-pointer hover:scale-120 transition-transform"}
                                onClick={() => handleDelete(tx.id)}
                            />
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default TranTable;
