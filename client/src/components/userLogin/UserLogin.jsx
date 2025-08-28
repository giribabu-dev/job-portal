import { useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function UserLogin() {

    const [state, setState] = useState("Login")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const { setShowUserLogin, backendUrl } = useContext(AppContext)

    const navigate = useNavigate()

    const handleUserForm = async (e) => {
        e.preventDefault()

        try {
            if (state === "Login") {
                const { data } = await axios.post(backendUrl + "/api/users/login", { email, password })
                if (data.success) {
                    console.log(data)
                    localStorage.setItem("userToken", data.token)
                    toast.success(data.message)
                    setShowUserLogin(false)
                    navigate("/")
                    setEmail("")
                    setPassword("")
                }
                else {
                    toast.error(data.message)
                }
            }
            else {
                const { data } = await axios.post(backendUrl + "/api/users/register", { firstName, lastName, email, password })
                if (data.success) {
                    setFirstName("")
                    setLastName("")
                    setEmail("")
                    setPassword("")
                    toast.success(data.message)
                    setState("Login")
                }
                else {
                    toast.error(data.message)
                }
            }
        }
        catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <div className="absolute top-0 right-0 bottom-0 left-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center">
            <form onSubmit={handleUserForm} className="relative bg-white p-10 rounded-xl text-slate-500">
                <h1 className="text-center font-medium text-2xl text-neutral-700">User {state}</h1>
                <p className="text-sm">Welcome back! Please sign in to continue</p>

                {
                    state === "Signup" && (
                        <>
                            <div className="flex items-center gap-2 border rounded-full px-4 py-2 my-5">
                                <img src={assets.person_icon} alt="Person icon" />
                                <input type="text" placeholder="First Name" required className="outline-none text-sm" value={firstName}
                                    onChange={e => setFirstName(e.target.value)} />
                            </div>
                            <div className="flex items-center gap-2 border rounded-full px-4 py-2">
                                <img src={assets.person_icon} alt="Person icon" />
                                <input type="text" placeholder="Last Name" required className="outline-none text-sm" value={lastName}
                                    onChange={e => setLastName(e.target.value)} />
                            </div>
                        </>
                    )
                }

                <div className="flex items-center gap-2 border rounded-full px-4 py-2 my-5">
                    <img src={assets.email_icon} alt="Email icon" />
                    <input type="email" placeholder="Email Id" required className="outline-none text-sm" value={email}
                        onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="flex items-center gap-2 border rounded-full px-4 py-2">
                    <img src={assets.lock_icon} alt="Lock icon" />
                    <input type="password" placeholder="Password" required className="outline-none text-sm" value={password}
                        onChange={e => setPassword(e.target.value)} />
                </div>
                {state === "Login" && <p className="text-blue-600 text-sm cursor-pointer">Forgot password?</p>}

                <button className="w-full bg-blue-600 rounded-full text-white py-2 my-5 cursor-pointer" type="submit">
                    {state === "Login" ? 'Login' : 'Signup'}
                </button>

                {
                    state === "Login" ?
                        <p className="text-center">Don't have an account?
                            <span className="text-blue-600 cursor-pointer" onClick={() => setState("Signup")}> Sign up</span>
                        </p>
                        :
                        <p className="text-center">Already have an account?
                            <span className="text-blue-600 cursor-pointer" onClick={() => setState("Login")}> Login</span>
                        </p>
                }

                <img src={assets.cross_icon} alt="Cross icon" className="absolute top-5 right-5 cursor-pointer"
                    onClick={() => setShowUserLogin(false)} />
            </form>
        </div>
    )
}

export default UserLogin;