const mongoose = require('mongoose')
const MONGO_URI = 

const connectDB = mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.error('MongoDB Connection error: ', err));

export default connectDB;