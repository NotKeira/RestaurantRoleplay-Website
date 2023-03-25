module.exports = {
    route: "/privacy-policy",
    execute: function (client, req, res) {
        res.render("pp", { user: req.session.user || null,
			page: "Privacy Policy", currentPage: "privacy-policy", title: "Privacy Policy" });
    }
}