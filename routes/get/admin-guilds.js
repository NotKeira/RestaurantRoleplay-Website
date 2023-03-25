module.exports = {
    route: "/admin/guilds",
    execute: function (client, req, res) {
        if (!req.session?.user?.isAdmin) {
            if (req.session?.user?.username) {
                return res.redirect("/?error=not_admin")
            } else {
                return res.redirect(
                    `https://discord.com/api/oauth2/authorize?client_id=${client.config.discord.client.id}&redirect_uri=${encodeURIComponent(
                        client.config.discord.redirect
                    )}&response_type=code&scope=identify%20guilds`
                )
            }
        }
        let guildList = []
        const user = req.session.user
        const guilds = client.guilds.cache.map((m) => {
            guildList = guildList.push(m)
        })
        res.render("admin-guilds", { bot: client, user: req.session.user || null, guilds: guildList || [], page: "Guild Management", currentPage: "admin-guilds", title: "Guild Manager - B33P0" })
    }
}
