import { Webhook } from "svix";
import User from "../models/User.js";

// API Controller function to manage Clerk User with Database
export const clerkWebhooks = async (req, res) => {
    try {

        // Create a svix instance with Clerk Webhook secret
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)

        // Verifying Headers
        whook.verify(JSON.stringify(req, res), {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"]
        })

        // Getting data from request body
        const { data, type } = req.body

        // switch cases for different Events
        switch (type) {
            case 'user.created': {

            }
            case 'user.updated': {

            }
            case 'user.deleted': {

            }

            default:
                break
        }
    }
    catch (error) {

    }
}