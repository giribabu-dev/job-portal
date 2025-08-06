import Company from "../models/Company.js";
import bcrypt, { compare } from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import gererateToken from "../utils/generateToken.js";

// Register a new company
export const registerCompany = async (req, res) => {

    const { name, email, password } = req.body
    const imageFile = req.file

    if (!name || !email || !password || !imageFile) {
        return res.json({ success: false, message: "Missing details" })
    }

    try {
        const isCompanyExists = await Company.findOne({ email })
        if (isCompanyExists) {
            return res.json({ success: false, message: 'Company already registered' })
        }

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)

        const imageUpload = await cloudinary.uploader.upload(imageFile.path)

        const company = await Company.create({
            name,
            email,
            password: hashPassword,
            image: imageUpload.secure_url
        })
        await company.save()

        res.json({
            success: true,
            company: {
                _id: company._id,
                name: company.name,
                email: company.email,
                image: company.image
            },
            token: gererateToken(company._id)
        })
    }
    catch (error) {
        res.json({ success: false, message: error.message })
    }
}

// Company login
export const loginCompany = async (req, res) => {

    const { email, password } = req.body
    try {
        const isCompanyExists = await Company.findOne({ email })

        if (!isCompanyExists) {
            return res.json({ success: false, message: "Invalid email or password" })
        }

        const isPasswordMatch = await bcrypt.compare(password, isCompanyExists.password)
        if (isPasswordMatch) {
            res.json({
                success: true,
                company: {
                    _id: isCompanyExists._id,
                    name: isCompanyExists.name,
                    email: isCompanyExists.email,
                    image: isCompanyExists.image
                },
                token: gererateToken(isCompanyExists._id)
            })
        }
        else {
            res.json({ success: false, message: 'Invalid email or password' })
        }
    }
    catch (error) {
        res.json({ success: false, message: error.message })
    }
}

// Get company data
export const getCompanyData = async (req, res) => {

}

// Post a new job
export const postJob = async (req, res) => {

}

// Get company job applicants
export const getCompanyJobApplicants = async (req, res) => {

}

// Get company posted jobs
export const getCompanyPostedJobs = async (req, res) => {

}

// Change job application status
export const changeJobApplicationStatus = async (req, res) => {

}

// Change job visibility
export const changeVisibility = async (req, res) => {

}