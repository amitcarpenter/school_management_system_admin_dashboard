const express = require('express')
const { postData, deleteBlog, editLoader, updateData, getdata, blogLoader, getDatawithPage, postPageData, getBlogs, PostLoader, addPost, viewButton, blogController,getBlogsbyId } = require('../controller/blogControllers')
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
router.get("/",isLogin, blogLoader)

router.get("/add-post", PostLoader)

router.post("/add-post", upload.fields([{ name: 'image', maxCount: 1 }]), addPost)

router.post("/postdata", postData)

router.get("/getdata", getdata)

router.get("/getblog", getBlogs)

router.get("/getblogbyid/:id", getBlogsbyId)

router.get("/get", getDatawithPage)

router.post("/senddata", postPageData)

router.get("/edit/:id", editLoader)

router.post('/update/:id', upload.fields([{ name: 'cover', maxCount: 1 }]), updateData);

router.get("/view/:id", viewButton)

router.post('/delete/:id', deleteBlog)


module.exports = router
