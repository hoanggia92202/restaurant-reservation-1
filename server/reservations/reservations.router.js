const router = require("express").Router();
const controller = require("./reservations.controller");

router.route("/").get(controller.read).post(controller.create);
router.route("/:id").get(controller.readById).put(controller.update).delete(controller.delete);

module.exports = router;
 