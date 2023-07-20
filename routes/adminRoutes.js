const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  getAllUsersController,
  getAllDoctorsController,
  changeAccountStatusController,
  exportUserPdf,
} = require("../controllers/adminCtrl");
const router = express.Router();
// get method || users
router.get("/getAllUsers", authMiddleware, getAllUsersController);
// get method || doctors
router.get("/getALLDoctors", authMiddleware, getAllDoctorsController);
// POST Method || status changing
// generating pdf
router.get("/exportUsersPdf", authMiddleware, exportUserPdf);

router.post(
  "/changeAccountStatus",
  authMiddleware,
  changeAccountStatusController
);

module.exports = router;
