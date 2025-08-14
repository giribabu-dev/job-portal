import { Outlet, NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

function Dashboard() {

    const { companyData } = useContext(AppContext)

    return (
        <div className="min-h-screen">

            {/* Navbar for Recruiter Panel */}
            <div className="shadow py-4">
                <div className="container px-5 mx-auto flex items-center justify-between">
                    <img src={assets.logo} alt="" className="cursor-pointer max-sm:w-32" />
                    {
                        companyData && (
                            <div className="flex items-center gap-3">
                                <p className="max-sm:hidden">Welcome, {companyData.name}</p>
                                <div className='relative group'>
                                    <img src={companyData.image} alt="" className="w-8 border border-gray-300 rounded-full" />
                                    <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12">
                                        <ul className="list-none m-0 p-2 bg-white border border-gray-300 rounded-md text-sm">
                                            <li className="cursor-pointer py-1 px-2 pr-10">Logout</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>

            {/* */}
            <div className="flex items-start">

                {/* Left Sidebar with options to Add Job, Manage Jobs, View Applications */}
                <div className="min-h-screen border-r-2 border-gray-300 inline-block">
                    <ul className="flex flex-col items-start pt-5 text-gray-500">
                        <NavLink to={'/dashboard/add-job'}
                            className={({ isActive }) => `flex items-center p-3 sm:px-6 gap-3 w-full hover:bg-gray-100 ${isActive && 'bg-blue-100 border-r-4 border-blue-500'}`}>
                            <img src={assets.add_icon} alt='' className="min-w-4" />
                            <p className="max-sm:hidden">Add Job</p>
                        </NavLink>
                        <NavLink to={'/dashboard/manage-jobs'}
                            className={({ isActive }) => `flex items-center p-3 sm:px-6 gap-3 w-full hover:bg-gray-100 ${isActive && 'bg-blue-100 border-r-4 border-blue-500'}`}>
                            <img src={assets.home_icon} alt='' className="min-w-4" />
                            <p className="max-sm:hidden">Manage Jobs</p>
                        </NavLink>
                        <NavLink to={'/dashboard/view-applications'}
                            className={({ isActive }) => `flex items-center p-3 sm:px-6 gap-3 w-full hover:bg-gray-100 ${isActive && 'bg-blue-100 border-r-4 border-blue-500'}`}>
                            <img src={assets.person_tick_icon} alt='' className="min-w-4" />
                            <p className="max-sm:hidden">View Applications</p>
                        </NavLink>
                    </ul>
                </div>

                {/* */}
                <div>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Dashboard