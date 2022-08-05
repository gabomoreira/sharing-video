require("dotenv").config();
const express = require("express");
const connectDB = require("./db/connect.js");
const userRoutes = require("./routes/user");
const videoRoutes = require("./routes/video");
const commentRoutes = require("./routes/comment");
const authRoutes = require("./routes/auth");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

const corsOptions = {
  origin: "https://sharing-video-mern.web.app",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/comments", commentRoutes);

app.get("/", (req, res) => {
  res.send("Hello to sharing-video API");
});

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong!";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(process.env.PORT || 5000, () => {
      console.log("Server is runnig");
    });
  } catch (error) {
    console.log(error);
  }
};

start();
