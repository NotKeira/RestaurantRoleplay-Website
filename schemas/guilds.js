const mongoose = require("mongoose")

const guildSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        id: {
            type: Number,
            required: true,
            unique: true
        },
        logo: {
            type: URL,
            default: "https://beepobot.xyz/Discord2.webp"
        },
        channels: {
            type: Array,
            default: [],

        },
        users: {
            type: Array,
            default: [],
        },
        punishments: {
            type: Array,
            default: [],
        },
        moderation: {
            type: Array,
            default: [],
        }
    },
    { timestamps: true }
)

module.exports = mongoose.model("Guild", guildSchema)
