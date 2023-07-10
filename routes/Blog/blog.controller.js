const db = require("../../config/connection");
const blog = db.blog;


const createBlog = async (req, res) => {
  try{
  await blog
    .create({
      title: req.body.title,    
      content:req.body.content,
      author:req.body.author,
    })
    
   res.send({ response: "Blog Created successfully" });
  } catch (error) {
    res.status(400).send(error);
  }
};

const updateBlog = async (req, res) => {

  const { id } = req.params;
  try {
    const newData = {
      title: req.body.title,    
      content:req.body.content,
      author:req.body.author,
    };
    await blog.update(newData, {
      where: {
        id,
      },
    });
    res.send("Blog is Updated");
  } catch (err) {
    res.status(400).send({ err });
  }
};

const deleteBlog = async (req, res) => {
  const id = req.params.id;
  try {
    await blog.destroy({
      where: {
        id,
      },
    });
    res.send("Blog is  deleted");
  } catch (err) {
    res.status(400).send({ err });
  }
};
const listBlog = async (req, res) => {
  const page = req.query.page;
  const size = req.query.size;
  const limit = size ? +size : 15;
  const skip = page ? (page - 1) * limit : 0;

  const options = {
    where: {},
    limit: limit,
    offset: skip,
  };
  if (req.query.id) {
    options.where.id = req.query.id;
  }
  if (req.query.title) {
    options.where.title = {
      [Op.like]: `%${req.query.title}%`,
    };
  }
  if (req.query.content) {
    options.where.content = {
      [Op.like]: `%${req.query.content}%`,
    };
  }
  if (req.query.author) {
    options.where.author = {
      [Op.like]: `%${req.query.author}%`,
    };
  }
  if (req.query.start && req.query.end) {
    const start = req.query.start;
    const end = req.query.end;
    options.where.createdAt = {
      [Op.between]: [start, end],
    };
  }

  console.log(options);
  await blog
    .findAndCountAll(options)
    .then((data) => {
      const response = getPagingData(data, page, limit);
      res.send(response);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Datas.",
      });
    });
  };

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: Feedback } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, Feedback, totalPages, currentPage };
};


module.exports = {
  createBlog,
  updateBlog,
  deleteBlog,
  listBlog

};

