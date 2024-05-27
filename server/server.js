import { app } from "./app.js";
import { connectDB } from "./database/connect.js";

connectDB();

app.listen(process.env.PORT, () => {
  console.log('server is running at port ', process.env.PORT);
})