const Admin = require("../models/adminModels");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const jwtSecretKey = "AmitcarPenter";

// Register Admin
const RegisterAdmin = async (req, res) => {
  try {
    const { email, password, firstname, lastname, profileImage } = req.body;

    let admin = await Admin.findOne({ email });
    if (admin) {
      res.status(200).send("Admin already ");
    }
    const hashedpassword = await bcrypt.hash(password, 10);
    admin = await Admin.create({
      firstname,
      lastname,
      email,
      password: hashedpassword,
    });
    res.status(201).json({
      success: true,
      admin,
    });
  } catch (error) {
    console.log(error);
  }
};

//Login Loader
const loginLoader = async (req, res) => {
  try {
    res.render("login");
  } catch (error) {
    console.log(error);
  }
};

//Login Loader
const register = async (req, res) => {
  try {
    res.render("register");
  } catch (error) {
    console.log(error);
  }
};

// Login Admin
const LoginAdmin = async (req, res) => {
  const { email, password } = req.body;
  // console.log(email , password)
  try {
    const user = await Admin.findOne({ email });
    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        req.session.user_id = user._id;
        res.redirect("/dashboard");
        console.log("Login Success Fully");
        const token = jwt.sign({ userId: user._id }, jwtSecretKey);
      } else {
        res.render("login", {
          massage: "Email and Password is Incorrect",
        });
      }
    } else {
      res.render("login", {
        massage: "Email and Password is Incorrect",
      });
    }
  } catch (error) {
    console.log("eroor");
    console.error(error);
  }
};

//Dashboard loader
const dashboardLoader = async (req, res) => {
  try {
    const [data, profileData] = await Promise.all([Admin.find(), Admin.find()]);
    res.render("dashboard", { data, profileData });
  } catch (error) {
    console.log(error);
  }
};

// About Loader
const contactLoader = async (req, res) => {
  try {
    res.render("contact");
  } catch (error) {
    console.log(error);
  }
};

// Edit Form Loader
const editLoader = async (req, res) => {
  try {
    let data = await Admin.find();
    data = data[0];
    res.render("editProfile", { data });
  } catch (error) {
    console.error("Error fetching data for editing", error);
    res.sendStatus(500);
  }
};

// update profile
const updateProfile = async (req, res) => {
  const { firstname, lastname, email, userId } = req.body;

  const newImage = req.files["profileImage"]
    ? req.files["profileImage"][0].path
    : "";
  const existingBlog = await Admin.findById(userId);
  const profileImage = newImage ? newImage : existingBlog.profileImage;
  try {
    const updatedUser = await Admin.findByIdAndUpdate(
      userId,
      { $set: { firstname, lastname, email, profileImage } },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).redirect("/edit");
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};

//Logout
const logout = async (req, res) => {
  try {
    req.session.destroy();
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};

//update profile api
const updateProflieApi = async (req, res) => {
  const { id } = req.params;
  const { firstname, lastname } = req.body;
  // const newCover = req.files['image'] ? req.files['image'][0].path : '';
  // const existingBlog = await Admin.findById(id);
  // const cover = newCover ? newCover : existingBlog.cover;
  try {
    const updatedProfile = await UserProfile.findByIdAndUpdate(
      id,
      { firstname, lastname },
      { new: true }
    );
    res.json(updatedProfile);
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ error: "Error updating profile" });
  }
};

// Compare Password
const comparePasswords = async (plainPassword, hashedPassword) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

//reset password
const resetPassword = async (req, res) => {
  const { oldPassword, newPassword, confirmPassword } = req.body;
  console.log("new", newPassword);
  const user = await Admin.findOne();

  if (!user) {
    return res.redirect("/edit");
  }

  const passwordMatch = await comparePasswords(oldPassword, user.password);
  if (!passwordMatch) {
    return res.redirect("/edit");
  }

  if (newPassword !== confirmPassword) {
    return res.redirect("/edit");
  }

  // Hash the new password using bcrypt.
  const newHashedPassword = await bcrypt.hash(newPassword, 10);

  // Replace the user's password with the new hashed password in the database.
  // In a real application, this should be done using your data storage mechanism (e.g., updating the user record in a database).
  user.password = newHashedPassword;
  await user.save();

  // Return a success response.
  console.log("changed");
  res.redirect("/edit");
};

module.exports = {
  RegisterAdmin,
  LoginAdmin,
  loginLoader,
  dashboardLoader,
  contactLoader,
  editLoader,
  updateProfile,
  logout,
  register,
  updateProflieApi,
  resetPassword,
};
