const router = require("express").Router();
 const controller = require("./reservations.controller");

 router.route("/").get(controller.read);

 module.exports = router;
 