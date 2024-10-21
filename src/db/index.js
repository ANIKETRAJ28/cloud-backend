const mongoose = require("mongoose");

const connectDB = async() => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/cloud_project");
        console.log("db connected successfully");
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDB;