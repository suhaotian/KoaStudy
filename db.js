const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/test')

const db = mongoose.connection
db.on('error', () => {})
db.once('open', () => {

})

const kittySchema = mongoose.Schema({
  name: String
})

kittySchema.methods.speak = function () {
  console.log(this.name ? `Meow name is ${this.name}` : `I don't have a name`)
}

const Kitten = mongoose.model('Kitten', kittySchema)

const silence = new Kitten({
  name: 'Silence'
})

silence.speak()

silence.save((err, silence) => {
  if (err) return console.error(err)
  silence.speak()
})

Kitten.find(function (err, kittens) {
  if (err) return console.error(err);
  console.log(kittens);
  db.close()
})
