import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { useContext } from "react";

function Navbar() {

    const navigate = useNavigate()
    const { setShowRecruiterLogin, setShowUserLogin, userData } = useContext(AppContext)

    const handleRecruiterLogin = () => {
        setShowRecruiterLogin(true)
        setShowUserLogin(false)
    };

    const handleUserLogin = () => {
        setShowUserLogin(true)
        setShowRecruiterLogin(false)
    };

    return (
        <div className="shadow py-4 sticky top-0 bg-white z-50">
            <div className="container px-4 2xl:px-20 mx-auto flex justify-between items-center">
                <img src={assets.logo} alt="Logo" className="cursor-pointer" onClick={() => navigate('/')} />

                {
                    userData ? (
                        <div className="flex items-center gap-3">
                            <Link to={'/applications'}>Applied Jobs</Link>
                            <p> | </p>
                            <p className="max-sm:hidden">Hi, {userData.firstName + " " + userData.lastName}</p>
                        </div>
                    ) : (
                        <div className="flex gap-4">
                            <button className="text-gray-600 cursor-pointer" onClick={handleRecruiterLogin}>
                                Recruiter Login
                            </button>
                            <button className="bg-blue-600 text-white rounded-full px-6 sm:px-9 py-1 cursor-pointer"
                                onClick={handleUserLogin}>
                                Login
                            </button>
                        </div>
                    )
                }

            </div>
        </div>
    )
};

export default Navbar;