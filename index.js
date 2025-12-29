const express = require("express");
const path = require("path");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");

const rt = require("./routes/pasteroute");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const app = express();


app.use(express.json());
app.use(cors());


app.use("/api", rt); 


const frontendPath = path.join(__dirname, "../Ftend/dist"); 
app.use(express.static(frontendPath));


app.get(/.*/, (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
