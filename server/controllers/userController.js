import User from "../models/User.js";
import JobApplication from "../models/JobApplication.js";
import Job from "../models/Job.js";
import { v2 as cloudinary } from "cloudinary";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// New user registration
export const registerUser = async (req, res) => {

    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
        return res.json({ success: false, message: "Missing details" })
    }

    try {

        const isUserExists = await User.find({ email })
        if (isUserExists.length > 0) {
            return res.json({ success: false, message: "User already registered" })
        }

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)

        const user = await new User({
            firstName,
            lastName,
            email,
            password: hashPassword
        })
        await user.save()

        return res.status(201).json({ success: true, message: "Registration Successful" })
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

// User login
export const userLogin = async (req, res) => {

    const { email, password } = req.body

    if (!email || !password) {
        return res.json({ success: false, message: "Missing details" })
    }

    try {
        const isUserExists = await User.findOne({ email })
        if (!isUserExists) {
            return res.json({ success: false, message: "User not found" })
        }

        // Compare plain password with stored hash
        const isPasswordMatch = await bcrypt.compare(password, isUserExists.password)
        if (!isPasswordMatch) {
            return res.json({ success: false, message: "Invalid password" })
        }

        // Generate JWT Token
        const token = jwt.sign(
            { id: isUserExists._id },
            process.env.USER_JWT_SECRET,
            { expiresIn: "7d" }
        );

        return res.status(200).json({ success: true, message: "Login successful", token })
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

// Get user data
export const getUserData = async (req, res) => {
    try {

        //  Clerk auth
        const { userId } = req.auth();
        console.log("userId", userId)

        if (!userId) {
            return res.status(401).json({ success: false, message: "Unauthorized" })
        }

        // Fetch user from database
        const user = await User.findById({ _id: userId })
        console.log("user", user)

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" })
        }

        res.json({ success: true, user })
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

// Apply for a job
export const applyForJob = async (req, res) => {

    const jobId = req.body

    const { userId } = req.auth.userId

    try {
        const isApplied = await JobApplication.find({ jobId, userId })
        if (isApplied.length > 0) {
            return res.json({ success: false, message: 'Applied' })
        }

        const jobData = await Job.find(jobId)
        if (!jobData) {
            return res.json({ success: false, message: 'Job not found' })
        }

        await JobApplication.create({
            userId,
            companyId: jobData.companyId,
            jobId,
            date: Date.now()
        })

        res.json({ success: true, message: "Applied successfully" })
    }
    catch (error) {
        res.json({ success: false, message: error.message })
    }
}

// Get user applied applications
export const getUserJobApplications = async (req, res) => {

    try {
        const userId = req.auth.userId

        const applications = await JobApplication.find({ userId })
            .populate('companyId', 'name email image')
            .populate('jobId', 'title description location category level salary')
            .exec()

        if (!applications) {
            return res.json({ success: false, message: 'No job applications found for this user' })
        }

        return res.json({ success: true, applications })
    }
    catch (error) {
        return res.json({ success: false, message: error.message })
    }
}

// Update user profile (resume)
export const updateUserResume = async (req, res) => {
    try {

        const userId = req.auth.userId

        const resumeFile = req.resumeFile

        const userData = await User.findById(userId)

        if (resumeFile) {
            const resumeUpload = await cloudinary.uploader.upload(resumeFile.path)
            userData.resume = resumeUpload.secure_url
        }

        await userData.save()

        return res.json({ success: true, message: 'Resume updated' })
    }
    catch (error) {
        return res.json({ success: false, message: error.message })
    }
}