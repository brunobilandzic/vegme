const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const passport = require("passport");
require("dotenv").config();
const cors = require("cors");


const mealRoutes = require("./routes/meal.js")
const customerRoutes = require("./routes/customer.js");
const restaurantOwnerRoutes = require("./routes/restaurantOwner.js");
const authRoutes = require("./routes/auth.js");
const userRoutes = require("./routes/user.js")
const restaurantRoutes = require("./routes/restaurant.js")
const adminRoutes = require("./routes/admin.js")
const operatorRoutes = require("./routes/operator.js")
const app = express();
app.use(cookieSession({ maxAge: 24 * 60 * 60 * 1000, keys: ["cookie key"] }));

require("./authentification/passport-google.js")
require("./authentification/passport-local.js")

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json())

app.use("/api/customers", customerRoutes);
app.use("/api/restaurantowners", restaurantOwnerRoutes);
app.use("/api/restaurants", restaurantRoutes)
app.use("/auth", authRoutes);
app.use("/api/admins", adminRoutes)
app.use("/api/users", userRoutes)
app.use("/api/operators", operatorRoutes)
app.use("/api/meals", mealRoutes)

app.use((error, req, res, next) => {
  if (res.headerSent) return next(error);
  res
    .status(error.code || 500)
    .json({ message: error.message || "An uknown error occured!" });
  
});

mongoose
  .connect(process.env.MONGOOSE_CONNECTION_STRING)
  .then(() =>
    app.listen(5000, () => {
      console.log("listening on 5000");
    })
  )
  .catch((err) => console.log(err));
