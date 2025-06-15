const express = require("express");
const cors = require('cors');
require("dotenv").config();
const connectMongoDB = require("./config/mongoDB.config");
const authRouter = require("./routes/auth.routes");
const vendorRouter = require("./routes/vendor.routes");
const adminRouter = require("./routes/admin.routes");
const userRouter = require("./routes/user.routes");
const publicRouter = require("./routes/public.routes");

// import middleware
const authMiddleware = require("./middlewares/authMiddlewares");
const authorizeRoles = require("./middlewares/rolesMiddleware");

// constant
const app = express();
const port = process.env.PORT;

// Middleware
app.use(cors())
app.use(express.json());

// routes

//  Public routes
app.use("/api/public", publicRouter);


//auth routes
app.use("/api/auth", authRouter);

// admin routes
app.use("/api/admin",authMiddleware, authorizeRoles("admin"), adminRouter);

// vendor routes
app.use("/api/vendor", authMiddleware, authorizeRoles("vendor"), vendorRouter);

// user routes
app.use("/api/user",authMiddleware, authorizeRoles("user"), userRouter);

// undefined routes
app.use((req, res) => {
  res.status(404).json({ msg: "No Routes Found!!!" });
});

connectMongoDB()
  .then(() => {
    try {
      app.listen(port, () => {
        console.log(`Server is running at port ${port}`);
      });
    } catch (error) {
      console.log(error);
    }
  })
  .catch((err) => {
    console.log(err);
  });
