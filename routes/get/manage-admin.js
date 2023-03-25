const Roblox = require("noblox.js");
module.exports = {
    route: "/admin/manage", execute: function (client, req, res) {
        req.session = req.session || {};
        req.session.user.isAdmin = req.session.user.isAdmin || false;
        if (!req.session?.user?.isAdmin) {
            if (req.session?.user?.username) {
                return res.redirect("/?error=not_admin")
            } else {
                return res.redirect(`https://discord.com/api/oauth2/authorize?client_id=${client.config.discord.client.id}&redirect_uri=${encodeURIComponent(client.config.discord.redirect)}&response_type=code&scope=identify%20guilds`)
            }
        }
        let members = []
        const user = req.session.user
        res.render("admin-guilds", {
            bot: client,
            user: req.session.user || null,
            list: members || [],
            page: "Guild Management",
            currentPage: "admin-guilds",
            title: "Guild Manager - B33P0"
        })
    }
}
