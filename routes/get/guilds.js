const { PermissionsBitField } = require("discord.js")

module.exports = {
    route: "/guilds",
    execute: function (client, req, res) {
        const user = req.session.user
        const guilds = user.guilds

        const notInGuilds = req.session.user.notInGuilds
            .filter((guild) => guilds && guilds.find((g) => g.id === guild.id) === undefined)
            .map((guild) => {
                if (new PermissionsBitField(guild.permissions).has(PermissionsBitField.Flags.ManageGuild)) return guild
            })
            .filter((guild) => guild !== undefined)

        res.render("guilds", { bot: client, user: req.session.user || null, guilds: user.guilds || [], notInGuilds: notInGuilds || [],
			page: "Guild Selector", currentPage: "guilds", title: "Guild Selector - B33P0" })
    }
}
