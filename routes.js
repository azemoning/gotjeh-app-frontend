const { default: axios } = require("axios");

const router = require("express").Router();

const baseUrl = "https://gotjeh-backend-develop.herokuapp.com";

router.get("/", (req, res) => {
  res.render("index", { page: "landing page" });
});

router.get("/index", (req, res) => {
  res.render("index-user", { page: "landing page user" });
});

router.get("/forgot", (req, res) => {
  res.render("auth/forgot-password");
});

router.get("/login", (req, res) => {
  res.render("auth/login");
});

router.post("/login", async (req, res) => {
  // console.log(req.body);
  try {
    return axios
      .post(`${baseUrl}/api/auth/login`, req.body)
      .then((result) => {
        res.redirect("/index");
        // res.send("hello world");
      })
      .catch((err) => console.log(err));
  } catch (error) {
    console.log(error);
  }
});

router.get("/register", (req, res) => {
  res.render("auth/register");
});

router.post("/register", async (req, res) => {
  // console.log(req.body);
  try {
    return axios
      .post(`${baseUrl}/api/auth/register`, req.body)
      .then((result) => {
        res.redirect("/login");
      })
      .catch((err) => console.log(err));
  } catch (error) {
    console.log(error);
  }
});

router.get("/job", (req, res) => {
  res.render("pages/job");
});

router.get("/detail-job", (req, res) => {
  res.render("pages/detail-job");
});

router.get("/post-job", (req, res) => {
  res.render("pages/req-post-job");
});

router.get("/course", (req, res) => {
  res.render("pages/course");
});

router.get("/detail-course", (req, res) => {
  res.render("pages/detail-course");
});

router.get("/faq", (req, res) => {
  res.render("pages/faq");
});

router.get("/about", (req, res) => {
  res.render("pages/about-us");
});

module.exports = router;
