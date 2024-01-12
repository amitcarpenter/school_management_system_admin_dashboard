const express = require("express")
const { RegisterAdmin, LoginAdmin, loginLoader, dashboardLoader, updateProfile, getProfileData, logout, register, updateProflieApi, editLoader, resetPassword, headerLoader } = require("../controller/adminController")
const session = require('express-session')
const { isLogout, isLogin } = require('../middleware/auth')
const router = express.Router()

const jwtSecretKey = 'AmitcarPenter';
const multer = require('multer');
const path = require('path')

// Muleter use for Upload file 
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now());
  }
});
const upload = multer({ storage: storage });




//middle ware
router.use(express.json())
router.use(express.urlencoded({ extended: true }))


// Routing
router.get("/", isLogout, loginLoader)

router.get("/register", register)

router.post("/register", RegisterAdmin)

router.post("/", LoginAdmin)

router.get("/dashboard", isLogin, dashboardLoader)

router.get("/edit", editLoader)

router.get("/logout", isLogin, logout)

router.post("/resetpassword", resetPassword)

router.post('/update', upload.fields([{ name: 'profileImage', maxCount: 1 }]), updateProfile);




module.exports = router