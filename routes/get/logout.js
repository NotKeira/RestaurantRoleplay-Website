module.exports = {
    route: "/logout",
    execute: async function (client, req, res) {
        try {
            await req.session.destroy();
        } catch (err) { }

        res.redirect("/");
    }
}