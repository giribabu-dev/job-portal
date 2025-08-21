import { Webhook } from "svix";
import User from "../models/User.js";

// API Controller function to manage Clerk User with Database
export const clerkWebhooks = async (req, res) => {
    try {

        // Create a svix instance with Clerk Webhook secret
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

        // Get raw body as string
        const payload = req.body.toString("utf8");

        // Headers
        const headers = {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"]
        };

        // Verify webhook
        whook.verify(payload, headers);

        // Parse JSON payload
        const { data, type } = JSON.parse(payload);

        // switch cases for different Events
        switch (type) {
            case "user.created": {
                const userData = {
                    _id: data.id,
                    name: `${data.first_name} ${data.last_name}`,
                    email: data.email_addresses[0].email_address,
                    image: data.image_url,
                    resume: ""
                }
                await User.create(userData)
                break;
            }

            case "user.updated": {
                const userData = {
                    name: `${data.first_name} ${data.last_name}`,
                    email: data.email_addresses[0].email_address,
                    image: data.image_url
                };
                await User.findByIdAndUpdate(data.id, userData, {
                    new: true,
                    upsert: true
                });
                break;
            }

            case "user.deleted": {
                await User.findByIdAndDelete(data.id)
                break;
            }

            default:
                console.log("Unhandled Clerk event:", type);
        }

        return res.json({ success: true });
    }
    catch (error) {
        console.error("Webhook Error", error.message)
        return res.status(400).json({
            success: false,
            message: "Webhook verification failed"
        });
    }
}