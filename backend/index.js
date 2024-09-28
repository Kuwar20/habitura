const express = require("express");
// const morgan = require('morgan');
// const helmet = require('helmet');
// const rateLimit = require('express-rate-limit');
const cors = require("cors");
const path = require("path");
const passport = require("./auth-jwt/auth-jwt.js");
require("dotenv").config();
require("./conn/conn.js");

const authRoute = require("./routes/authRoute.js");
const habitRoute = require("./routes/habitList.js");
const taskRoute = require("./routes/task.js");
const progressRoute = require('./routes/progress.js');
const addNoteroute = require('./routes/addNote');
const updateProfileRoute = require('./routes/updateProfile.js');

const app = express();
const port = process.env.PORT || 8000;

// Middleware to parse JSON bodies
app.use(express.json());

// Enable CORS
app.use(cors());

// Security Middleware
// app.use(helmet());

// Logging Middleware
// app.use(morgan('dev'));

// Rate Limiting
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100, // limit each IP to 100 requests per windowMs
// });
// app.use(limiter);

// Passport middleware
app.use(passport.initialize());

// Serve static files from the 'file-uploads' directory
app.use('/file-uploads', express.static(path.join(__dirname, 'file-uploads')));

// Routes middleware
app.use("/auth", authRoute);
app.use("/habit", habitRoute);
app.use("/task", taskRoute);
app.use('/track', progressRoute);
app.use('/myNotes', addNoteroute);
app.use('/updateUser', updateProfileRoute);

app.get("/", (req, res) => {
  res.send("Hello World");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

app.listen(port, () => {
  console.log("Server is Listening at port ", port);
});
