module.exports = {
    route: "/guilds/:id",
    execute: function (client, req, res) {
        if (!req.session.user) return res.redirect("/login")

        const guild = client.guilds.cache.get(req.params.id)
        if (!guild) return res.redirect("/guilds")

        res.render("manage", {
            user: req.session.user || null,
            guild: guild,
			page: "Manage Server", currentPage: `guilds/${guild.id}`, title: "Manage Guild - B33P0"
        })
    }
}
