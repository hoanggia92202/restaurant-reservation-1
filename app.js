const express = require('express');
const path = require('path');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname));

const tablesRouter = require("./server/tables/tables.router");
const reservationsRouter = require("./server/reservations/reservations.router");

/** this point to the html in ../dist/index.html **/
app.use(express.static(path.resolve(__dirname, 'index.html')));

/** Test connection for heroku **/
app.get("/test", (req, res) => {
    res.status(200).json({message: "Connnect to backend successful..."})
})

app.use("/reservations", reservationsRouter);
app.use("/tables", tablesRouter);

/** Handles any requests that don't match the ones above **/
/**  return the home-page **/
app.get('*', (req,res) =>{
	res.sendFile(path.resolve(__dirname, 'index.html'));
});

module.exports = app;