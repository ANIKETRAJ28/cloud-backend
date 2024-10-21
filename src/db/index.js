const mongoose = require("mongoose");

const connectDB = async() => {
    try {
        await mongoose.connect("mongodb+srv://aniketraj28012002:UfeXMYo0gh9HoMrv@cloudproject.ouoim.mongodb.net/?retryWrites=true&w=majority&appName=cloudProject");
        console.log("db connected successfully");
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDB;