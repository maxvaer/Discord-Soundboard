const { hooks } = require('@adonisjs/ignitor')

hooks.after.providersBooted(() => {
    console.log("Initializing Discord Provider!")
    const Discordbot = use('Discord/Bot')
})