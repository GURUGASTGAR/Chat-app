import dotenv from "dotenv";
import authRoute from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import messageRoute from "./routes/message.route.js";
import usersRoute from "./routes/users.route.js";
import connectToMongoDB from "./db/connectToMongoDB.js";
import cors from "cors";
import { app, server } from "./socket/socket.js";
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
dotenv.config();

app.use(cookieParser());
const PORT = process.env.PORT || 5000;
app.use(cors(corsOptions));

app.use("/api/auth", authRoute);
app.use("/api/message", messageRoute);
app.use("/api/users", usersRoute);

server.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server is listening on PORT : ${PORT}`);
});
