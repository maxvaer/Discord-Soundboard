'use strict'

const Discord = require('discord.js');
const Helpers = use('Helpers')
const Env = use('Env')

class Discordbot {
  constructor () {
    this.client = new Discord.Client();
    this.init();
  }

  init() {
    this.client.once('ready', () => {
        console.log('I am ready!');
    });
    this.client.login(Env.get('DISCORD_TOKEN'));
  }

  message (msg) {
      this.channel.send(msg)
  }

  playAudio(file) {
    let pathTvTotal = Helpers.publicPath('Sounds/TV Total Sound.wav')
    let path = Helpers.publicPath('Sounds/' + file)
    this.voiceChannel = this.client.channels.cache.get(Env.get('DISCORD_CHANNEL_ID'));
    this.voiceChannel.join().then(connection =>{
        const dispatcherTvTotal = connection.play(pathTvTotal);
        dispatcherTvTotal.on("finish", end => {
            const dispatcher = connection.play(path);
            dispatcher.on("finish", end => {
                //voiceChannel.leave();
            });
          });
    }).catch(err => console.log(err));
  }
}

module.exports = Discordbot