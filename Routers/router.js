const { Router } = require("express");
const express = require("express");
const router = express.Router();
const controller = require("../Controllers/userController");
const middleware = require("../userValidation/userValidation");





router.post("/user-registration", controller.user_Registration);
router.post("/apply-leaves", controller.apply_leaves);
router.get("/get-user-details", controller.get_userdetails);
router.get("/user", controller.get_total_users);


module.exports = router