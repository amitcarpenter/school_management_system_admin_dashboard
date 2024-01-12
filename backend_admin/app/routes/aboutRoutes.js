const express = require('express')
const multer = require('multer');
const path = require('path');
const { aboutLoader, postData, editLoader, updateData, getdata } = require('../controller/aboutController');
const { isLogout, isLogin } = require('../middleware/auth')




// Multer use for Image upload
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


// Middle ware
router.use(express.json())
router.use(express.urlencoded({ extended: true }))




// Routing 
router.get("/", isLogin, aboutLoader)

router.get("/getdata", getdata)

router.post("/postdata", postData)

router.get("/edit/:id", editLoader)

router.post('/update/:id', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'bgImage', maxCount: 1 }]), updateData);




module.exports = router
