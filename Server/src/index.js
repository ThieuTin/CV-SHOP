require('dotenv').config()
const express = require('express');
const initialRoutes = require('./routes');
const db = require('./config/db');
const cors = require('./config/cors');

const app = express();
const PORT = process.env.PORT || 5000;

db.connect();

app.use(express.json());
app.use(cors);
app.use(express.urlencoded({ extended: false }));
app.use(express.static('uploads'));


initialRoutes(app);

app.listen(PORT, () => {
    console.log(`Server is running at PORT ${PORT}`);
});
