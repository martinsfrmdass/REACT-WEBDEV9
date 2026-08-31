
import { useState } from "react"
import { ToastContainer, toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { useUserStore } from "../store/userStore"
import { Loader } from "../components/loader"

export default function Login() {
    const navigate = useNavigate()
    const {login} = useUserStore()

    const [loading, setLoading] = useState(false)

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const handleChange = (event) => {
        const {name, value} = event.target
        setFormData((prev) => ({...prev, [name]: value}))
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        try{
        setLoading(true)
        const data = await login(formData)
        toast.success(data.message)
        navigate("/")
        }catch(err) {
            toast.error(err.message)
        }finally{
            setLoading(false)
        }
    }

    return(
<div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <ToastContainer/>
  <form onSubmit={handleSubmit} action="" method="POST" className="w-full h-full flex flex-col items-center gap-6 p-4 border border-gray-300 rounded-md">
    <div className="">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" value={formData.email} autoComplete="email" onChange={handleChange} className="w-full h-full border border-gray-300 rounded-md p-2" />
    </div>

    <div>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" value={formData.password} autoComplete="current-password" onChange={handleChange} className="w-full h-full border border-gray-300 rounded-md p-2" />
    </div>


    <div className="w-40">
        {loading ? <Loader/> :
    <button type="submit" className="bg-blue-500 text-white p-5 rounded-lg w-full">
        Login
    </button>
        }
    </div>

  </form>
</div>
    )
}