import { ApplicationContract } from '@ioc:Adonis/Core/Application'
import Application from '@ioc:Adonis/Core/Application'
import { fsReadAll } from '@ioc:Adonis/Core/Helpers'
import Env from '@ioc:Adonis/Core/Env'

/*
|--------------------------------------------------------------------------
| Provider
|--------------------------------------------------------------------------
|
| Your application is not ready when this file is loaded by the framework.
| Hence, the top level imports relying on the IoC container will not work.
| You must import them inside the life-cycle methods defined inside
| the provider class.
|
| @example:
|
| public async ready () {
|   const Database = this.app.container.resolveBinding('Adonis/Lucid/Database')
|   const Event = this.app.container.resolveBinding('Adonis/Core/Event')
|   Event.on('db:query', Database.prettyPrint)
| }
|
*/
import { Client, VoiceChannel } from 'discord.js'
import {
	joinVoiceChannel,
	createAudioPlayer,
	createAudioResource,
	entersState,
	StreamType,
	AudioPlayerStatus,
	VoiceConnectionStatus,
} from '@discordjs/voice';
import { createDiscordJSAdapter } from 'App/discord/adapter'

export default class Discordbot {
  client: Client<boolean>
  voiceChannel: any
  player: any;
  constructor (protected app: ApplicationContract) {
    this.client = new Client({intents:['GUILDS', 'GUILD_MESSAGES', 'GUILD_VOICE_STATES']})
    this.client.login(Env.get('DISCORD_TOKEN'))
    this.player = createAudioPlayer()
    this.client.on('ready', async () => {
      await this.connect()
    })
  }

  public register () {
    // Register your own bindings
  }

  public async boot () {
    // All bindings are ready, feel free to use them
  }

  public async ready () {
    
  }

  public async shutdown () {
    // Cleanup, since app is going down
  }

  public async connect() {
    this.client.channels.fetch(Env.get('CHANNEL_ID'))
    .then(async channel => {
      try {
        const connection = await this.connectToChannel(channel)
        connection.subscribe(this.player)
        console.log("Connected to channel:", channel.name)
      } catch (error) {
        console.log("Connection error:", error)
      }
    })
    .catch("Error:",console.error);
  }

  public playAudio(file) {
    let path = Application.publicPath('Sounds/' + file)
    const resource = createAudioResource(path, {
		  inputType: StreamType.Arbitrary,
	  });

    this.player.play(resource);
	  return entersState(this.player, AudioPlayerStatus.Playing, 5e3);
  }

  public getFileNames() {
    let files : string[] = []
    fsReadAll(Application.publicPath('Sounds/'), (filePath) => {
      if(filePath.endsWith('.wav')) {
        files.push(filePath)
      }
    })
    return files
  }

  public async connectToChannel(channel: VoiceChannel) {
    const connection = joinVoiceChannel({
      channelId: channel.id,
      guildId: channel.guild.id,
      adapterCreator: createDiscordJSAdapter(channel),
    });
    try {
      await entersState(connection, VoiceConnectionStatus.Ready, 30e3);
      return connection;
    } catch (error) {
      connection.destroy();
      throw error;
    }
  }
}
