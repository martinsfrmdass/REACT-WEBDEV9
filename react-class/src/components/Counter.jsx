import { useState } from "react";
import { IoIosAdd } from "react-icons/io";
import { FaMinus } from "react-icons/fa";
import { RiResetRightLine } from "react-icons/ri";

export default function Counter() {
    const [count, setCount] = useState(0)

    const handleIncrement = () => {
        setCount(count + 1)
    }

    const handleDecrement = () => {
        if(count > 0){
            setCount(count - 1)
        }
    }

    const reset = () => {
        setCount(0)
    }

    return(
        <div className="flex flex-col items-center justify-center">
           <h1 className="text-4xl font-bold mb-4">
            {count}
           </h1>

           <div className="flex gap-4 items-center justify-center">
            <button onClick={handleDecrement} className="px-4 py-2 rounded-lg">
                <FaMinus/>
            </button>

            <button onClick={handleIncrement} className="px-4 py-2 rounded-lg">
                <IoIosAdd/>
            </button>

            <button onClick={reset} className="px-4 py-2 rounded-lg">
                <RiResetRightLine/>
            </button>
           </div>
        </div>
    )
}