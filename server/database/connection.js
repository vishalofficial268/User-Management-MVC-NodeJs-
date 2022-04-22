const mongoose = require('mongoose');
const connectDB = async() => {
    try {
        //mongodb connection string:
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser : true,
            useUnifiedTopology :true
        });
        console.log(`mongodb connected : ${conn.connection.host}`)
    } catch (error) {
        console.log(error);
        process.exit();
    }
}

module.exports = connectDB