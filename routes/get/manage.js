module.exports = {
    route: "/admin/manage/users/:id",
    execute: function (client, req, res) {
        if (!req.session.user) return res.redirect("/login")

        const user = server.users.find(u => u.id === req.params.id)
        if (!user) return res.redirect("/admin/manage")

        res.render("manage", {
            user: req.session.user || null,
            player: user,
			page: "Manage Users", currentPage: `admin/manage/users/${user.id}`, title: "Manage User"
        })
    }
}
