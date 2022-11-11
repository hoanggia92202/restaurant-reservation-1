const router = require("express").Router();
const controller = require("./reservations.controller");

router.route("/").get(controller.read).post(controller.create);

module.exports = router;
 