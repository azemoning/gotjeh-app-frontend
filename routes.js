// const { default: axios } = require("axios");

const router = require("express").Router();

// const baseUrl = "https://gotjeh-backend.herokuapp.com/";

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/auth/signin", (req, res) => {
  res.render("auth/signin");
});

router.get("/auth/signup", (req, res) => {
  res.render("auth/signup");
});

router.get("/page/course", (req, res) => {
  res.render("page/course");
});
router.get("/page/detail-course", (req, res) => {
  res.render("page/detail-course");
});

router.get("/page/job", (req, res) => {
  res.render("page/job");
});

router.get("/page/detail-job", (req, res) => {
  res.render("page/detail-job");
});

module.exports = router;
