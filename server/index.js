const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { AuthMiddleware } = require("./middlewares/AuthMiddleware");
const { apiRoute, apiProtected } = require("./routes/api");

const { DB_CONNECT } = require("./utils/constants");
const app = express();
mongoose.connect(DB_CONNECT, { useNewUrlParser: true });
const PORT = 8000;

app.use(cors());
app.use(express.json());
app.use("/api", apiRoute);
app.use("/api", AuthMiddleware, apiProtected);

app.listen(PORT, () => console.log(`server is running on ${PORT}`));
