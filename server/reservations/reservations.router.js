const router = require("express").Router();
 const controller = require("./reservations.controller");

 router.route("/").post(controller.create);

 module.exports = router;
 