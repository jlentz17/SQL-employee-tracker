const db = require("./db/connection");
const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    messsage: "hello world",
  });
});

app.use((req, res) => {
  res.status(404).end();
});

// Start server after DB connection
db.connect((err) => {
    if (err) {
        console.log(err)
    };
    console.log("Database connected.");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  });
