const db = require("./db/connection");
const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
const apiRoutes = rquire("./routes/apiRoutes");

const inputCheck = require("./utils/inputCheck");

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// use api routes
app.use("/api", apiRoutes);


// default response for any other request not found (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

// Start server after DB connection
db.connect((err) => {
  if (err) throw err;
  console.log("Database connected.");
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
