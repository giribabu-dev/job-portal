import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";

function JobCard({ job }) {

    const navigate = useNavigate()

    return (
        <div className="border border-gray-300 shadow rounded p-6">
            <div className="flex justify-between items-center">
                <img src={assets.company_icon} alt="" className="h-8" />
            </div>
            <h4 className="font-medium text-xl mt-2">{job.title}</h4>
            <div className="flex items-center gap-3 mt-2 text-xs">
                <span className="bg-blue-50 border border-blue-200 px-4 py-1.5 rounded">{job.location}</span>
                <span className="bg-red-50 border border-red-200 rounded px-4 py-1.5">{job.level}</span>
            </div>
            <p dangerouslySetInnerHTML={{ __html: job.description.slice(0, 150) }} className="text-gray-500 text-sm mt-4"></p>
            <div className="flex gap-4 mt-4 text-sm">
                <button className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer"
                    onClick={() => { navigate(`/apply-job/${job._id}`) }}>
                    Apply Now
                </button>
                <button className="border rounded px-4 py-2 border-gray-500 text-gray-500 cursor-pointer"
                    onClick={() => { navigate(`/apply-job/${job._id}`); scrollTo(0, 0) }}>
                    Learn More
                </button>
            </div>
        </div>
    )
};

export default JobCard;