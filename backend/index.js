const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const passport = require("passport");
const config = require("./config");
const cors = require("cors");
const fs = require("fs");
const http = require("http");
const https = require("https");
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
const alertRoutes = require("./routes/alert");

const isProduction = process.env.NODE_ENV === "production";
const clientUrl = process.env.CLIENT_URL || "https://localhost:3000";

app.set("trust proxy", 1);
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY || "local-development-cookie-key"],
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
  }),
);

require("./authentification/passport-google.js");
require("./authentification/passport-local.js");

app.use(cors({ origin: clientUrl, credentials: true }));

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
app.use("/api/alerts", alertRoutes);

app.use((error, req, res, next) => {
  if (res.headersSent) return next(error);
  res
    .status(error.code || 500)
    .json({ message: error.message || "An unknown error occurred!" });
});

const runServer = async () => {
  await mongoose.connect(config.MONGO_CONNECTION_STRING);
  await seedData();

  const port = process.env.PORT || 5000;
  let server;

  if (isProduction) {
    server = http.createServer(app);
  } else {
    const httpsConfiguration = {
      key: fs.readFileSync("../server.key"),
      cert: fs.readFileSync("../server.cert"),
    };
    server = https.createServer(httpsConfiguration, app);
  }

  server.listen(port, () => {
    const io = createIo(server, clientUrl);
    app.io = io;
    console.log(`Server running on port ${port}.`);
  });
};

runServer();
