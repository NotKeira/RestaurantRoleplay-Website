module.exports = {
    route: "/admin",
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

        res.render("admin", { user: req.session.user || null, page: "Admin Portal", currentPage: "admin-portal", title: "Admin Portal" })
    }
}
