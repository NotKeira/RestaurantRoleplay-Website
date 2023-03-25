module.exports = {
    route: "/api/killmyself/guilds/leave/:id",
    execute: async (client, req, res) => {
        // if admin check here
        if (!req.session.user?.isAdmin) return { error: true, message: "You are not an admin.. loser." }
        // end admin check

        let guild = client.guilds.cache.get(req.params.id)
        if (!guild) {
            try {
                await client.guilds.fetch(req.params.id)
            } catch (e) {}
            guild = client.guilds.cache.get(req.params.id)
            if (!guild) return { error: true, message: "Guild not found." }
        }

        try {
            await guild.leave()
        } catch (e) {
            return { error: true, message: "Unexpected error while leaving guild." }
        }

        return { error: false, message: "Successfully left guild." }
    }
}
