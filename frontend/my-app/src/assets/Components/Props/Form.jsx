// Form.jsx
import React from "react";
import { ChartColumnBig } from "lucide-react";

function Form({ form, setForm, handleSubmit }) {
    return (
        <div className=" flex flex-col  border border-gray-200 bg-white rounded-md pr-4 pt-2 pb-2 pl-4 ">
            <div className=" font-medium pt-3 pb-4 text-gray-900 flex flex-row gap-2">
                <ChartColumnBig className="w-6 h-6 text-blue-500" />Add Transactions
            </div>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-4 gap-4">
                    <input
                        type="number"
                        placeholder="Amount"
                        value={form.amount}
                        onChange={(e) => setForm({ ...form, amount: e.target.value })}
                        className="w-full bg-gray-100 border-0 text-xs h-10 text-gray-900 p-2 rounded-md focus:outline-none focus:ring-0 focus:bg-gray-200"
                    />
                    <input
                        type="text"
                        placeholder="Description"
                        value={form.description}
                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                        className="w-full bg-gray-100 border-0 text-xs h-10 text-gray-900 p-2 rounded-md focus:outline-none focus:ring-0 focus:bg-gray-200"
                    />
                    <input
                        type="text"
                        placeholder="Category"
                        value={form.type}
                        onChange={(e) => setForm({ ...form, type: e.target.value })}
                        className="w-full bg-gray-100 border-0 text-xs h-10 text-gray-900 p-2 rounded-md focus:outline-none focus:ring-0 focus:bg-gray-200"
                    />
                    <div className="flex flex-row  gap-4">
                        <input
                            type="text"
                            placeholder="Date"
                            value={form.date}
                            onChange={(e) => setForm({ ...form, date: e.target.value })}
                            className="w-full bg-gray-100 border-0 text-xs h-10 text-gray-900 p-2 rounded-md focus:outline-none focus:ring-0 focus:bg-gray-200"
                        />
                        <button
                            type="submit"
                            className=" text-center justify-center bg-blue-500 inline-flex h-10 min-w-10 text-white font-normal text-xl rounded-md  items-center"
                        >
                            +
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Form;
