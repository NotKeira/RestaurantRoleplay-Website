module.exports = {
	route: "/login",
	execute: (client, req, res) => {
		req.session.redirect = req.query.redirect || null;

		res.redirect(
			`https://discord.com/api/oauth2/authorize?client_id=${client.config.discord.client.id
			}&redirect_uri=${encodeURIComponent(
				client.config.discord.redirect,
			)}&response_type=code&scope=identify%20guilds`,
		);
	},
};
