import Job from "../models/Job.js";

// Get all jobs
export const getJobs = async (req, res) => {
    try{
        const jobs = await Job.find({visible: true}).populate({})
    }
    catch(error){

    }
}

// Get a specific job by id
export const getJobById = async (req, res) => {

}