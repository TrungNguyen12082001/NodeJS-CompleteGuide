const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");
const db = require("./util/database");
//const expressHbs = require("express-handlebars");

const app = express();

// app.engine(
//   "hbs",
//   expressHbs({
//     layoutsDir: "views/layouts/",
//     defaultLayout: "main-layout",
//     extname: "hbs",
//   })
// );

// setup for handlebars
// app.set("view engine", "hbs");

// setup for ejs
app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

db.execute("SELECT * FROM products")
  .then((result) => {
    console.log(result[0], result[1]);
  })
  .catch((err) => {
    console.log(err);
  });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public"))); //embed css path in "public" folder into html file

app.use("/admin", adminRoutes);
app.use(shopRoutes);

// app.use((req, res, next) => {
//   console.log("in the middleware");
//   next(); // allows the req to continue to the next middleware in line
// });

app.use(errorController.get404);

app.listen(3000);
