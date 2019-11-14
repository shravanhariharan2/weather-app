const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 5000;

const weather = require("./routes/weather");

app.use("/weather/", weather);
app.use(bodyParser);

app.listen(port, () => console.log(`Server started on port ${port}`));
