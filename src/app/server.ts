// import { ProcessEnv } from './process.env.d';
import mongoose from "mongoose";
import app from "./app";
// import config from "./config";

const port = process.env.PORT || 5000;

async function server() {
  try {
    // await mongoose.connect(process.env.DATABASE_URL as string);
    await mongoose.connect(
      "mongodb+srv://murir-tin:siQtujoXpKalFHBB@cluster0.kwah0lw.mongodb.net/murir-tin?retryWrites=true&w=majority"
    );
    console.log(process.env.PORT);
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  } catch (error) {
    console.log(`Error: ${error}`);
  }
}

server().catch((err) => console.log(err));
