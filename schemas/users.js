const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        userId: {
            type: Number,
            required: true,
            unique: true
        },
        profilePicture: {
            type: URL,
            default: "https://beepobot.xyz/Discord2.webp"
        },
        staff: {
            type: Boolean,
            default: false
        },
        status: {
            type: String,
            default: "Member",
            enum: ["Community Member", "Premium Member", "Staff", "Developer", "Owner"]
        }
    },
    { timestamps: true }
)

module.exports = mongoose.model("User", userSchema)
