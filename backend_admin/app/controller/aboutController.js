const About = require("../models/aboutModels");
const Admin = require("../models/adminModels");

// About Loader
const aboutLoader = async (req, res) => {
  try {
    const [data, profileData] = await Promise.all([About.find(), Admin.find()]);
    res.render("about", { data, profileData });
  } catch (error) {
    console.log(error);
  }
};

// Post data
const postData = async (req, res) => {
  const { heading, subheading, massage, image, bgImage, buttonText, section } =
    req.body;
  const newData = new About({
    heading,
    subheading,
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
  await About.findById(id)
    .then((data) => {
      res.render("editAbout", { data });
    })
    .catch((error) => {
      console.error("Error fetching data for editing", error);
      res.sendStatus(500);
    });
};

// Updata Data
const updateData = async (req, res) => {
  const id = req.params.id;
  const { section, heading, massage, subheading, buttonText } = req.body;
  const newCover = req.files["image"] ? req.files["image"][0].path : "";
  const newbgcover = req.files["bgImage"] ? req.files["bgImage"][0].path : "";

  const existingBlog = await About.findById(id);

  // Check if a new image is uploaded
  const image = newCover ? newCover : existingBlog.image;
  const bgImage = newbgcover ? newbgcover : existingBlog.bgImgae;

  await About.findByIdAndUpdate(
    id,
    {
      $set: {
        section,
        heading,
        subheading,
        massage,
        image,
        bgImage,
        buttonText,
      },
    },
    { new: true }
  )
    .then(() => {
      res.redirect("/about");
      console.log("updated");
    })
    .catch((error) => {
      console.error("Error updating data", error);
      res.sendStatus(500);
    });
};

// get data
const getdata = async (req, res) => {
  const data = await About.find();
  console.log(data);
  res.json({ data });
};



module.exports = {
  aboutLoader,
  updateData,
  editLoader,
  postData,
  getdata,
};
