require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');

const blogRoutes = require("./routes/blog");
const newsletterRoutes = require("./routes/newsletter");
const contactRoutes = require("./routes/contact");

const app = express();

//middleware
app.use(helmet());
app.use(compression());
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());

app.use("/api/blog", blogRoutes);
app.use("/api/newsletter", newsletterRoutes);
app.use("/api/contact", contactRoutes);

app.get("/", (req, res) => res.send("Picknaut Backend Running 🚀"));

app.listen(process.env.PORT || 10000, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});