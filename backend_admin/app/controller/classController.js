const Class = require("../models/classModels");
const Admin = require("../models/adminModels");

// Class Loader
const classLoader = async (req, res) => {
  try {
    const [data, profileData] = await Promise.all([Class.find(), Admin.find()]);
    await Class.find();
    return res.render("class", { data, profileData });
  } catch (error) {
    console.log(error);
  }
};

// Post data
const postData = async (req, res) => {
  const { heading, massage, image, bgImage, buttonText, section } = req.body;
  const newData = new Class({
    heading,
    massage,
    image,
    bgImage,
    buttonText,
    section,
  });

  await newData
    .save()
    .then(() => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.error("Error saving data", error);
      res.sendStatus(500);
    });
};

// Edit Form Loader
const editLoader = async (req, res) => {
  const id = req.params.id;
  await Class.findById(id)
    .then((data) => {
      res.render("editClass", { data });
    })
    .catch((error) => {
      console.error("Error fetching data for editing", error);
      res.sendStatus(500);
    });
};

// Update Data
const updateData = async (req, res) => {
  const id = req.params.id;
  const {
    section,
    heading,
    subheading,
    massage,
    buttonText,
    content1Input1,
    content1Input2,
    content2Input1,
    content2Input2,
    content3Input1,
    content3Input2,
  } = req.body;
  const newImage = req.files["image"] ? req.files["image"][0].path : ""; 
  const newBgimage = req.files["bgImage"] ? req.files["bgImage"][0].path : "";
  const existingBlog = await Class.findById(id);
  const image = newImage ? newImage : existingBlog.image; 
  const bgImage = newBgimage ? newBgimage : existingBlog.bgImage; 

  await Class.findByIdAndUpdate(
    id,
    {
      $set: {
        section,
        heading,
        subheading,
        massage,
        buttonText,
        content1Input1,
        image,
        bgImage,
        content1Input2,
        content2Input1,
        content2Input2,
        content3Input1,
        content3Input2,
      },
    },
    { new: true }
  )
    .then(() => {
      res.redirect("/class");
      console.log("updated");
    })
    .catch((error) => {
      console.error("Error updating data", error);
      res.sendStatus(500);
    });
};

// get data
const getdata = async (req, res) => {
  const data = await Class.find();
  console.log(data);
  return res.json({ data });
};

module.exports = {
  classLoader,
  updateData,
  editLoader,
  postData,
  getdata,
};
