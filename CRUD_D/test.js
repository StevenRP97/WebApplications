import express from "express";
const app = express();
const port = 3001;

app.length('/', (req, res) => {
    res.send("  It's working")
})