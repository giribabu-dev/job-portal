import express from "express";
import { registerUser, userLogin, getUserData, applyForJob, getUserJobApplications, updateUserResume } from "../controllers/userController.js";
import upload from "../config/multer.js";
import { protectUser } from "../middleware/userAuth.js";

const router = express.Router()

// New user registration
router.post("/register", registerUser)

// User login
router.post("/login", userLogin)

// Get user data
router.get('/user', protectUser, getUserData)

// Apply for a job
router.post('/apply', applyForJob)

// Get applied jobs data
router.get('/applications', getUserJobApplications)

// Update user profile (resume)
router.post('/update-resume', upload.single('resume'), updateUserResume)

export default router;