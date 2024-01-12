const Blog = require("../models/blogModels");
const Admin = require("../models/adminModels");

//Blog loader
const blogLoader = async (req, res) => {
  try {
    const [data, profileData] = await Promise.all([Blog.find(), Admin.find()]);
    res.render("blog", { data, profileData });
  } catch (error) {
    console.log(error);
  }
};

// Post data Loader
const PostLoader = async (req, res) => {
  try {
    res.render("AddBlog", { currentUrl: req.originalUrl });
  } catch (error) {
    console.log(error);
  }
};

// Add Post
const addPost = async (req, res) => {
  const { title, category, description, createdAt } = req.body;
  const cover = req.files["image"] ? req.files["image"][0].path : "";
  let section = "Box-1";
  const lastBlog = await Blog.findOne({}, {}, { sort: { createdAt: -1 } });
  if (lastBlog) {
    const lastSectionNumber = parseInt(lastBlog.section.split("-")[1]);
    section = `Box-${lastSectionNumber + 1}`;
  }
  const newData = new Blog({
    section,
    title,
    category,
    description,
    createdAt,
    cover,
  });

  await newData
    .save()
    .then(() => {
      res.redirect("/blog");
    })
    .catch((error) => {
      console.error("Error saving data", error);
      res.sendStatus(500);
    });
};

// Post Data
const postData = async (req, res) => {
  const { section, title, category, description, createdAt, comment, cover } =
    req.body;
  const newData = new Blog({
    section,
    title,
    category,
    description,
    comment,
    createdAt,
    cover,
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
  await Blog.findById(id)
    .then((data) => {
      res.render("editBlog", { data });
    })
    .catch((error) => {
      console.error("Error fetching data for editing", error);
      res.sendStatus(500);
    });
};

//update data
const updateData = async (req, res) => {
  const id = req.params.id;
  const { section, title, category, description, authorName } = req.body;
  const newCover = req.files["cover"] ? req.files["cover"][0].path : "";
  const existingBlog = await Blog.findById(id);
  const cover = newCover ? newCover : existingBlog.cover;

  await Blog.findByIdAndUpdate(
    id,
    {
      $set: {
        section,
        title,
        category,
        description,
        authorName,
        cover,
      },
    },
    { new: true }
  )
    .then(() => {
      res.redirect("/blog");
      console.log("updated");
    })
    .catch((error) => {
      console.error("Error updating data", error);
      res.sendStatus(500);
    });
};

// Get paginated blogs with search
const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json({
      blogs,
    });
    console.log(blogs);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get paginated blogs with search
const getBlogsbyId = async (req, res) => {
  const blogId = req.params.id;

  try {
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }
    res.json({ blog });
    console.log("logo kam kr lo");
    console.log(blog);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// get data
const getdata = async (req, res) => {
  const data = await Blog.find();
  console.log(data);
  res.json({ data });
};

// Get Api data
const getDatawithPage = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  try {
    const blogs = await Blog.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const postPageData = async (req, res) => {
  const { section, title, category, description, authorName, comment, cover } =
    req.body;
  try {
    const blog = await Blog.create({
      section,
      title,
      category,
      description,
      authorName,
      comment,
      cover,
    });
    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

//view button
const viewButton = async (req, res) => {
  try {
    const blogId = req.params.id;
    const blog = await Blog.findById(blogId);
    console.log(blog);
    res.render("blog-view", { data: blog });
    console.log(blog);
  } catch (error) {
    console.error("Error fetching blog post", error);
    res.sendStatus(500);
  }
};

// DeleteBlog
const deleteBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    await Blog.findByIdAndDelete(blogId);
    res.redirect("/blog");
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  blogLoader,
  postData,
  editLoader,
  updateData,
  getdata,
  getDatawithPage,
  postPageData,
  getBlogs,
  PostLoader,
  addPost,
  viewButton,
  deleteBlog,
  getBlogsbyId,
};
