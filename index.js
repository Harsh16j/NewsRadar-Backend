const express = require("express");
const app = express();
const port = 5000;
const cors = require("cors"); //To handle the CORS error in the browser for making request to the backend API

// Middleware for receiving and sending JSON data
app.use(express.json());

// Middleware for enabling CORS
app.use(cors());

app.use("/api/v1/news", require("./routes/fetchNews"));

app.listen(port, () => {
    console.log(`NewsRadar backend app listening on port ${port}`);
});
