import mongoose from 'mongoose';


const catSchema = new mongoose.Schema({
  name: {type: String, required: true},
  timeBorn: {type: Date, default: Date.now }
})

catSchema.methods.speak = function speak() {
  const greeting = this.name ? 'My name is ' + this.name : "I don't have a name";
  console.log(greeting);
}

const Cat = mongoose.model('cats', catSchema);

/*const scheduleSchema = new mongoose.Schema({
  title: {type: String, required: true},
  location: {type: String, required: true},
  description: {type: String, required: true, default: ""},
  startTime: {type: Date, required: true},
  endTime: {type: Date, required: true},
  willAnnounce: {type: Boolean, required: true, default: false},
  column: {type: Number, required: true}
})*/


async function leTest(){
  const Evvie = new Cat({name: "Willow"});
  console.log(Evvie.name);
  Evvie.speak()
  await Evvie.save();
}
