const { KlasaClient } = require('klasa');

module.exports = KlasaClient.defaultGuildSchema
    .add("permissions", folder => folder
        .add("dj", "user", { array: true })
        .add("admins", "user", { array: true })
        .add("mods", "user", { array: true }))
        
    .add("music", folder => folder
        .add("volume", "integer", { default: 100, max: 100, min: 0 })
        .add("djOnly", "boolean", { default: false }))
        .add("queue", "any", { array: true, default: [] })