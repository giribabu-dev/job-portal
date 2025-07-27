import { useParams } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import Navbar from "../components/navbar/Navbar";
import { assets } from "../assets/assets";
import kconvert from "k-convert";
import moment from "moment";
import "./ApplyJob.css";

function ApplyJob() {

    const { id } = useParams()

    const { jobs } = useContext(AppContext)

    const [jobData, setJobData] = useState(null)

    const fetchJob = async () => {
        const data = jobs.filter(job => job._id === id);
        if (data.length !== 0) {
            setJobData(data[0]);
            console.log(data[0])
        }
    };

    useEffect(() => {
        if (jobs.length > 0) {
            fetchJob()
        }
    }, [id, jobs]);

    return (
        <div>
            {
                jobData ? (
                    <>
                        <Navbar />

                        <div className="min-h-screen flex flex-col py-10 container px-4 2xl:px-20 mx-auto">
                            <div className="bg-white text-black rounded-lg w-full">
                                <div className="flex justify-center md:justify-between flex-wrap gap-8 px-14 py-20 mb-6 bg-sky-50 border border-sky-400 rounded-xl">
                                    <div className="flex flex-col md:flex-row items-center">
                                        <img src={jobData.companyId.image} alt="" className="h-24 bg-white rounded-lg p-4 mr-4 max-md:mb-4 border" />
                                        <div className="text-center md:text-left text-neutral-700">
                                            <h1 className="text-2xl font-medium sm:text-4xl">{jobData.title}</h1>
                                            <div className="flex flex-row flex-wrap max-md:justify-center gap-y-2 gap-6 items-center text-gray-600 mt-2">
                                                <span className="flex items-center gap-1">
                                                    <img src={assets.suitcase_icon} alt="" />
                                                    {jobData.companyId.name}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <img src={assets.location_icon} alt="" />
                                                    {jobData.location}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <img src={assets.person_icon} alt="" />
                                                    {jobData.level}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <img src={assets.money_icon} alt="" />
                                                    CTC: {kconvert.convertTo(jobData.salary)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col justify-center text-end text-sm max-md:mx-auto max-md:text-center">
                                        <button className="bg-blue-600 text-white p-2.5 px-10 rounded cursor-pointer">Apply Now</button>
                                        <p className="mt-1 text-gray-600">Posted {moment(jobData.date).fromNow()}</p>
                                    </div>
                                </div>

                                <div className="flex flex-col lg:flex-row justify-between items-start">
                                    <div className="w-full lg:w-2/3">
                                        <h2 className="font-bold text-2xl mb-4">Job Description</h2>
                                        <div dangerouslySetInnerHTML={{__html: jobData.description}} className="rich-text"></div>
                                        <button className="bg-blue-600 text-white p-2.5 px-10 rounded cursor-pointer mt-10">Apply Now</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="min-h-screen flex items-center justify-center">
                        <div className="w-20 h-20 border-5 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                    </div>
                )
            }
        </div>
    )
};

export default ApplyJob;