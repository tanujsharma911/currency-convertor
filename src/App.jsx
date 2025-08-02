import { useEffect, useState } from "react"
import CurrInput from "./components/CurrInput.jsx"
import useCurrInfo from "./hooks/useCurrInfo.js"

export default function App() {
    let [amount, setAmount] = useState(0);
    let [from, setFrom] = useState("usd");
    let [to, setTo] = useState("inr");
    let [convertedAmt, setConvertedAmt] = useState(0);

    let currInfo = useCurrInfo(from);

    const options = currInfo && Object.keys(currInfo);

    const swap = () => {
        setFrom(to);
        setTo(from);
        setAmount(convertedAmt);
        setConvertedAmt(amount);
    }

    const convert = () => {
        if (!currInfo || !currInfo[to]) return;

        setConvertedAmt((convertedAmt) => amount * currInfo[to]);
        console.log(convertedAmt);

    };

    return (
        <div className="flex items-center flex-col justify-center w-screen h-screen bg-gray-200">
            <h1 className="text-2xl mb-10 font-bold">Currency Convertor by <a href="https://github.com/tanujsharma911" className="underline underline-offset-4">Tanuj</a></h1>
            <div className="flex flex-col gap-3 relative">
                <CurrInput
                    label="from"
                    amount={amount}
                    curr={from}
                    currOpt={options}
                    onCurrChange={(curr) => setFrom(curr)}
                    onAmtChange={(amt) => setAmount(amt)}
                />
                <button onClick={() => swap()} className="absolute top-1/2 left-1/2 -translate-1/2 bg-gray-800 px-3 py-2 text-white rounded-full cursor-pointer">Swap</button>
                <CurrInput
                    label="to"
                    amount={convertedAmt}
                    curr={to}
                    currOpt={options}
                    onCurrChange={(curr) => setTo(curr)}
                    onAmtChange={(amt) => setConvertedAmt(amt)}
                />
            </div>
            <button
                className="bg-sky-600 text-white rounded-lg py-3 px-5 mt-5 text-xl font-medium cursor-pointer hover:bg-sky-700 active:scale-[99%]"
                onClick={() => convert()}
            >Convert {from} to {to} </button>
        </div>
    )
}