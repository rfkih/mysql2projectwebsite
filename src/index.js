const express = require("express");
const app = express();
const port = 2022;
const cors = require("cors");
const pool = require("./config/database");

const userRouter = require("./routers/users")


app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("API IS RUNNING");
});

app.use("/users", userRouter);




app.listen(port, (err) => {
  if (err) return cosole.log({ err });

  console.log(`Api is running at port ${port}`);
});
