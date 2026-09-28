const mongoose = require('mongoose');

const connectDB = async () =>{
    try{

        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`MongoDB connected: ${conn.connection.host}`);
    }

    catch(error){
        console.error(`Error: ${error.message}`);
        process.exit(1);//terminates the current application process immediately and signals a failure to the operating system or host environment.

    }
}
module.exports = connectDB;