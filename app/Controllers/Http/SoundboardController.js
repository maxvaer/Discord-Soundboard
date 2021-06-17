'use strict'

const fs = require('fs');
const Helpers = use('Helpers')

const Discordbot = use('Discord/Bot')

class SoundboardController {
    playAudio ({ request, params, response }) {
        Discordbot.playAudio(request.post().file)
    }

    showBoard ({ view, params, request, response }) {
        const fileNames = fs.readdirSync(Helpers.publicPath('/Sounds'))
        return view.render('board', { fileNames })
    }
}

module.exports = SoundboardController
