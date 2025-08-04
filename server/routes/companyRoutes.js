import express from "express";
import { registerCompany, loginCompany, getCompanyData, postJob, getCompanyJobApplicants, getCompanyPostedJobs, changeJobApplicationStatus, changeVisibility } from "../controllers/companyController.js";
import upload from "../config/multer.js";

const router = express.Router()

// Register a new company
router.post('/register', upload.single('image'), registerCompany)

// Company login
router.post('/login', loginCompany)

// Get company data
router.get('/company', getCompanyData)

// Post a job
router.post('/post-job', postJob)

// Get applicants data of company
router.get('/applicants', getCompanyJobApplicants)

// Get company job list
router.get('/list-jobs', getCompanyPostedJobs)

// Change application status
router.post('/change-status', changeJobApplicationStatus)

// Change application visibility
router.post('/change-visibility', changeVisibility)

export default router;