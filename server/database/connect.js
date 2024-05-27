import mongoose from "mongoose"

export const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    dbName: 'epic-eats'
  }).then(c => {
    console.log('Database connected');
  }).catch(e => {
    console.log(e);
  })
}