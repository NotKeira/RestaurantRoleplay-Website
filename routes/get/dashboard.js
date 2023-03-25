module.exports = {
	route: "/",
	execute: function (client, req, res) {
		res.render("dashboard", {
			user: req.session.user || null,
			page: "Home Page", currentPage: "home-page", title: "Home Page"
		});
	},
};
