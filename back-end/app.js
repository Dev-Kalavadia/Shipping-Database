// import and instantiate express
const express = require("express") // CommonJS import style!
const app = express() // instantiate an Express object
require("dotenv").config(); 

const cors = require('cors');
app.use(cors())

const connectDB = require("./config/connectDB");
connectDB();

app.use("/voyages", require("./routes/voyages"));
app.use("/ships", require("./routes/ships"));
app.use("/places", require("./routes/places"));

// export the express app we created to make it available to other modules
module.exports = app