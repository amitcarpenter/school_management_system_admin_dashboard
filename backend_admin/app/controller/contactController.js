const Contact = require("../models/contactModels");
const UserContact = require("../models/contact");
const Admin = require("../models/adminModels");

// Contact loader
const combinedContactLoader = async (req, res) => {
  try {
    const [data, userData, profileData] = await Promise.all([
      Contact.find(),
      UserContact.find(),
      Admin.find(),
    ]);
    return res.render("contact", { data, userData, profileData });
  } catch (error) {
    console.error("Error fetching data", error);
    return res.sendStatus(500);
  }
};

// post data
const postData = async (req, res) => {
  const { heading, address, bgImage, mobile, email } = req.body;
  const newData = new Contact({
    heading,
    address,
    bgImage,
    mobile,
    email,
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
  await Contact.findById(id)
    .then((data) => {
      res.render("editContact", { data });
    })
    .catch((error) => {
      console.error("Error fetching data for editing", error);
      res.sendStatus(500);
    });
};

//update data
const updateData = async (req, res) => {
  const id = req.params.id;
  const { heading, address, mobile, email } = req.body;
  let newCover = req.files["bgImage"] ? req.files["bgImage"][0].path : "";
  const existingBlog = await Contact.findById(id);
  const bgImage = newCover ? newCover : existingBlog.bgImage;

  await Contact.findByIdAndUpdate(
    id,
    {
      $set: {
        heading,
        address,
        mobile,
        email,
        bgImage,
      },
    },
    { new: true }
  )
    .then(() => {
      res.redirect("/contact");
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

const postFormdataForuser = async (req, res) => {
  const { name, email, subject, message } = req.body;
  const contact = new UserContact({
    name,
    email,
    subject,
    message,
  });
  await contact
    .save()
    .then((savedContact) => {
      const response = {
        status: "success",
        message: "Form submitted successfully",
        data: savedContact,
      };
      return res.json(response);
    })
    .catch((error) => {
      console.error(error);
      const response = {
        status: "error",
        message: "An error occurred while saving the form submission",
      };
      return res.status(500).json(response);
    });
};

module.exports = {
  postData,
  editLoader,
  updateData,
  getdata,
  postFormdataForuser,
  combinedContactLoader,
};
