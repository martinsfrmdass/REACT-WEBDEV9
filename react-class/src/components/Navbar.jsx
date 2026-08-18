import { Link } from "react-router-dom";

export default function Navbar(){

    return(
        <nav className="fixed z-10 p-4 bg-green-900 text-white">
            <ul className="w-full flex gap-4 items-center justify-center flex-col md:flex-row">
                <li>
                    <Link to={"/"}>Home</Link>
                </li>
                <li>
                    <Link to={"/about"}>About</Link>
                </li>
                <li></li>
            </ul>
        </nav>
    )
}