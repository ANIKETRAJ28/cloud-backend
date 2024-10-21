const express = require("express");
const bodyParser = require("body-parser");

const User = require("./model/user");
const Todo = require("./model/todo");
const { PORT } = require("./config/env");
const connectDB = require("./db");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    return res.json({message: "Healthy..."});
});

// create user
app.post("/user", async (req, res) => {
    const userPayload = {};
    userPayload.name = req.body.name;
    userPayload.password = req.body.password;
    const prevUser = await User.findOne({ name: userPayload.name });
    
    if(prevUser) return res.status(400).json({message: "User already exists."});
    
    const newUser = await User.create({
        name: userPayload.name,
        password: userPayload.password
    });

    return res.status(200).json(newUser);
});

// get user
app.get("/user", async (req, res) => {
    const userPayload = {};
    userPayload.name = req.body.name;
    const user = await User.findOne({ name: userPayload.name });

    return res.status(200).json(user);
});

// add todo for user
app.post("/todo", async (req, res) => {
    const payload = {};
    payload.name = req.body.name;
    payload.todoName = req.body.todoName;
    
    const newTodo = await Todo.create({
        name: payload.todoName
    });
    await User.findOneAndUpdate(
        { name: payload.name },
        { $push: { todos: newTodo._id } }
    );
    return res.status(200).json(newTodo);
});

// get all todos for user
app.get("/todo", async (req, res) => {
    const payload = {};
    payload.id = req.body.id;

    const user = await User.findById(payload.id).populate("todos");

    return res.status(200).json(user.todos);
});

app.listen(PORT, async() => {
    await connectDB();
    console.log(`Server running on port ${PORT}`);
});