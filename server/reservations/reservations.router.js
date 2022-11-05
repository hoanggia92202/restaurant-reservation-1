const router = require("express").Router();
const controller = require("./reservations.controller");

router.route("/").get(controller.readByDate).post(controller.create);

module.exports = router;
 