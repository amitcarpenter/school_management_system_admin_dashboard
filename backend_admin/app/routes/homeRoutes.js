const express = require('express')
const { homeLoader, postData, editLoader, updateData, getdata } = require('../controller/homeController')
const multer = require('multer');
const path = require('path')
const { isLogout, isLogin } = require('../middleware/auth')

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

const router = express.Router()


//Middle ware
router.use(express.json())
router.use(express.urlencoded({ extended: true }))


// Routing
router.get("/", isLogin, homeLoader)

router.post("/postdata", postData)

router.get("/getdata", getdata)

router.get("/edit/:id", editLoader)

router.post('/update/:id', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'bgImage', maxCount: 1 }]), updateData);



module.exports = router
