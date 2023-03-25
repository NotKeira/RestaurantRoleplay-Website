module.exports = {
    route: "/invite",
    execute: (client, req, res) => {
        req.session.guildInvite = req.query.id || null

        return res.redirect(
            `https://discord.com/api/oauth2/authorize?client_id=${client.config.discord.client.id}&permissions=8${
                req.query.id ? `&guild_id=${req.query.id}&disable_guild_select=true` : ""
            }&scope=bot%20applications.commands&redirect_uri=${encodeURIComponent("https://beepobot.xyz/redirect")}&response_type=code`
        )
    }
}
