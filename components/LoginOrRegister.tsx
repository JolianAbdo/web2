import React from 'react';
import Header from '../src/Header';

const SwitchScreen = ({ title, buttonText, btnName, alternateText, alternateActionText, handleButtonClick }) => {
    return (
        <div className="inset-0 mx-auto container bg-slate-100 dark:bg-slate-600 flex flex-col gap-8 rounded-2xl w-1/3 h-80 justify-center items-center p-12">
            <div className="flex flex-col items-center gap-2">
                <div className="font-bold text-black text-2xl">{title}</div>
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-black">Name</label>
                    <input type="text" id="name" name="name" className="mt-1 block w-80 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm h-8 mg-10 pl-2" />
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-black">Password</label>
                    <input type="password" id="password" name="password" className="mt-1 block w-80 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm h-8 pl-2" />
                </div>
                <button type="submit" className="w-64 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition">{buttonText}</button>
                <button
                    id="back-btn"
                    className="bg-slate-400 w-40 text-white p-1 rounded-lg hover:bg-slate-600"
                    onClick={handleButtonClick}
                >
                    Back
                </button>
                <div
                    id={btnName}
                    className="text-center text-blue-600 mt-0 cursor-pointer"
                    onClick={handleButtonClick}
                >
                    {alternateText} <span className="underline">{alternateActionText}</span>
                </div>
            </div>
        </div>
    );
};

export default SwitchScreen;
