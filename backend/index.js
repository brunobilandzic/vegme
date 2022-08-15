const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const passport = require("passport");
const config = require("./config");
const cors = require("cors");
var fs = require("fs");
var https = require("https");
const app = express();

const { createIo } = require("./socket");
const { seedData } = require("./helpers/seed/seed.js");
const mealRoutes = require("./routes/meal.js");
const regularRoutes = require("./routes/regular.js");
const authRoutes = require("./routes/auth.js");
const userRoutes = require("./routes/user.js");
const adminRoutes = require("./routes/admin.js");
const operatorRoutes = require("./routes/operator.js");
const orderRoutes = require("./routes/order");
const cookRoutes = require("./routes/cook.js");
const alertRoutes = require("./routes/alert")

const httpsConfiguration = {
  key: fs.readFileSync("../server.key"),
  cert: fs.readFileSync("../server.cert"),
};
app.use(cookieSession({ maxAge: 24 * 60 * 60 * 1000, keys: ["cookie key"] }));

require("./authentification/passport-google.js");
require("./authentification/passport-local.js");

app.use(cors({ origin: "https://localhost:3000", credentials: true }));

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());

app.use("/api/regulars", regularRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admins", adminRoutes);
app.use("/api/users", userRoutes);
app.use("/api/operators", operatorRoutes);
app.use("/api/meals", mealRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cooks", cookRoutes);
app.use("/api/alerts", alertRoutes)

app.use((error, req, res, next) => {
  if (res.headerSent) return next(error);
  res
    .status(error.code || 500)
    .json({ message: error.message || "An uknown error occured!" });
});

const runServer = async () => {
  await mongoose.connect(config.MONGO_CONNECTION_STRING);
  await seedData();
  const httpsServer = https.createServer(httpsConfiguration, app);

  httpsServer.listen(process.env.PORT || 5000, () => {
    const io = createIo(httpsServer);
    app.io = io;
    console.log(
      `Server running on port ${
        process.env.PORT || 5000
      }. Go to https://localhost:5000/.`
    );
  });
};

runServer();
