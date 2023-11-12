const express = require("express");
const morgan = require("morgan");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
require("./database-mysql");
const cors = require("cors");
const paginate = require("express-paginate");
const contracts = require("./routes/contract.routes");
const users = require("./routes/user.routes");
const app = express();

const PORT = process.env.PORT || 3001;

let server = app.listen(PORT, function () {
  console.log(`Server running on ${PORT}`);
});

app.use(
  bodyParser.urlencoded({
    limit: "5000mb",
  })
);

app.use(
  cors({
    origin: "*",
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(fileUpload());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// Routes
app.use(contracts);
app.use(users);


app.get("/", (req, res) => {
  res.send("Welcome To E-Tafakna Admin Backend server");
});
