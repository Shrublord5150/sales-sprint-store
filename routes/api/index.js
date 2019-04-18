const router = require("express").Router();
const controller = require("../../controllers/userController");

router.route("/register").post(controller.register);
router.route("/login").get(controller.login);
router.route("/register/store-userinfo").post(controller.storeUserInformation);

module.exports = router;