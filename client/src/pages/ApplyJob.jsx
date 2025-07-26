import { useParams } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import Navbar from "../components/navbar/Navbar";
import { assets } from "../assets/assets";
import kconvert from "k-convert";
import moment from "moment";

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
                        <div>
                            <div>
                                <div>
                                    <div>
                                        <img src={jobData.companyId.image} alt="" />
                                        <div>
                                            <h1>{jobData.title}</h1>
                                            <div>
                                                <span>
                                                    <img src={assets.suitcase_icon} alt="" />
                                                    {jobData.companyId.name}
                                                </span>
                                                <span>
                                                    <img src={assets.location_icon} alt="" />
                                                    {jobData.location}
                                                </span>
                                                <span>
                                                    <img src={assets.person_icon} alt="" />
                                                    {jobData.level}
                                                </span>
                                                <span>
                                                    <img src={assets.money_icon} alt="" />
                                                    CTC: {kconvert.convertTo(jobData.salary)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <button>Apply Now</button>
                                        <p>Posted {moment(jobData.date).fromNow()}</p>
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