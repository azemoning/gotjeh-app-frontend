const express = require("express");
const app = express();
const port = process.env.PORT || 8000;

const routes = require("./routes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/public"));

app.set("view engine", "ejs");
app.use(routes);

app.listen(port, () => {
  console.log(`server ready on http://localhost:${port}`);
});
