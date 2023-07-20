const express = require("express");
const {
  loginController,
  registerController,
  authController,
  authApplyController,
  geAllController,
  deleteAllNotificationController,
  // applyDoctorController,
} = require("../controllers/userCtrl");
const authMiddleware = require("../middlewares/authMiddleware");
const { uploadImage } = require("../controllers/adminCtrl");
const railwayModel = require("../models/railwayModel");

//router onject
const router = express.Router();

//routes
//LOGIN || POST
router.post("/login", loginController);

//REGISTER || POST
router.post("/register", registerController);

//Auth || POST
router.post("/getUserData", authMiddleware, authController);
//Register|| POST
router.post("/apply-form", authMiddleware, authApplyController);

// router.post("/apply-doctor", authMiddleware, applyDoctorController);

// router.post("/apply-doctor", authMiddleware, applyDoctorController);

// NOTIFICATION || post
router.post("/get-all-notification", authMiddleware, geAllController);

// NOTIFICATION DELete || post
// for uploading images
router.post("/store-image", async (req, res) => {
  try {
    const { image } = req.body;
    if (!image) {
      return res.status(400).json({ msg: "Please enter an icon url" });
    }
    let newImage = new railwayModel({
      image,
    });
    newImage = await newImage.save();
    res.json(newImage);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// adding images

router.post(
  "/delete-all-notification",
  authMiddleware,
  deleteAllNotificationController
);
module.exports = router;
