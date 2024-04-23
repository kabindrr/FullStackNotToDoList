import mongoose from "mongoose";

export const connectMongo = () => {
  const uri = "mongodb://localhost:27017/ntdl";
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log("DB connected"))
    .catch((erro) => console.log(erro));
};
