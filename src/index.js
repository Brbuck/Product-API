const express = require("express");
const app = express();

app.use(express.json());
var cors = require("cors");

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "X-PINGOTHER, Content-Type, Authorization"
  );
  app.use(cors());
  
  next();
});


app.use("/", (req, res) => {
    res.send("Tudo ok");
  });

app.listen(5000, () => {
  console.log("Server started on port 5000 🔥");
});
