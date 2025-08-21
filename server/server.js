import "./config/instrument.js"
import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./config/db.js";
import * as Sentry from "@sentry/node";
import { clerkWebhooks } from "./controllers/webhooks.js";
import companyRoutes from "./routes/companyRoutes.js";
import connectCloudinary from "./config/cloudinary.js";
import jobRoutes from "./routes/jobRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { clerkMiddleware } from "@clerk/express";
import bodyParser from "body-parser";

// Initialize Express
const app = express()

// Require to load .env variables
dotenv.config()

// Connect to database
await connectDB()
await connectCloudinary()

// Middlewares
app.use(cors())
app.use(express.json())  // For normal routes
app.use(clerkMiddleware())  // Protect Clerk routes

// Routes
app.get('/', (req, res) => res.send('API Working!'))

// Debug Sentry
app.get("/debug-sentry", function mainHandler(req, res) {
    throw new Error("My first Sentry error!");
})

// Clerk Webhook (must be raw body)
app.post('/webhooks', bodyParser.raw({ type: "application/json" }), clerkWebhooks)

// API Routes
// app.post('/webhooks', clerkWebhooks)
app.use('/api/company', companyRoutes)
app.use('/api/jobs', jobRoutes)
app.use('/api/users', userRoutes)

// Error handler for Sentry
Sentry.setupExpressErrorHandler(app);

// Start Server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})