const router = require("express").Router();
const controller = require("./tables.controller");

router.route("/").get(controller.read).post(controller.create);
router.route("/seat").put(controller.update)

module.exports = router;