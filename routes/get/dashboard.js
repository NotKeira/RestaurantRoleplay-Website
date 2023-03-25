module.exports = {
	route: "/",
	execute: function (client, req, res) {
		res.render("dashboard", {
			user: req.session.user || null,
			members: client.guilds.cache
				.map((g) => g.memberCount)
				.reduce((a, b) => a + b),
			guilds: client.guilds.cache.size,
			page: "Home Page", currentPage: "home-page", title: "Home Page - B33P0"
		});
	},
};
