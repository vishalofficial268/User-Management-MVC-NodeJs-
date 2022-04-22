const express = require('express');
const PORT = process.env.PORT || 8080
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const path = require('path');
const connectDB = require('./server/database/connection');
const app = express();


dotenv.config({ path: 'config.env' })
/** log request */
app.use(morgan('dev')) //need info:

/** mongodb connection */
connectDB();

/** parse request to the body-parser */
app.use(bodyparser.urlencoded({ extended: true }));

/** set view engine */
app.set('view engine', 'ejs');

/** load the assests */
app.use('/css', express.static(path.resolve(__dirname, 'assets/css')));
app.use('/img', express.static(path.resolve(__dirname, 'assets/img')));
app.use('/js', express.static(path.resolve(__dirname, 'assets/js')));

/** load routes */
app.use('/', require('./server/routes/router'));

app.listen(PORT, () => {
    console.log(`server running at ${PORT}`);
})


