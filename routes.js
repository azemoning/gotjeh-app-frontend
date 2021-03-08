const { default: axios } = require("axios");

const router = require("express").Router();

const baseUrl = "https://gotjeh-backend-develop.herokuapp.com";

router.get("/", (req, res) => {
  res.render("index", { page: "landing page" });
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
        res.redirect("/");
        res.send("hello world");
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

router.get("/faq", (req, res) => {
  res.render("page/faq");
});

router.get("/course", (req, res) => {
  res.render("page/course");
});

router.get("/detail-course", (req, res) => {
  res.render("page/detail-course");
});

router.get("/job", (req, res) => {
  res.render("page/job");
});

router.get("/detail-job", (req, res) => {
  res.render("page/detail-job");
});

module.exports = router;
