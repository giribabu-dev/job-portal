import { assets } from "../../assets/assets";

function JobCard({ job }) {
    return (
        <div className="border shadow rounded p-6">
            <div className="flex justify-between items-center">
                <img src={assets.company_icon} alt="" className="h-8" />
            </div>
            <h4 className="font-medium text-xl mt-2">{job.title}</h4>
            <div className="flex items-center gap-3 mt-2 text-xs">
                <span className="bg-blue-50 border border-blue-200 px-4 py-1.5 rounded">{job.location}</span>
                <span className="bg-red-50 border border-red-200 rounded px-4 py-1.5">{job.level}</span>
            </div>
            <p dangerouslySetInnerHTML={{__html: job.description.slice(0, 150)}} className="text-gray-500 text-sm mt-4"></p>
            <div className="flex gap-4 mt-4 text-sm">
                <button className="bg-blue-600 text-white px-4 py-2 rounded">Apply now</button>
                <button className="border rounded px-4 py-2 border-gray-500 text-gray-500">Learn more</button>
            </div>
        </div>
    )
};

export default JobCard;