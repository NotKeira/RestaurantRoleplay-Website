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
        /*let userList = []

        const Users = require("../../schemas/users.js");
        Users.find({})
            .then((users) => {
                userList = users
            })
            .catch((err) => console.error(err))*/

        res.render("admin", { user: req.session.user || null, /* users: userList,*/ page: "Admin Portal", currentPage: "admin-portal", title: "Admin Portal - B33P0" })
    }
}
