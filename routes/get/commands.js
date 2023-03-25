module.exports = {
    route: "/commands",
    execute: function (client, req, res) {
        res.render("commands", { user: req.session.user || null,
			page: "Commands", currentPage: "commands", title: "Commands" });
    }
}