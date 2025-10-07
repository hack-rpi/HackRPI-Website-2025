import mongoose from 'mongoose';

console.log("In catSchema");
const catSchema = new mongoose.Schema({
  name: {type: String, required: true},
  timeBorn: {type: Date, default: Date.now }
})

catSchema.methods.speak = function speak() {
  const greeting = this.name ? 'My name is ' + this.name : "I don't have a name";
  console.log(greeting);
}

const Cat = mongoose.model('cats', catSchema);

console.log("Exiting CatModel");
console.log(JSON.stringify(Cat));

export default mongoose.models.Cat || Cat;