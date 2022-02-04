const express = require("express");
const router = express.Router();


const { postUserRouter, postLoginUserRouter } = require("./post.user")
const { getAllUserRouter } = require ("./get.user")


//Get
router.use(getAllUserRouter)


//Post
router.use(postUserRouter);
router.use(postLoginUserRouter);

module.exports = router;