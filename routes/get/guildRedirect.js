module.exports = {
    route: "/redirect",
    execute: function (client, req, res) {
        res.redirect(`/guilds${req.session.guildInvite ? `/${req.session.guildInvite}` : ""}`)
        return (req.session.guildInvite = null)
    }
}
