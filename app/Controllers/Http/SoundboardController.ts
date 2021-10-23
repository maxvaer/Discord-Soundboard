// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Discordbot from '@ioc:Soundboard/Discordbot'

export default class SoundboardController {
    playAudio ({ request, params, response }) {
        Discordbot.playAudio(request.post().file)
    }

    showBoard ({ view, params, request, response }) {
        const fileNames = Discordbot.getFileNames()
        return view.render('board', { fileNames })
    }
}
