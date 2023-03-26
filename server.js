const fastify = require("fastify")({})
const { join } = require("path")
const session = require("@fastify/session")
const FileStore = require("session-file-store")(session)
const { readdirSync, readFileSync } = require("fs")
const { Client, GatewayIntentBits } = require("discord.js")
const mongoose = require("mongoose")
const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers]
})

client.config = require(`${__dirname}/config.json`)

client.login(client.config.discord.token)

// log all servers the bot is in
client.on("ready", () => {
    console.log(
        // all servers the bot is in
        client.guilds.cache.map((guild) => guild.name).join("\n"),
        "\n",
        client.guilds.cache.map((guild) => guild.id).join("\n")
    )

    // kick bot from server id
    //client.guilds.cache.get("916715336001257472").leave()
})

main().catch((err) => console.log(err))

async function main() {
    await mongoose.connect(client.config.databaseSRV)

    const db = mongoose.connection
    db.on("error", console.error.bind(console, "connection error:"))
    db.once("open", function () {
        console.log("Connected to database!")
    })
}

fastify
    .register(require("@fastify/view"), {
        engine: {
            ejs: require("ejs")
        },
        root: join(__dirname, "pages"),
        propertyName: "render"
    })
    .register(require("@fastify/formbody"))
    .register(require("@fastify/cookie"))
    .register(session, {
        secret: "HEzVSUsvu57kexvO5CodTg!ZFwnqB@pNBaWIIUSq165kr",
        cookie: { secure: false, maxAge: 604_800_000 },
        store: new FileStore({ logFn: function () {} })
    })
    .register(require("@fastify/static"), {
        root: join(__dirname, "static"),
        prefix: "/img/",
        decorateReply: false,
        wildcard: false,
        schemaHide: true,
        setHeaders: function (res, path, stat) {
            res.setHeader("x-timestamp", Date.now())
        },
    })

fastify.setNotFoundHandler((request, reply) => {
    reply.status(404).render("404", {user: null,currentPage: "404", page: "404 - Error",title: "404 Error - Page not found"} )
})

const eventFolders = readdirSync(join(__dirname, "routes"))
let pagesLoaded = 0
for (const folder of eventFolders) {
    eventFiles = readdirSync(join(__dirname, "routes", folder)).filter((file) => file.endsWith(".js"))
    for (const file of eventFiles) {
        const e = require(`${__dirname}/routes/${folder}/${file}`)
        pagesLoaded++

        fastify[folder](e.route, function (req, res) {
            e.execute(client, req, res)
        })
    }
}

console.log(`Loaded ${pagesLoaded} pages.`)

fastify.listen({ port: 80, host: "0.0.0.0" }, function (err, address) {
    if (err) {
        console.error(err)
        process.exit(1)
    }
    console.log(`server listening on ${address}`)
})
