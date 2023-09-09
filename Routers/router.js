const { Router } = require("express");
const express = require("express");
const router = express.Router();
const userController = require("../Controllers/authController")
const controller = require("../Controllers/userController")
const multer = require("multer");
const fs = require('fs');
const Middleware = require("../Services/Authmiddlewere")
//----------------------multer congfirations-------------------
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        try {
            const directoryPath = './myNewDirectory';
            if (!fs.existsSync(directoryPath)) {
                fs.mkdirSync(directoryPath);

            }
            cb(null, directoryPath);
        } catch (err) {
            cb(err, null);
            console.error('Error creating directory:', err);
        }
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});





const upload = multer({ storage: storage });
router.post("/UserRegistration", userController.userRegistration);
router.post("/userlogin", userController.userLogin);

router.post("/create-feeds", upload.single("image"), Middleware.Middleware_Auth(), controller.createfeeds);

router.get("/get-userfeedstList", Middleware.Middleware_Auth(),controller.getUsertFeedsList);





module.exports = router