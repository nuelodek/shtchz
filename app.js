const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoute');

dotenv.config();

const app = express();
const port = process.env.PORT || 3005;

app.use(bodyParser.json());

app.use('/auth/', authRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
