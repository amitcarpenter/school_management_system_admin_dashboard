const Home = require("../models/homeModels");
const Admin = require("../models/adminModels");

//Home loader
const homeLoader = async (req, res) => {
  try {
    const [data, profileData] = await Promise.all([Home.find(), Admin.find()]);
    return res.render("home", { data, profileData });
  } catch (error) {
    console.log(error);
  }
};

//post data
const postData = async (req, res) => {
  const { heading, massage, image, bgImage, buttonText, subheading, section } =
    req.body;
  const newData = new Home({
    heading,
    massage,
    image,
    bgImage,
    buttonText,
    subheading,
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

//edit data
const editLoader = async (req, res) => {
  const id = req.params.id;
  await Home.findById(id)
    .then((data) => {
      res.render("editHome", { data });
    })
    .catch((error) => {
      console.error("Error fetching data for editing", error);
      res.sendStatus(500);
    });
};

// update Data
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
  const existingBlog = await Home.findById(id);
  const image = newImage ? newImage : existingBlog.image; 
  const bgImage = newBgimage ? newBgimage : existingBlog.bgImage; 
  await Home.findByIdAndUpdate(
    id,
    {
      $set: {
        content1Input1,
        content1Input2,
        content2Input1,
        content2Input2,
        content3Input1,
        content3Input2,
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
      res.redirect("/home");
      console.log("updated");
    })
    .catch((error) => {
      console.error("Error updating data", error);
      res.sendStatus(500);
    });
};

// get data
const getdata = async (req, res) => {
  const data = await Home.find();
  console.log(data);
  return res.json({ data });
};

module.exports = {
  homeLoader,
  postData,
  editLoader,
  updateData,
  getdata,
};
