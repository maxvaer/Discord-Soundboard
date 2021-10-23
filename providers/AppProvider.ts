import { ApplicationContract } from '@ioc:Adonis/Core/Application'
import Discordbot from './DiscordbotProvider'

export default class AppProvider {
  constructor(protected app: ApplicationContract) {}

  public register() {
    // Register your own bindings
    this.app.container.singleton('Soundboard/Discordbot', () => new Discordbot(this.app))
  }

  public async boot() {
    // IoC container is ready
  }

  public async ready() {
    // App is ready
  }

  public async shutdown() {
    // Cleanup, since app is going down
  }
}
