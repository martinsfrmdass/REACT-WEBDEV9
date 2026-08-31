import { Link } from "react-router-dom";
import { useUserStore } from "../store/userStore";

export default function Navbar() {
    const {isLoggedIn, user} = useUserStore()
    return(
        <nav className="w-full relative z-10 p-4 bg-green-900 text-white">
            <h1 className="text-5xl font-bold">
                {user ? user?.email : "Guest"}
            </h1>
            <ul className="w-full flex gap-4 items-center justify-center flex-col md:flex-row">
                <li>
                    <Link to={"/"}>Home</Link>
                </li>
                <li>
                    <Link to={"/about"}>About</Link>
                </li>
                {isLoggedIn ? (
                    <button>
                        Logout
                    </button>
                ) : (
                    <div>
                <li>
                    <Link to={"/login"}>Login</Link>
                </li>
                <li>
                    <Link to={"/signup"}>Signup</Link>
                </li>
                    </div>
                )}
            </ul>
        </nav>
    )
}