import { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { FaMinus } from "react-icons/fa6";
import { RiResetLeftLine } from "react-icons/ri";

export default function Counter(){
    const [count, setCount] = useState(0)

    const handleIncrement = () =>{
        setCount(count + 1)
    }

   const handleDecrement = () =>{
    if (count>0){
        setCount(count - 1)
    }
    }

    const reset = () => {
    setCount(0)
    }

    return(
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-4x1 font-bold mb-4">
            {count}
          </h1>
          <div className="flex gap-4 items-center justify center">

             <button onClick={handleDecrement} className="bg-red-500 text-white px-4 py-2 rounded-1g"><FaMinus/></button>

             <button onClick={handleIncrement} className="bg-green-500 text-white px-4 py-2 rounded-1g"><IoMdAdd/></button>

             <button onClick={reset} className="bg-blue-500 text-white px-4 py-2 rounded-1g"><RiResetLeftLine/></button>


          </div>
        </div>
    )
}