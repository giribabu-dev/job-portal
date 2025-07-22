import { assets } from "../../assets/assets";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

function Navbar() {

    const { openSignIn } = useClerk();
    const { user } = useUser();

    return (
        <div className="shadow py-4">
            <div className="container px-4 2xl:px-20 mx-auto flex justify-between items-center">
                <img src={assets.logo} />
                {
                    user ?
                        <div className="flex items-center gap-3">
                            <Link to={'/applications'}>Applied Jobs</Link>
                            <p> | </p>
                            <p className="max-sm:hidden">Hi, {user.firstName + " " + user.lastName}</p>
                            <UserButton />
                        </div>
                        :
                        <div className="flex gap-4">
                            <button className="text-gray-600">Recruiter Login</button>
                            <button className="bg-blue-600 text-white rounded-full px-6 sm:px-9 py-1 cursor-pointer"
                                onClick={() => { openSignIn() }}>
                                Login
                            </button>
                        </div>
                }
            </div>
        </div>
    )
};

export default Navbar;