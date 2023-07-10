const express = require('express');
const router = express.Router();
const controller = require('./blog.controller');

router.post('/blog/create', controller.createBlog);
router.put('/blog/update/:id',controller.updateBlog);
router.delete('/blog/delete/:id',controller.deleteBlog);
router.get('/blog/list',controller.listBlog);

module.exports = router