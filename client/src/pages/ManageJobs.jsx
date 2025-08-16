import { manageJobsData } from "../assets/assets";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import toast from "react-hot-toast";

function ManageJobs() {

    const navigate = useNavigate()

    const [jobs, setJobs] = useState(false)

    const { backendUrl, companyToken } = useContext(AppContext)

    // Function to fetch Company Job Applications data
    const fetchCompanyJobs = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/company/list-jobs',
                { headers: { token: companyToken } }
            )

            if (data.success) {
                setJobs(data.jobsData.reverse())
                console.log(data.jobsData)
            }
            else {
                toast.error(data.message)
            }
        }
        catch (error) {
            toast.error(error.message)
        }
    };

    useEffect(() => {
        if(companyToken){
            fetchCompanyJobs()
        }
    }, [companyToken]);

    return (
        <div className="container p-4 max-w-5xl">
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300 max-sm:text-sm">
                    <thead>
                        <tr className="border-b border-gray-400">
                            <th className="py-2 px-4 text-left max-sm:hidden">#</th>
                            <th className="py-2 px-4 text-left">Job Title</th>
                            <th className="py-2 px-4 text-left max-sm:hidden">Date</th>
                            <th className="py-2 px-4 text-left max-sm:hidden">Location</th>
                            <th className="py-2 px-4 text-center">Applicants</th>
                            <th className="py-2 px-4 text-left">Visible</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            manageJobsData.map((job, index) => (
                                <tr key={index} className="border-b border-gray-300 text-gray-700">
                                    <td className="py-2 px-4 max-sm:hidden">{index + 1}</td>
                                    <td className="py-2 px-4">{job.title}</td>
                                    <td className="py-2 px-4 max-sm:hidden">{moment(job.date).format('ll')}</td>
                                    <td className="py-2 px-4 max-sm:hidden">{job.location}</td>
                                    <td className="py-2 px-4 text-center">{job.applicants}</td>
                                    <td className="py-2 px-4 text-center">
                                        <input type="checkbox" className="scale-125" />
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>

            <div className="mt-4 flex justify-end">
                <button className="bg-cyan-600 text-white py-2 px-4 rounded cursor-pointer" onClick={() => navigate('/dashboard/add-job')}>
                    Add New Job
                </button>
            </div>
        </div>
    )
}

export default ManageJobs