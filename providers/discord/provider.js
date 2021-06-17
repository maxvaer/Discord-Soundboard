const { ServiceProvider } = require('@adonisjs/fold')

class DiscordbotProvider extends ServiceProvider {
  register () {
    this.app.singleton('Discord/Bot', () => {
      return new (require('.'))()
    })
  }
}

module.exports = DiscordbotProvider