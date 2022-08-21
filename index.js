const express = require('express');
const path = require('path');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname));

/** this point to the html in ../dist/index.html **/
app.use(express.static(path.resolve(__dirname, 'index.html')));

const port = process.env.PORT || 3000

/** Test connection for heroku **/
app.get("/test", (req, res) => {
    res.status(200).json({message: "Connnect to backend successful..."})
})

/** Handles any requests that don't match the ones above **/
/**  return the home-page **/
app.get('*', (req,res) =>{
	res.sendFile(path.resolve(__dirname, 'index.html'));
});

app.listen(port, () => {
    console.log("running on port: ", port);
});