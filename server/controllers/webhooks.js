import { Webhook } from "svix";
import User from "../models/User.js";

// API Controller function to manage Clerk User with Database
export const clerkWebhooks = async (req, res) => {
    try {

        // Create a svix instance with Clerk Webhook secret
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)

        // Convert raw body to string (important for svix.verify)
        const payload = JSON.stringify(req.body)

        // Verifying Headers
        const headers = {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"]
        };

        // Verify webhook
        whook.verify(payload, headers)

        // Getting data from request body
        const { data, type } = req.body

        // switch cases for different Events
        switch (type) {
            case 'user.created': {
                const userData = {
                    _id: data.id,
                    name: data.first_name + " " + data.last_name,
                    email: data.email_addresses[0].email_address,
                    image: data.image_url,
                    resume: ""
                }
                await User.create(userData)
                res.json({ success: true })
                break;
            }
            case 'user.updated': {
                const userData = {
                    name: data.first_name + " " + data.last_name,
                    email: data.email_addresses[0].email_address,
                    image: data.image_url
                }
                await User.findByIdAndUpdate(data.id, userData)
                res.json({ success: true })
                break;
            }
            case 'user.deleted': {
                await User.findByIdAndDelete(data.id)
                res.json({ success: true })
                break;
            }

            default:
                return res.json({ message: "Unhandled event type" })
        }
    }
    catch (error) {
        console.error("Webhook Error", error.message)
        res.json({ success: false, message: "Webhook verification failed" })
    }
}