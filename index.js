const port = process.env.PORT || 8000;
require('dotenv').config();
const app = require("./app");

app.listen(port, () => {
    console.log("running on port: ", port);
});