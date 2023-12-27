import mongoose, { ConnectOptions } from "mongoose";
import { MONGO_URI } from "../common/private-keys";

const options: ConnectOptions = {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true,
};

mongoose.connect(MONGO_URI as string, options).then(() => {
  console.log("database successfully connected");
});
