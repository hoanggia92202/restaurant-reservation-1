const router = require("express").Router();
const controller = require("./reservations.controller");

router.route("/").get(controller.read).post(controller.create);
router.route("/:id").get(controller.readById).put(controller.update).delete(controller.delete);
router.route("/:id/status").put(controller.updateStatus)


module.exports = router;
 