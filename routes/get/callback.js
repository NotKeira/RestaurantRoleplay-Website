const DiscordOauth2 = require("discord-oauth2")
const { PermissionsBitField } = require("discord.js")

module.exports = {
    route: "/callback",
    execute: async (client, req, res) => {
        try {
            const { code } = req.query
            if (!code) throw new Error("Invalid code")

            const discordOAuth = new DiscordOauth2()
            const token = await discordOAuth.tokenRequest({
                clientId: client.config.discord.client.id,
                clientSecret: client.config.discord.client.secret,
                code,
                scope: "identify guilds",
                grantType: "authorization_code",
                redirectUri: client.config.discord.redirect
            })

            const user = await discordOAuth.getUser(token.access_token)
            const userGuilds = await discordOAuth.getUserGuilds(token.access_token)

            user.guilds = userGuilds.filter((guild) => client.guilds.cache.get("794613512495300640")).filter((guild) => new PermissionsBitField(guild.permissions).has(PermissionsBitField.FLAGS.MANAGE_GUILD))

            user.avatar = user.avatar ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png` : "/Discord2.png"
            user.isAdmin = client.config.discord.admins.includes(user.id)
            req.session.user = user

            res.redirect(req.session.redirect || "/")
        } catch (error) {
            console.error(error)
            res.redirect("/?error=invalid_code")
        }
    }
}
